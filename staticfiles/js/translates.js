// ==================== TRANSLATIONS MODULE ====================

/**
 * Manages internationalization (i18n) for the application.
 * Handles loading translation JSON files, applying translations to DOM elements,
 * and persisting language preference in localStorage.
 * Dispatches a 'translationsLoaded' event when translations are ready.
 */

let currentLang = localStorage.getItem('language') || 'en';
let g_TRANSLATIONS = {};

/**
 * Loads translation JSON file for the specified language.
 * Applies translations to all elements with data-i18n attribute.
 * Dispatches 'translationsLoaded' event when complete.
 * 
 * @param {string} lang - Language code ('en' or 'es')
 * @returns {Promise<void>}
 */
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to load ${lang}.json`);
        }
        
        g_TRANSLATIONS = await response.json();

        // Apply translations to DOM elements
        applyTranslations();

        // Update current language and persist to localStorage
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update flag icon in language switcher button
        updateLanguageFlag(lang);

        // Disparar evento ESPECÍFICO para la barra deslizante
        window.dispatchEvent(new CustomEvent('slidingNavUpdate'));

    } catch (error) {
        console.error('Error loading language:', error);
    }
}


/**
 * Gets value from translations object supporting both:
 * - Flat keys: "nav.home" (stored as is in JSON)
 * - Nested keys: "skills.languages" (stored as object.skills.languages)
 * 
 * @param {Object} g_TRANSLATIONS - The translations object
 * @param {string} key - The i18n key (e.g., "nav.home" or "skills.languages")
 * @returns {string|undefined} The translated value or undefined
 */
function getTranslationValue(translations, key) {
    if (!g_TRANSLATIONS || !key) return undefined;
    
    // Try 1: Direct lookup (for flat keys like "nav.home")
    if (g_TRANSLATIONS[key] !== undefined) {
        return g_TRANSLATIONS[key];
    }
    
    // Try 2: Nested lookup (for keys like "skills.languages")
    const nestedValue = key.split('.').reduce((obj, part) => {
        return obj && obj[part] !== undefined ? obj[part] : undefined;
    }, g_TRANSLATIONS);
    
    return nestedValue;
}


// En tu translates.js, actualiza la función updateLanguageFlag:
function updateLanguageFlag(lang) {
    const flagContainer = document.getElementById('currentLangFlag');

    flagContainer.innerHTML = /*html*/`
        <img src="./staticfiles/icon/${(lang === 'en') ? 'flag_us.svg' : 'flag_ar.svg'}" 
            alt="EN" class="flag-icon">
    `;
}

function applyTranslations() {

    document.querySelectorAll('.download-cv').forEach(e => {

        const key = e.getAttribute('data-i18n');

        // Soporte para keys anidadas: "skills.languages" -> g_TRANSLATIONS.skills.languages
        const value = getTranslationValue(g_TRANSLATIONS, key);

        // quitar la key "footer.href_download"
        if (value) e.href = value;
    });

    document.querySelectorAll('[data-i18n]').forEach(e => {
        const key = e.getAttribute('data-i18n');

        // Skip download-cv elements (already handled above)
        if (key === 'footer.href_download') return;

        // Soporte para keys anidadas: "skills.languages" -> g_TRANSLATIONS.skills.languages
        const value = getTranslationValue(g_TRANSLATIONS, key);

        if (value) {
            e.setAttribute('data-original-text', value);
            
            if (e.id === 'title') {
                if (!e.classList.contains('typewriter-cursor')) {
                    e.textContent = value;
                }
            } else {
                e.textContent = value;
            }
        }
    });
}

/**
 * Public API to change language programmatically.
 * @param {string} lang - Language code ('en' or 'es')
 */
async function setLanguage(lang) {
    await loadLanguage(lang);
}


// ==================== INITIALIZATION ====================
// Load saved language preference when the page starts, regardless of DOM state

/**
 * Initializes the g_TRANSLATIONS module.
 * Loads the saved language (or default 'en') and dispatches the ready event.
 */
async function initTranslations() {
    await loadLanguage(currentLang);

    // Small delay to ensure DOM is fully rendered
    setTimeout(initTypewriter, 150); 
}

// Execute initialization immediately
// No need to wait for DOMContentLoaded because fetch requests run in parallel
initTranslations();

