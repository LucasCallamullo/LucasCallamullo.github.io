// ==================== TYPEWRITER MODULE ====================
// Solo el TÍTULO tiene efecto letra por letra
// El subtítulo es visible desde el principio
// Los textos y botones aparecen con fade después

class TypewriterEffect {
    // 100
    constructor(speed = 80) {
        this.speed = speed;
    }
    
    // Efecto letra por letra SOLO para el título
    typeTitle(element, text, onComplete) {
        let i = 0;
        element.textContent = '';
        element.classList.add('typewriter-cursor');
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, this.speed);
            } else {
                // NO quitamos el cursor, solo llamamos al callback
                // element.classList.remove('typewriter-cursor'); ← COMENTADO
                if (onComplete) onComplete();
            }
        };
        
        type();
    }
    
    // Fade para los elementos que aparecen después
    fadeIn(element, duration = 500, delay = 0) {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(15px)';
            element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            
            // Forzar reflow
            void element.offsetHeight;
            
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
    
    // Mostrar elementos secuencialmente
    showSequential(elements, startDelay = 0) {
        let totalDelay = startDelay;
        
        elements.forEach((item, index) => {
            totalDelay += item.delayBefore || 0;
            this.fadeIn(item.element, item.duration || 500, totalDelay);
            totalDelay += (item.duration || 500);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Esperar a que carguen las traducciones
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const typewriter = new TypewriterEffect();
    
    // Obtener elementos
    const titleElement = document.getElementById('title');
    const description1 = document.getElementById('main-span');
    const description2 = document.getElementById('main-spann');
    const buttonsContainer = document.getElementById('main-buttons');
    
    // Obtener el texto del título desde data-original-text
    const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;
    
    // El subtítulo ya es visible, no hacemos nada con él
    
    // Configurar estado inicial para los elementos que aparecerán después
    description1.style.opacity = '0';
    description1.style.transform = 'translateY(15px)';
    description1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    description2.style.opacity = '0';
    description2.style.transform = 'translateY(15px)';
    description2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    buttonsContainer.style.opacity = '0';
    buttonsContainer.style.transform = 'translateY(15px)';
    buttonsContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Limpiar temporalmente los textos (solo los que aparecerán con fade)
    const desc1Original = description1.textContent;
    const desc2Original = description2.textContent;
    description1.textContent = '';
    description2.textContent = '';
    
    // Iniciar: primero el título letra por letra
    typewriter.typeTitle(titleElement, titleText, () => {
        // Cuando termina el título, restaurar textos y mostrar con fade
        
        // Restaurar textos
        description1.textContent = desc1Original;
        description2.textContent = desc2Original;
        
        // Mostrar secuencialmente: primero línea1, luego línea2, luego botones
        typewriter.showSequential([
            { element: description1, delayBefore: 0, duration: 500 },
            { element: description2, delayBefore: 200, duration: 500 },
            { element: buttonsContainer, delayBefore: 200, duration: 500 }
        ], 100);
    });
});