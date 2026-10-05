

// Menú hamburguesa
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navList = document.getElementById('navList');
    
    if (!hamburgerBtn || !navList) return;

    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
        hamburgerBtn.classList.remove('open');
        navList.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        hamburgerBtn.classList.add('open');
        navList.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navList.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar al hacer clic en overlay
    overlay.addEventListener('click', closeMenu);

    // Cerrar al hacer clic en un link del menú
    navList.querySelectorAll('button[data-nav]').forEach(btn => {
        btn.addEventListener('click', closeMenu);
    });

    // Cerrar al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navList.classList.contains('open')) {
            closeMenu();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});