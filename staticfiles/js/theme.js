// ==================== THEME MODULE ====================

// Inicializar tema al cargar la página
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    // Remover clases existentes
    body.classList.remove('dark-mode', 'light-mode');
    
    // Aplicar nueva clase
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
        }
    } else {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
        }
    }
    
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Event listener para el botón de tema
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});