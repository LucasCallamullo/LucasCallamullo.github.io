// js/sliding-nav.js

/**
 * Sliding Underline Navigation
 * Mueve la barra al botón activo al hacer clic o cargar la página
 */

class SlidingNavigation {
    constructor(navSelector = '.nav-container', barSelector = '.nav-sliding-bar', buttonSelector = '.btn-nav') {

        this.container = document.querySelector(navSelector);
        this.bar = document.querySelector(barSelector);
        this.buttonSelector = buttonSelector;
        this.buttons = [];
        this.currentActive = null;
        
        if (!this.container || !this.bar) {
            console.error('Navigation container or sliding bar not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Obtener todos los botones de navegación
        // Actualizar referencia de botones
        this.updateButtons();
        
        if (this.buttons.length === 0) return;
        
        // Configurar eventos (con delegación)
        this.setupEvents();
        
        // Inicializar la barra en el botón activo o el primero
        this.setInitialActive();
    }

    /**
     * Configuración de eventos usando DELEGACIÓN
     * Un solo evento en el contenedor vs N eventos en cada botón
     */
    setupEvents() {
        // DELEGACIÓN: Un solo event listener en el contenedor
        this.container.addEventListener('click', (e) => {
            // Buscar si el click fue en un botón o dentro de un botón
            const button = e.target.closest(this.buttonSelector);
            
            if (!button) return; // No es un botón de navegación
            
            e.preventDefault();
            
            const path = button.getAttribute('data-nav');
            // if (!path) return;
            
            // Actualizar estado activo
            this.setActiveButton(button);
            
            // Mover la barra
            this.moveBarToButton(button);
            
            // Disparar evento personalizado para el router
            const event = new CustomEvent('navchange', { 
                detail: { path, button } 
            });
            document.dispatchEvent(event);
        });
        
        // Recalcular posición en resize (importante para responsive)
        window.addEventListener('resize', () => {
            if (this.currentActive) {
                this.moveBarToButton(this.currentActive);
            }
        });

        // Escuchar el evento personalizado
        window.addEventListener('slidingNavUpdate', () => {
            if (this.currentActive) {
                this.moveBarToButton(this.currentActive);
            }
        });
        
        // Opcional: Observer para detectar cambios en el DOM (si se agregan botones dinámicamente)
        this.setupMutationObserver();
    }

    /**
     * Opcional: Observa cambios en el DOM para actualizar botones automáticamente
     * Útil si tu router agrega/quita botones dinámicamente
     */
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            // Verificar si se agregaron o quitaron botones
            const hasButtonChanges = mutations.some(mutation => {
                return Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && (node.matches?.(this.buttonSelector) || node.querySelector?.(this.buttonSelector))
                ) || Array.from(mutation.removedNodes).some(node => 
                    node.nodeType === 1 && (node.matches?.(this.buttonSelector) || node.querySelector?.(this.buttonSelector))
                );
            });
            
            if (hasButtonChanges) {
                this.updateButtons();
                
                // Si el botón activo ya no existe, resetear
                if (this.currentActive && !this.container.contains(this.currentActive)) {
                    this.setInitialActive();
                }
            }
        });
        
        observer.observe(this.container, { childList: true, subtree: true });
    }
    
    
    setInitialActive() {
        // Buscar si hay un botón con clase 'active'
        const activeButton = this.buttons.find(btn => btn.classList.contains('active'));
        
        if (activeButton) {
            // Si hay uno activo, mover la barra allí
            this.currentActive = activeButton;
            this.moveBarToButton(activeButton);
        } else {
            // Si no, activar el primero
            this.setActiveButton(this.buttons[0]);
            this.moveBarToButton(this.buttons[0]);
        }
    }
    
    setActiveButton(button) {
        
        // Remover clase active de todos
        this.buttons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al seleccionado
        button.classList.add('active');
        this.currentActive = button;
    }
    
    moveBarToButton(button) {

        const buttonRect = button.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        // Calcular posición relativa al contenedor
        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;
        
        // Aplicar posición a la barra
        this.bar.style.left = `${left}px`;
        this.bar.style.width = `${width}px`;
    }
    
    /**
     * Método público para cambiar navegación programáticamente
     * Útil para el router cuando se navega por URL
     */
    navigateTo(path) {
        const targetButton = this.buttons.find(btn => btn.getAttribute('data-nav') === path);
        if (targetButton) {
            this.setActiveButton(targetButton);
            this.moveBarToButton(targetButton);
        }
    }

    /**
     * Actualiza la lista de botones (útil si el DOM cambia dinámicamente)
     */
    updateButtons() {
        this.buttons = Array.from(this.container.querySelectorAll(this.buttonSelector));
    }

    /**
     * Refresca la posición de la barra (útil después de cambios de layout)
     */
    refreshBarPosition() {
        if (this.currentActive) {
            this.moveBarToButton(this.currentActive);
        }
    }

}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.slidingNav = new SlidingNavigation();
});

// Exportar para usar en el router (si usas módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SlidingNavigation;
}