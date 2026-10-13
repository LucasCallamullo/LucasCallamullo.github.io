// src/home/scripts/utils/swiper.ts

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

/**
 * Options used by the main skills carousel.
 * Exposed so callers can override pieces without rewriting the whole config.
 */
export interface SkillsSwiperOptions extends SwiperOptions {
  /** CSS selector for the swiper root element. */
  selector?: string;
}

const DEFAULT_OPTIONS: SkillsSwiperOptions = {
  selector: '.skillsSwiper',

  // Loop + drag
  slidesPerView: 'auto',
  spaceBetween: 20,
  grabCursor: true,
  resistanceRatio: 0.001,
  preventInteractionOnTransition: true,
  slideToClickedSlide: true,
  loop: true,

  // Autoplay para que se mueva solo (y se detenga al interactuar) ---
  autoplay: {
    delay: 900,             // 0 segundos entre transiciones → movimiento continuo
    disableOnInteraction: false, // Se detiene si el usuario interactúa (drag o click)
    pauseOnMouseEnter: true,   // No se pausa al hacer hover, para mantener fluidez
    // stopOnLastSlide: false,
    // waitForTransition: false
  },

  // Misc
  mousewheel: false, 
  // speed: Velocidad de la transición (en milisegundos) (más alta = más lento y fluido)
  // 400 = 0.4 segundos tarda en moverse de un slide a otro
  // speed: 300,

  // effect: Tipo de animación al cambiar de slide
  // 'slide' = Desplazamiento lateral normal (el clásico)
  // Otras opciones: 'fade', 'cube', 'flip', 'coverflow', 'creative'
  effect: 'slide',

  // Responsive
  breakpoints: {
    320:  { spaceBetween: 8, slidesPerView: 2 },
    480:  { spaceBetween: 8, slidesPerView: 2 },
    640:  { spaceBetween: 12, slidesPerView: 2 },
    768:  { spaceBetween: 20, slidesPerView: 3 },
    1024: { spaceBetween: 24, slidesPerView: 6 },
  },

  // Events
  on: {
    init() {
      if (import.meta.env.DEV) console.log('[swiper] skills carousel initialized');
    },
    autoplayTimeLeft() {
      // Hook for visual progress if needed.
    },
    touchEnd() {
      // Autoplay stops on interaction because `disableOnInteraction: false`.
      // Re-enable here if you want it to resume.
    },
  },
};

/**
 * Initialize the skills carousel.
 * Idempotent: calling it again on the same element returns the existing
 * instance (Swiper exposes it via `el.swiper`).
 */
interface SwiperElement extends HTMLElement {
  swiper?: Swiper;
}

export function initSkillsSwiper(options: SkillsSwiperOptions = {}): Swiper | null {
  const merged = { ...DEFAULT_OPTIONS, ...options };
  const { selector, ...swiperOptions } = merged;

  const el = document.querySelector<SwiperElement>(selector ?? '.skillsSwiper');
  if (!el) return null;

  // Prevent double-init on the same element.
  if (el.swiper) {
    el.swiper.destroy(true, true);
  }

  // Swiper needs the modules array explicitly in v11+.
  return new Swiper(el, {
    ...swiperOptions,
    modules: [Autoplay],
  });
}