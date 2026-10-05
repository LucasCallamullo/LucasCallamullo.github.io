

function swipperInitMain() {

    const skillsSwiperElement = document.querySelector('.skillsSwiper');
    if (skillsSwiperElement) {
        const swiper = new Swiper(skillsSwiperElement, {
            // --- CONFIGURACIÓN CLAVE PARA UN LOOP FLUIDO Y DRAG ---
            slidesPerView: 'auto',    // Muy importante: cada slide ocupa su ancho natural
            spaceBetween: 20,          // Espacio entre slides
            grabCursor: true,
            resistanceRatio: 0.001,
            preventInteractionOnTransition: true,
            slideToClickedSlide: true,
            loop: true,
            
 
            // --- Autoplay para que se mueva solo (y se detenga al interactuar) ---
            autoplay: {
                delay: 1000,             // 0 segundos entre transiciones → movimiento continuo
                disableOnInteraction: false, // Se detiene si el usuario interactúa (drag o click)
                pauseOnMouseEnter: true,   // No se pausa al hacer hover, para mantener fluidez
                // stopOnLastSlide: false,
                // waitForTransition: false
            },


            mousewheel: false, 
            // speed: Velocidad de la transición (en milisegundos) (más alta = más lento y fluido)
            // 400 = 0.4 segundos tarda en moverse de un slide a otro
            // speed: 300,

            // effect: Tipo de animación al cambiar de slide
            // 'slide' = Desplazamiento lateral normal (el clásico)
            // Otras opciones: 'fade', 'cube', 'flip', 'coverflow', 'creative'
            effect: 'slide',

            // --- RESPONSIVE: Mismo comportamiento en todos los tamaños ---
            breakpoints: {
                640: { spaceBetween: 15, slidesPerView: 2 },
                768: { spaceBetween: 20, slidesPerView: 3 },
                1024: { spaceBetween: 25, slidesPerView: 6 },
            },
            // --- EVENTOS (para debug y comportamiento adicional) ---
            on: {
                init: function() {
                    console.log('Carrusel fluido inicializado');
                },
                autoplayTimeLeft: function(s, time, progress) {
                    // Puedes usar esto para efectos visuales si lo deseas
                },
                touchEnd: function() {
                    // Al terminar el drag, el autoplay se detiene (por disableOnInteraction)
                }
            }
        });
    }
};


