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

  private constructor(speed = 80) {
    this.speed = speed;
  }

  public static getInstance(speed = 80): Typewriter {
    if (!Typewriter.instance) Typewriter.instance = new Typewriter(speed);
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

    step();
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
 * Expects these elements (any missing one is skipped gracefully):
 *  - #title            → typed character by character
 *  - #main-span        → fades in after the title
 *  - #main-spann       → fades in after #main-span
 *  - #main-buttons     → fades in after #main-spann
 *
 * The title text is read from `data-original-text` first (set by
 * applyTranslations), falling back to the current textContent.
 */
// src/shared/scripts/utils/typewriter.ts

export function initTypewriter(): void {
  const title = document.getElementById('homeTitle');
  if (!title) return;

  const span1 = document.getElementById('homeSpanOne');
  const span2 = document.getElementById('homeSpanTwo');
  const buttons = document.getElementById('homeMainBtns');

  const titleText = title.textContent ?? '';

  // Reset any leftover state from a previous run.
  title.textContent = '';

  const faders: HTMLElement[] = [];
  if (span1) faders.push(span1);
  if (span2) faders.push(span2);
  if (buttons) faders.push(buttons);

  for (const el of faders) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity 300ms ease, transform 300ms ease';
  } 

  title.textContent = '';

  typewriter.type(title, titleText, () => {
    const items: SequentialItem[] = [];

    if (span1) items.push({ element: span1, delayBefore: 600, duration: 800 });
    if (span2) items.push({ element: span2, delayBefore: 500, duration: 500 });
    if (buttons) items.push({ element: buttons, delayBefore: 300, duration: 500 });

    typewriter.showSequential(items);
  });
}

export function setEventTypewriter(): void {
  document.addEventListener('applyTranslations', (e) => {
    document.fonts.ready.then(() => initTypewriter());
  });
}
