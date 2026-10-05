// ==================== TRANSLATIONS MODULE ====================

/**
 * Manages internationalization (i18n) for the application.
 * Handles loading translation JSON files, applying translations to DOM elements,
 * and persisting language preference in localStorage.
 * Dispatches a 'translationsLoaded' event when translations are ready.
 */

let CURRENT_LANG = localStorage.getItem('language') || 'en';
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

        // Update current language and persist to localStorage
        CURRENT_LANG = lang;
        localStorage.setItem('language', lang);

        // Update flag icon in language switcher button
        updateLanguageFlag(lang);


        // stupid about view functions
        renderClassicTimeline();

        // Apply translations to DOM elements
        applyTranslations({
            'refreshTimeline': () => renderButtonsOnTimeline(),    // from ABOUT SECTION
            'renderProjects': () => renderProjects(),           // from PROJECTS SECTION
            'animate': () => initSkillCardsAnimation()            // from SKILLS SECTION
        });

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


/**
 * Applies translations to all DOM elements with data-i18n attributes
 * 
 * @param {Object} callbacks - Optional dictionary of functions to execute after translations
 * @param {Function} callbacks[key] - Function to execute, receives no parameters
 * 
 * @example
 * applyTranslations({
 *     'refreshTimeline': () => renderTimeline(CURRENT_LANG),
 *     'updateCounter': () => console.log('Translations done')
 * });
 */
function applyTranslations(callbacks = {}) {

    // FIRST PASS: Handle download links (set href attribute)
    document.querySelectorAll('.download-cv').forEach(e => {

        const key = e.getAttribute('data-i18n');

        // Resolve nested keys: "skills.languages" -> g_TRANSLATIONS.skills.languages
        const value = getTranslationValue(g_TRANSLATIONS, key);

        // Remove the key "footer.href_download" - only set if value exists
        if (value) e.href = value;

        // this change download file
        if (key == "footer.href_download") {
            const downValue = getTranslationValue(g_TRANSLATIONS, "footer.download_file");
            if (downValue) e.download = downValue;
        }
    });
    

    // SECOND PASS: Handle all other translatable elements
    document.querySelectorAll('[data-i18n]').forEach(e => {
        const key = e.getAttribute('data-i18n');

        // Skip download-cv elements (already handled in first pass)
        if (key === 'footer.href_download') return;

        // Resolve nested keys: "skills.languages" -> g_TRANSLATIONS.skills.languages
        const value = getTranslationValue(g_TRANSLATIONS, key);

        if (value) {
            // Store original text for debugging or potential revert functionality
            e.setAttribute('data-original-text', value);
            
            // Special case: title element with typewriter animation
            // Preserve the original text content to avoid breaking the typewriter effect
            if (e.id === 'title') {
                if (!e.classList.contains('typewriter-cursor')) {
                    e.textContent = value;
                }
            } else {
                // Standard elements: just update the text content
                e.textContent = value;
            }
        }
    });

    // Execute all callback functions from the dictionary
    if (callbacks && typeof callbacks === 'object') {
        for (const [key, fn] of Object.entries(callbacks)) {
            if (typeof fn === 'function') {
                fn();
            }
        }
    }
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
    await loadLanguage(CURRENT_LANG);

    // Small delay to ensure DOM is fully rendered
    setTimeout(initTypewriter, 150); 
}

// Execute initialization immediately
// No need to wait for DOMContentLoaded because fetch requests run in parallel
initTranslations();

