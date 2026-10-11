// src/shared/scripts/utils/typewriter.ts
import { resolveKey } from "../navbar/translations";


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
  public static isTyping: boolean = false;

  private readonly speed: number;
  private readonly initAfter: number;

  /** Mapa elemento -> token del run activo */
  private runTokens = new WeakMap<HTMLElement, symbol>();

  /** Timers activos por elemento (para limpiarlos al cancelar) */
  private timers = new WeakMap<HTMLElement, number[]>();

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
   * Cancel any in-flight typing on `element`.
   *
   * Two things happen here:
   *
   * 1. The run token for `element` is deleted. Any `step` already scheduled
   *    will see that its token no longer matches and bail out silently,
   *    so it won't touch the DOM even if its timeout still fires.
   * 2. All pending `setTimeout` handles registered for `element` are cleared
   *    and removed from the timer map, so we don't leave orphaned callbacks
   *    sitting in the event loop.
   *
   * Safe to call on an element that isn't currently typing: both operations
   * are no-ops if there's nothing to cancel.
   *
   * @param element - The element whose active typing run should be aborted.
   */
  public cancel(element: HTMLElement): void {
    // Invalidate the token: any pending `step` will self-discard on its next tick.
    this.runTokens.delete(element);

    // Clear any timers still queued for this element.
    const timers = this.timers.get(element);
    if (timers) {
      for (const t of timers) clearTimeout(t);
      this.timers.delete(element);
    }
  }

  /**
   * Schedule `fn` to run after `delay` ms, tracking the timeout handle so it
   * can be cleared later by `cancel`.
   *
   * `setTimeout` alone isn't enough for the typewriter: when the language
   * changes mid-animation, we need a way to stop every queued callback for a
   * given element. By keying timers by element, `cancel(element)` can wipe
   * the whole batch in one go.
   *
   * @param element - The element the callback belongs to (used as the timer key).
   * @param fn      - The callback to invoke after the delay.
   * @param delay   - Milliseconds to wait before invoking `fn`.
   */
  private schedule(element: HTMLElement, fn: () => void, delay: number): void {
    const id = window.setTimeout(fn, delay);
    const list = this.timers.get(element) ?? [];
    list.push(id);
    this.timers.set(element, list);
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
    // Cancels any previous run on this same element.
    this.cancel(element);

    // New token for this run
    const token = Symbol('typewriter-run');
    this.runTokens.set(element, token);

    let i = 0;
    element.textContent = '';

    const step = () => {
      // If another run took control, we abort silently.
      if (this.runTokens.get(element) !== token) return;

      if (i >= text.length) return;

      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        onComplete?.();
      } else {
        // setTimeout(step, this.speed);
        this.schedule(element, step, this.speed);
      }
    };

    // setTimeout(step, this.initAfter);
    this.schedule(element, step, this.initAfter);
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
  const keyI18n = title.getAttribute('data-i18n');
  const titleText = resolveKey(keyI18n ?? '') as string;

  /* if (titleText == null) {
    const titleText = title.textContent ?? '';
    title.setAttribute('data-original', titleText);
  } */

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