// js/router.js - SIN imports/exports, todo global

// 1. DEFINIR TUS VISTAS COMO OBJETOS GLOBALES
const ProjectsView = {
    template: `
        <div class="projects-container">
            <h2 class="roboto-bold font-xxxl">Mis Proyectos</h2>
            <div class="projects-grid mt-4">
                <div class="project-card">
                    <h3>Proyecto 1</h3>
                    <p>Descripción del proyecto...</p>
                </div>
                <div class="project-card">
                    <h3>Proyecto 2</h3>
                    <p>Descripción del proyecto...</p>
                </div>
            </div>
            <button class="btn btn-alt mt-4" data-nav="home">
                ← Volver al inicio
            </button>
        </div>
    `,
    
    onMount: function() {
        console.log('Vista de proyectos cargada');
        // Aquí puedes cargar proyectos desde una API
    }
};

// 2. DEFINIR RUTAS
const ROUTES = {
    '/': HomeView,
    '/home': HomeView,
    '/about': AboutView,
    '/projects': ProjectsView,
    '/contact': ContactView,
    '/skills': SkillView
};

const ROUTE_TO_NAV = {
    '/': 'home',
    '/home': 'home',
    '/about': 'about',
    '/projects': 'projects',
    '/contact': 'contact',
    '/skills': 'skills'
};

let currentView = null;
let currentPath = window.location.pathname;

// 3. FUNCIÓN PRINCIPAL DE RENDERIZADO
function renderView(path, addToHistory = true) {

    // Normalizar path
    let normalizedPath = path;
    if (!normalizedPath.startsWith('/')) {
        normalizedPath = '/' + normalizedPath;
    }

    const ViewComponent = ROUTES[normalizedPath] || ROUTES['/'];
    
    // Si no cambió la ruta, no hacer nada
    if (normalizedPath === currentPath && currentView === ViewComponent) {
        return;
    }
    // const ViewComponent = ROUTES[path] || ROUTES['/'];

    const appRoot = document.getElementById('app-root');
    if (!appRoot) {
        console.error('No se encontró el elemento app-root');
        return;
    }
    
    // Limpiar vista anterior si tiene onDestroy
    if (currentView && currentView.onDestroy) {
        currentView.onDestroy();
    }
    
    // Fade out
    appRoot.style.opacity = '0';
    appRoot.style.transition = 'opacity 0.2s ease';
    
    setTimeout(function() {
        // Renderizar nuevo template
        appRoot.innerHTML = ViewComponent.template.trim();
        
        // Ejecutar mount del nuevo componente
        if (ViewComponent.onMount) {
            ViewComponent.onMount();
        }
        
        // Fade in
        appRoot.style.opacity = '1';
        
        // Guardar referencia
        currentView = ViewComponent;
        currentPath = path;
        
        // Actualizar navegación activa
        const navKey = ROUTE_TO_NAV[normalizedPath] || 'home';
        updateActiveNav(navKey);
        // updateActiveNav(path);
        
        // MOVER LA BARRA DESLIZANTE cuando cambia la vista
        setTimeout(() => moveSlidingBarToActiveButton(), 10);
        
        // Actualizar historial si es necesario
        if (addToHistory) {
            window.history.pushState({ path: normalizedPath }, '', normalizedPath);
        }
        
        // Disparar evento personalizado (útil para analytics)
        const event = new CustomEvent('viewchanged', { detail: { path: normalizedPath } });
        document.dispatchEvent(event);

    }, 150);
}

// 3.5. NUEVA FUNCIÓN: Navegar desde URL (sin simular click)
function navigateFromUrl() {
    const path = window.location.pathname;
    
    // Normalizar path (eliminar / inicial)
    let route = path === '/' ? 'home' : path.slice(1);
    
    // Verificar si la ruta existe en ROUTES
    const validRoutes = ['home', 'about', 'projects', 'contact', 'skills'];
    
    if (validRoutes.includes(route) && route !== currentPath.slice(1)) {
        // Navegar directamente sin simular click
        navigateTo(route);
    } else if (!validRoutes.includes(route) && path !== '/') {
        // Ruta no válida, redirigir a 404 o home
        console.warn(`Ruta no válida: ${path}, redirigiendo a home`);
        navigateTo('home');
    }
}

// 4. MANEJAR NAVEGACIÓN
function navigateTo(path, addToHistory = true) {
    renderView(path, addToHistory);
}

/*
function navigateTo(path, addToHistory = true) {
    // Normalizar path
    let normalizedPath = path.startsWith('/') ? path : '/' + path;
    
    // Evitar navegar a la misma ruta
    if (normalizedPath === currentPath) {
        return;
    }
    
    if (addToHistory) {
        window.history.pushState({ path: normalizedPath }, '', normalizedPath);
    }
    
    renderView(normalizedPath);
} */

// 5. FUNCIÓN PARA INICIAR DESDE URL ACTUAL
function handleInitialUrl() {
    let path = window.location.pathname;
    
    // Verificar si es una ruta válida
    const isValidRoute = Object.keys(ROUTES).includes(path);
    
    if (!isValidRoute && path !== '/') {
        console.warn(`Ruta no válida: ${path}, redirigiendo a home`);
        path = '/';
        // Opcional: corregir la URL en el navegador
        window.history.replaceState({ path: '/' }, '', '/');
    }
    
    renderView(path, false); // false = no agregar al historial (ya está)
}

// 6. CONFIGURAR EVENTOS
function setupNavigation() {
    // Delegación de eventos para clicks
    document.body.addEventListener('click', function(e) {
        const navButton = e.target.closest('[data-nav]');
        if (navButton) {
            e.preventDefault();
            const route = navButton.getAttribute('data-nav');
            navigateTo(route);
        }
    });
    
    // Manejar botones atrás/adelante
    window.addEventListener('popstate', function(event) {
        const path = event.state?.path || window.location.pathname;
        renderView(path, false); // false = no agregar al historial
    });
}

function updateActiveNav(navKey) {
    document.querySelectorAll('[data-nav]').forEach(function(btn) {
        const btnPath = btn.getAttribute('data-nav');
        if (btnPath === navKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/*
function updateActiveNav(path) {
    document.querySelectorAll('[data-nav]').forEach(function(btn) {
        const btnPath = btn.getAttribute('data-nav');
        const current = path === '/' + btnPath || (path === '/' && btnPath === 'home');
        
        if (current) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
} */


// NUEVA FUNCIÓN: Mueve la barra deslizante al botón activo
function moveSlidingBarToActiveButton() {
    // Esperar un momento para que el DOM se actualice
    setTimeout(() => {
        // Buscar el botón activo
        const activeButton = document.querySelector('.btn-nav.active');
        
        // Si existe el slidingNav global, usarlo
        if (window.slidingNav && typeof window.slidingNav.moveBarToButton === 'function') {
            if (activeButton) {
                window.slidingNav.moveBarToButton(activeButton);
            }
        } 
        // Fallback: mover la barra manualmente
        else if (activeButton) {
            const container = document.querySelector('.nav-container');
            const bar = document.querySelector('.nav-sliding-bar');
            
            if (container && bar) {
                const buttonRect = activeButton.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                bar.style.left = `${buttonRect.left - containerRect.left}px`;
                bar.style.width = `${buttonRect.width}px`;
            }
        }
    }, 50); // Pequeño delay para asegurar que el DOM está listo
}


// 6. FUNCIÓN DE AYUDA PARA NAVEGAR DESDE CONSOLA (debug)
window.navigate = navigateTo;

// 7. INICIALIZAR
function init() {

    setupNavigation();

    handleInitialUrl();

    // Renderizar vista inicial
    // const initialPath = window.location.pathname || '/';
    // renderView(initialPath);
}

// Arrancar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}