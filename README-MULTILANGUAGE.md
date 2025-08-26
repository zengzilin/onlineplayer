# Multilanguage Support for M3U8 Player

This project now supports multiple languages: English, French, and Chinese.

## Features

- **Automatic Language Detection**: The player automatically detects the user's browser language
- **Language Persistence**: User's language choice is saved in localStorage
- **Easy Language Switching**: Language switcher in the header with visual feedback
- **Responsive Design**: Language switcher adapts to mobile devices

## Supported Languages

1. **English (en)** - Default language
2. **French (fr)** - Français
3. **Chinese (zh)** - 中文

## How It Works

### Language Files
- `js/en.js` - English translations
- `js/fr.js` - French translations  
- `js/zh.js` - Chinese translations
- `js/language-manager.js` - Language management system

### Internationalization Attributes
The HTML uses `data-i18n` attributes to mark translatable text:

```html
<h1 data-i18n="title">m3u8在线播放器</h1>
<input data-i18n="url_placeholder" placeholder="请输入m3u8播放地址">
```

### Language Manager
The `LanguageManager` class handles:
- Language detection and switching
- Text updates throughout the interface
- Language preference storage
- Dynamic language switcher creation

## Adding New Languages

To add a new language:

1. Create a new language file (e.g., `js/es.js` for Spanish)
2. Add the language object with all required keys
3. Include the file in `index.html`
4. Add the language to the `languages` object in `language-manager.js`

Example language file structure:
```javascript
const es = {
    "home": "Inicio",
    "about": "Acerca de",
    "title": "Reproductor M3U8 en línea",
    // ... add all other keys
};
```

## Language Keys

The following keys are used throughout the interface:

### Header
- `home` - Home link text
- `about` - About link text
- `language` - Language switcher label

### Main Content
- `title` - Main page title
- `url_placeholder` - URL input placeholder
- `play_button` - Play button alt text

### Content Sections
- `embed_website` - Embed section title
- `description` - Main description text
- `what_is_m3u8` - M3U8 explanation section title
- `m3u8_explanation` - M3U8 file explanation
- `m3u8_example` - M3U8 usage examples
- `m3u8_effect` - M3U8 functionality explanation
- `m3u8_paths` - M3U8 path information
- `m3u8_format` - M3U8 format details

### Footer
- `quote` - Inspirational quote
- `quote_author` - Quote author
- `copyright` - Copyright notice
- `disclaimer` - Legal disclaimer
- `friendly_links` - Friendly links section title

## Browser Compatibility

- Modern browsers with ES6 support
- LocalStorage for language preference storage
- Responsive design for mobile devices

## Usage

Users can:
1. **Auto-detect**: Language is automatically set based on browser settings
2. **Manual switch**: Click language buttons in the header to change language
3. **Persistent**: Language choice is remembered across sessions

## Technical Implementation

- **No external dependencies** - Pure JavaScript implementation
- **Modular design** - Easy to maintain and extend
- **Performance optimized** - Minimal DOM manipulation
- **Accessibility friendly** - Proper ARIA labels and semantic HTML

## Future Enhancements

Potential improvements:
- Add more languages (German, Spanish, Japanese, etc.)
- RTL language support (Arabic, Hebrew)
- Dynamic content loading based on language
- Server-side language detection
- Translation management system
