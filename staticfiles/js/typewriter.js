// ==================== TYPEWRITER MODULE ====================
// Only the TITLE has the letter-by-letter typewriter effect
// The subtitle remains visible from the start
// Text paragraphs and buttons fade in sequentially after the title finishes

/**
 * Creates a typewriter animation effect on a title element,
 * with sequential fade-in animations for other elements.
 */
class TypewriterEffect {
    /**
     * Creates an instance of TypewriterEffect.
     * @param {number} [speed=100] - Typing speed in milliseconds per character.
     */
    constructor(speed = 70) {
        this.speed = speed;
    }
    
    /**
     * Applies a letter-by-letter typewriter effect to the target element.
     * Adds a blinking cursor that remains visible after completion.
     * @param {HTMLElement} element - The DOM element to apply the typewriter effect to.
     * @param {string} text - The text to be typed into the element.
     * @param {Function} [onComplete] - Optional callback function executed when typing finishes.
     */
    typeTitle(element, text, onComplete) {
        let i = 0;
        element.textContent = '';
        // element.classList.add('typewriter-cursor');

        const type = () => {
            if (i < text.length) {
                const isLastChar = i === text.length - 1;
                element.textContent += text.charAt(i);
                i++;
                
                if (isLastChar) {
                    // Last character added, execute callback immediately
                    if (onComplete) onComplete();
                } else {
                    // Cursor remains blinking (class is not removed)
                    setTimeout(type, this.speed);
                }
            }
        };
        
        type();
    }
    
    /**
     * Applies a fade-in animation to an element with optional delay.
     * The element starts invisible and translates up slightly while fading in.
     * @param {HTMLElement} element - The DOM element to fade in.
     * @param {number} [duration=300] - Animation duration in milliseconds.
     * @param {number} [delay=0] - Delay before starting the animation in milliseconds.
     */
    fadeIn(element, duration = 300, delay = 0) {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(15px)';
            element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            
            // Force reflow to ensure transition works properly
            void element.offsetHeight;
            
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
    /**
     * Executes sequential fade-in animations for an array of elements.
     * Each element fades in after the previous one completes.
     * @param {Array<Object>} elements - Array of element configuration objects.
     * @param {HTMLElement} elements[].element - The DOM element to fade in.
     * @param {number} [elements[].delayBefore=0] - Delay before this element starts fading in.
     * @param {number} [elements[].duration=500] - Duration of the fade animation.
     * @param {number} [startDelay=0] - Initial delay before the sequence begins.
     */
    showSequential(elements, startDelay = 0) {
        let totalDelay = startDelay;
        
        elements.forEach((item) => {
            const delayBefore = item.delayBefore || 0;
            const duration = item.duration || 300;
            
            totalDelay += delayBefore;
            this.fadeIn(item.element, duration, totalDelay);
            totalDelay += duration;
        });
    }
}


/**
 * Initializes the typewriter effect.
 * Called only after translations are fully loaded.
 */
function initTypewriter() {
    
    const TYPE_WRITER = new TypewriterEffect();
    
    // Get DOM elements
    const titleElement = document.getElementById('title');
    const description1 = document.getElementById('main-span');
    const description2 = document.getElementById('main-spann');
    const buttonsContainer = document.getElementById('main-buttons');

    // Guard clause: exit if required elements don't exist
    if (!titleElement) {
        console.warn('TYPE_WRITER: title element not found');
        return;
    }
    
    // Retrieve title text from data attribute or fallback to text content
    const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;
    
    // Elements that will fade in after the title
    // Set initial state: hidden and shifted down
    description1.style.opacity = '0';
    description1.style.transform = 'translateY(15px)';
    description1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    description2.style.opacity = '0';
    description2.style.transform = 'translateY(15px)';
    description2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    buttonsContainer.style.opacity = '0';
    buttonsContainer.style.transform = 'translateY(15px)';
    buttonsContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Temporarily clear text content while the title is typing
    const desc1Original = description1.textContent;
    const desc2Original = description2.textContent;
    description1.textContent = '';
    description2.textContent = '';
    
    // Start typewriter effect on the title
    TYPE_WRITER.typeTitle(titleElement, titleText, () => {
        // Restore original text content
        description1.textContent = desc1Original;
        description2.textContent = desc2Original;
        
        // Fade in elements sequentially:
        // Line 1 appears first, then line 2, then buttons
        TYPE_WRITER.showSequential([
            { element: description1, delayBefore: 0, duration: 300 },
            { element: description2, delayBefore: 100, duration: 300 },
            { element: buttonsContainer, delayBefore: 100, duration: 300 }
        ], 0);
    });
};



// ==================== INITIALIZATION ====================
// Wait for translations to be fully loaded before starting the typewriter

/**
 * Start the typewriter effect only after translations are ready.
 * Listens for the custom event dispatched by the translations module.
 *
document.addEventListener('translationsLoaded', function onTranslationsReady() {
    // Remove listener to prevent duplicate execution
    document.removeEventListener('translationsLoaded', onTranslationsReady);
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(initTypewriter, 200);
});

// Fallback: if translationsLoaded already fired before this listener was added
if (document.readyState === 'complete') {
    // Check if translations are already applied
    if (document.querySelector('[data-original-text]')) {
        setTimeout(initTypewriter, 200);
    }
} */