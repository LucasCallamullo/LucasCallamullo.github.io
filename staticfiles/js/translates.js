// ==================== TRANSLATIONS MODULE ====================

let currentLang = localStorage.getItem('language') || 'en';
let translations = {};

async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();
        applyTranslations();
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Actualizar bandera en el botón
        updateLanguageFlag(lang);

        // SOLO ESTAS 2 LÍNEAS:
        window.dispatchEvent(new Event('resize')); // Fuerza recálculo la nav moviable

    } catch (error) {
        console.error('Error loading language:', error);
    }
}


// En tu translates.js, actualiza la función updateLanguageFlag:
function updateLanguageFlag(lang) {
    const flagContainer = document.getElementById('currentLangFlag');

    flagContainer.innerHTML = /*html*/`
        <img src="./staticfiles/icon/${(lang === 'en') ? 'flag_us.svg' : 'flag_ar.svg'}" 
            alt="EN" class="flag-icon" 
            style="width: 20px; height: 14px;">
    `;
}

function applyTranslations() {

    document.querySelectorAll('.download-cv').forEach(e => {
        const key = e.getAttribute('data-i18n');
        // quitar la key "footer.href_download"
        if (translations[key]) {
            e.href = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');

        if (translations[key] && key != "footer.href_download") {
            element.setAttribute('data-original-text', translations[key]);
            
            if (element.id === 'title') {
                if (!element.classList.contains('typewriter-cursor')) {
                    element.textContent = translations[key];
                }
            } else {
                element.textContent = translations[key];
            }
        }
    });
}

function setLanguage(lang) {
    loadLanguage(lang);
}

// Cargar idioma al inicio
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadLanguage(currentLang);
        updateLanguageFlag(currentLang);
    });
} else {
    loadLanguage(currentLang);
    updateLanguageFlag(currentLang);
}