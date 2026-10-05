// src/shared/scripts/utils/typewriter.ts

/**
 * Typewriter effect.
 *
 * Types a string into an element character by character, then optionally
 * runs a sequence of fade-in animations on other elements.
 *
 * Singleton: use `typewriter` (the exported instance) instead of `new Typewriter()`.
 * Multiple instances would fight over the same DOM elements and timers.
 */

interface SequentialItem {
  element: HTMLElement;
  /** Delay before this element starts fading in (ms). Default: 0. */
  delayBefore?: number;
  /** Duration of the fade (ms). Default: 300. */
  duration?: number;
}

class Typewriter {
  private static instance: Typewriter | null = null;

  private readonly speed: number;
  private readonly initAfter: number;

  private constructor(speed: number, initAfter: number) {
    this.speed = speed;
    this.initAfter = initAfter;
  }

  public static getInstance(speed = 100, initAfter = 400): Typewriter {
    // speed --> velocity of type any letter
    // initAfter --> delay before start to type any letter
    if (!Typewriter.instance) Typewriter.instance = new Typewriter(speed, initAfter);
    return Typewriter.instance;
  }

  /**
   * Type `text` into `element`, character by character.
   * Calls `onComplete` after the last character is written.
   */
  public type(
    element: HTMLElement,
    text: string,
    onComplete?: () => void
  ): void {
    let i = 0;
    element.textContent = '';

    const step = () => {
      if (i >= text.length) return;

      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        onComplete?.();
      } else {
        setTimeout(step, this.speed);
      }
    };

    setTimeout(step, this.initAfter);
  }

  /**
   * Fade an element in: starts invisible and shifted down, ends visible.
   * Uses inline styles so it doesn't depend on any CSS class.
   */
  public fadeIn(element: HTMLElement, duration = 300, delay = 0): void {
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(15px)';
      element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;

      // Force a reflow so the browser registers the starting state.
      void element.offsetHeight;

      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  /**
   * Fade in a list of elements one after another.
   * Each element's delay is added on top of the previous one's total time.
   */
  public showSequential(items: SequentialItem[], startDelay = 0): void {
    let totalDelay = startDelay;

    for (const item of items) {
      const delayBefore = item.delayBefore ?? 0;
      const duration = item.duration ?? 300;

      totalDelay += delayBefore;
      this.fadeIn(item.element, duration, totalDelay);
      totalDelay += duration;
    }
  }
}

/** Singleton instance used across the app. */
export const typewriter = Typewriter.getInstance();

// -----------------------------------------------------------------------------
// Home page bootstrap
// -----------------------------------------------------------------------------

/**
 * Run the typewriter intro on the home page.
 *
 * The title text is read from `data-original-text` first (set by
 * applyTranslations), falling back to the current textContent.
 */

interface SelectorParams {
  /** CSS selector for the container to scope queries inside. */
  container: string;
  /** Selector for the element that gets typed (relative to container). */
  title: string;
  /** Selectors for elements that fade in after the title, in order. */
  elementsToFade?: string[];
}

/**
 * Initialize the typewriter intro effect on a scoped container.
 *
 * Reads a title element, wipes it, types its text character by character,
 * then fades in a list of sibling elements one after another.
 *
 * The effect is scoped to `params.container`, so multiple typewriters can
 * coexist on the same page without id collisions.
 *
 * @param params - Configuration (see `SelectorParams`).
 *
 * @example
 *   initTypewriter({
 *     container: '#hero',
 *     title: '[data-typewriter]',
 *     elementsToFade: ['[data-fade-1]', '[data-fade-2]', '[data-fade-3]'],
 *   });
 */
export function initTypewriter(params: SelectorParams): void {
  const container = document.querySelector<HTMLElement>(params.container);
  if (!container) return;

  const title = container.querySelector<HTMLElement>(params.title);
  if (!title) return;

  // Capture the text before wiping the element. This is the string
  // the typewriter will "type" back in.
  const titleText = title.textContent ?? '';

  // Reset any leftover state from a previous run (e.g. after a language change
  // or an Astro SPA navigation that reuses the same DOM node).
  title.textContent = '';

  // Collect the elements that will fade in after the title finishes typing.
  const faders: HTMLElement[] = [];

  if (params.elementsToFade) {
    for (const selector of params.elementsToFade) {
      const el = container.querySelector<HTMLElement>(selector);
      if (!el) continue;

      // Apply the "hidden" starting state immediately, so these elements
      // are invisible while the title is being typed.
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = 'opacity 300ms ease, transform 300ms ease';

      faders.push(el);
    }
  }

  // Run the typewriter on the title. When it completes, fade in the
  // collected elements sequentially.
  typewriter.type(title, titleText, () => {
    // Build the sequence config. Each fader waits `delayBefore` ms
    // after the previous one finishes, then fades over `duration` ms.
    const items: SequentialItem[] = [];
    for (const el of faders) {
      items.push({ 
        element: el, 
        delayBefore: 300, 
        duration: 300 
      });
    } 

    typewriter.showSequential(items);

    // Swap the cursor style: the "fast" blinking used while typing
    // is replaced by a slower, calmer blink once the text is settled.
    title.classList.remove('typewriter-cursor-fast');
    title.classList.add('typewriter-cursor');
  });
}


interface DocumentExtended extends Document {
  _typewriterRegistry?: SelectorParams[];
  _typewriterListenerAttached?: boolean;
}

const doc = document as DocumentExtended;

/**
 * Register a typewriter configuration and ensure a single global listener
 * runs them all on `applyTranslations`.
 */
export function setEventTypewriter(params: SelectorParams): void {
  // Init registry once.
  if (!doc._typewriterRegistry) doc._typewriterRegistry = [];

  // Replace any existing entry for the same container (idempotent re-register).
  const registry = doc._typewriterRegistry;
  const idx = registry.findIndex((p) => p.container === params.container);
  if (idx !== -1) registry[idx] = params;
  else registry.push(params);

  // Attach global listener once.
  if (!doc._typewriterListenerAttached) {
    doc._typewriterListenerAttached = true;

    doc.addEventListener('applyTranslations', () => {
      doc.fonts.ready.then(() => {
        for (const p of doc._typewriterRegistry ?? []) {
          initTypewriter(p);
        }
      });
    });
  }
}