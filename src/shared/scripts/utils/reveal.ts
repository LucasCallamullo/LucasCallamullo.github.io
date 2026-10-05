// src/shared/scripts/utils/reveal.ts

/**
 * Reveal-on-scroll utility.
 *
 * Observes elements with `[data-reveal]` and toggles the `data-animate`
 * attribute when they enter or leave the viewport. The actual animation
 * (translate, fade, scale, etc.) is defined in CSS via a class on the
 * element, e.g. `cont_animate__from_left`.
 *
 * The observer is created **once** and reused across SPA navigations.
 * Call `initReveal()` on every `astro:page-load` — it will observe any
 * new `[data-reveal]` elements without creating extra observers.
 *
 * Per-element behavior:
 *  - If `once` is true, each element stops being observed after its first
 *    reveal (it won't animate again when it leaves the viewport).
 *  - Any element with `data-multi-anim` overrides `once` and keeps
 *    animating every time it enters the viewport.
 *
 * @example
 *   <!-- Once the element enters the viewport, `data-animate` is added,
 *        triggering the CSS transition defined in .cont_animate__from_left -->
 *   <CardSection class="cont_animate__from_left" data-reveal>
 *     ...
 *   </CardSection>
 *
 *   <!-- This one re-animates every time, even if `once` is true. -->
 *   <CardSection class="cont_animate__from_left" data-reveal data-multi-anim>
 *     ...
 *   </CardSection>
 *
 *   <!-- Setup: call once on every page-load. -->
 *   <script>
 *     import { initReveal } from '@shared/scripts/utils/reveal';
 *     document.addEventListener('astro:page-load', () => {
 *       initReveal({ once: true });
 *     });
 *   </script>
 */

export interface RevealOptions {
  /**
   * If true, each element is animated only once and then stops being
   * observed. Elements with `data-multi-anim` are exempt.
   * Default: false.
   */
  once?: boolean;
}

let observer: IntersectionObserver | null = null;

/**
 * Get (or lazily create) the singleton observer.
 * Reuses the same instance across calls so SPA navigations don't leak
 * observers.
 */
function getObserver(once: boolean): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          el.setAttribute('data-animate', '');

          // `data-multi-anim` opts out of `once` for this element.
          const allowRepeat = el.hasAttribute('data-multi-anim');
          if (once && !allowRepeat) observer!.unobserve(el);
        } else {
          el.removeAttribute('data-animate');
        }
      }
    },
    { threshold: 0.15 }
  );

  return observer;
}

/**
 * Start observing every current `[data-reveal]` element.
 *
 * Safe to call multiple times (e.g. on every `astro:page-load`): the
 * underlying observer is created only once and reused. Newly added
 * elements are picked up on subsequent calls.
 */
export function initReveal(options: RevealOptions = {}): void {
  const { once = false } = options;
  const obs = getObserver(once);

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  targets.forEach((el) => obs.observe(el));
}