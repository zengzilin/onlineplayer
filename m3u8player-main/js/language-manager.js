class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.languages = {
            'en': en,
            'fr': fr,
            'zh': zh
        };
        
        this.init();
    }
    
    init() {
        // Set default language based on browser language or stored preference
        const storedLang = localStorage.getItem('m3u8player_language');
        if (storedLang && this.languages[storedLang]) {
            this.currentLanguage = storedLang;
        } else {
            // Try to detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('fr')) {
                this.currentLanguage = 'fr';
            } else if (browserLang.startsWith('zh')) {
                this.currentLanguage = 'zh';
            } else {
                this.currentLanguage = 'en';
            }
        }
        
        this.updateLanguage();
        this.createLanguageSwitcher();
    }
    
    setLanguage(lang) {
        if (this.languages[lang] && this.currentLanguage !== lang) {
            // Add visual feedback for the dropdown button
            const dropdownBtn = document.querySelector('.bg-white\\/20');
            if (dropdownBtn) {
                dropdownBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    dropdownBtn.style.transform = '';
                }, 150);
            }
            
            this.currentLanguage = lang;
            localStorage.setItem('m3u8player_language', lang);
            this.updateLanguage();
        }
    }
    
    getText(key) {
        const lang = this.languages[this.currentLanguage];
        return lang[key] || key;
    }
    
    getLanguageDisplayText(langCode) {
        // 将语言代码映射到正确的显示文本键
        const langKeyMap = {
            'en': 'english',
            'fr': 'french', 
            'zh': 'chinese'
        };
        
        const langKey = langKeyMap[langCode];
        if (langKey && this.languages[langCode]) {
            return this.languages[langCode][langKey];
        }
        return langCode;
    }
    
    updateLanguage() {
        // Update all text elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getText(key);

            // 若当前语言缺少该键，跳过，不覆盖原有内容
            if (text === key) {
                return;
            }

            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = text;
            } else if (element.tagName === 'IMG') {
                element.alt = text;
            } else {
                element.textContent = text;
            }
        });
        
        // Update title
        const translatedTitle = this.getText('title');
        if (translatedTitle !== 'title') {
            document.title = translatedTitle;
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    createLanguageSwitcher() {
        // 直接查找 HTML 中已存在的 language-switcher 容器
        const langSwitcherContainer = document.querySelector('.language-switcher');
        
        if (!langSwitcherContainer) {
            console.error('Language switcher container not found');
            return;
        }
        
        this.insertLanguageSwitcher(langSwitcherContainer);
    }
    
    insertLanguageSwitcher(container) {
        // 清空容器，避免重复插入
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // 直接创建下拉容器，不需要额外的包装
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'relative';
        
        // Create dropdown button
        const dropdownBtn = document.createElement('button');
        dropdownBtn.className = 'bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-white/30 hover:border-white/50 flex items-center gap-2';
        
        // 确保当前语言文字正确显示 - 使用正确的语言键
        const currentLangText = this.getLanguageDisplayText(this.currentLanguage);
        dropdownBtn.innerHTML = `
            <span class="current-lang">${currentLangText}</span>
            <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;
        dropdownBtn.setAttribute('aria-label', this.getText('language'));
        dropdownBtn.setAttribute('aria-expanded', 'false');
        
        // Create dropdown menu
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[140px] z-50 opacity-0 invisible translate-y-2 transition-all duration-200';
        dropdownMenu.setAttribute('role', 'listbox');
        
        // Create language options
        Object.keys(this.languages).forEach(lang => {
            const option = document.createElement('div');
            option.className = `px-4 py-3 cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-b-0 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50 ${this.currentLanguage === lang ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`;
            
            // 确保文字内容正确显示 - 使用正确的语言键
            const langText = this.getLanguageDisplayText(lang);
            option.textContent = langText;
            option.setAttribute('data-lang', lang);
            option.setAttribute('role', 'option');
            option.setAttribute('aria-selected', this.currentLanguage === lang ? 'true' : 'false');
            
            option.addEventListener('click', () => {
                this.setLanguage(lang);
                this.updateLanguageSwitcher();
                dropdownMenu.classList.remove('show');
                dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
                dropdownBtn.setAttribute('aria-expanded', 'false');
            });
            
            dropdownMenu.appendChild(option);
        });
        
        // Toggle dropdown
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = dropdownMenu.classList.contains('show');
            
            if (isExpanded) {
                dropdownMenu.classList.remove('show');
                dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
                dropdownBtn.setAttribute('aria-expanded', 'false');
            } else {
                dropdownMenu.classList.add('show');
                dropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
                dropdownBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard navigation
        dropdownBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownBtn.click();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
            dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            dropdownBtn.setAttribute('aria-expanded', 'false');
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show');
                dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        dropdownContainer.appendChild(dropdownBtn);
        dropdownContainer.appendChild(dropdownMenu);
        
        // 直接插入到容器中
        container.appendChild(dropdownContainer);
    }
    
    updateLanguageSwitcher() {
        // Update current language display
        const currentLangSpan = document.querySelector('.current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = this.getLanguageDisplayText(this.currentLanguage);
        }
        
        // Update dropdown options with new Tailwind classes
        const dropdownOptions = document.querySelectorAll('[data-lang]');
        dropdownOptions.forEach((option) => {
            const lang = option.getAttribute('data-lang');
            if (this.currentLanguage === lang) {
                option.className = 'px-4 py-3 cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-b-0 first:rounded-t-xl last:rounded-b-xl bg-blue-50 text-blue-600 font-medium';
                option.setAttribute('aria-selected', 'true');
            } else {
                option.className = 'px-4 py-3 cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-b-0 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50 text-gray-700';
                option.setAttribute('aria-selected', 'false');
            }
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});
