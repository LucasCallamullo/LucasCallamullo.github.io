// src/shared/scripts/utils/dropdown.ts

/**
 * Generic dropdown controller.
 *
 * Handles:
 *  - open/close state via `container.dataset.open`
 *  - hover (desktop) and click (touch) triggers
 *  - "only one dropdown open at a time" rule
 *  - close on outside click
 *  - close on ESC
 *  - optional callbacks on open/close
 *
 * Does NOT know what's inside the dropdown.
 *
 * Public API:
 *  - registerDropdown(options): DropdownController
 *  - resetDropdowns(): void   ← call on Astro view transitions
 */

export interface DropdownOptions {
  /** Container element that wraps trigger + menu. */
  container: HTMLElement;
  /** Trigger button element. */
  trigger: HTMLElement;

  /** Menu element that opens/closes. 
  menu: HTMLElement;  */

  /** Open on hover (desktop). Default: true. */
  openOnHover?: boolean;

  /** Close on leave (desktop). Default: true. */
  closeOffHover?: boolean;

  /** Called when the menu opens. */
  onOpen?: () => void;
  /** Called when the menu closes. */
  onClose?: () => void;
}

// -----------------------------------------------------------------------------
// Global state
// -----------------------------------------------------------------------------

/** Currently open dropdowns (0 or 1 in practice, but a Set is future-proof). */
const openDropdowns = new Set<DropdownController>();

/** Every registered dropdown. Used to ignore clicks inside any of them. */
const allDropdowns = new Set<DropdownController>();

/** Guard so global listeners are attached only once. */
let globalListenersAttached = false;

/**
 * Attach document-level listeners a single time.
 * Idempotent — safe to call from every controller constructor.
 */
function attachGlobalListeners(): void {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  // Close open dropdowns when clicking outside of every registered container.
  document.addEventListener('click', (e) => {
    const target = e.target as Node | null;
    if (!target) return;

    openDropdowns.forEach((d) => {
      if (!d.isTargetInside(target)) d.close();
    });
  });

  // Close all open dropdowns on ESC.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    openDropdowns.forEach((d) => d.close());
  });
}

// -----------------------------------------------------------------------------
// Controller
// -----------------------------------------------------------------------------

export class DropdownController {
  private container: HTMLElement;
  private trigger: HTMLElement;
  // private menu: HTMLElement;
  private openOnHover: boolean;
  private closeOffHover: boolean;

  // callbacks
  private onOpen?: () => void;
  private onClose?: () => void;

  private isOpen = false;

  constructor(options: DropdownOptions) {
    this.container = options.container;
    this.trigger = options.trigger;
    // this.menu = options.menu;
    this.openOnHover = options.openOnHover ?? true;
    this.closeOffHover = options.closeOffHover ?? true;
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;

    allDropdowns.add(this);
    attachGlobalListeners();
    this.attachLocalListeners();

    // Sync initial ARIA state (in case HTML forgot it).
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  // --- public API ------------------------------------------------------------

  public open(): void {
    if (this.isOpen) return;

    // Enforce the global rule: only one dropdown open at a time.
    openDropdowns.forEach((d) => {
      if (d !== this) d.close();
    });

    this.isOpen = true;
    this.container.dataset.open = 'true';
    this.trigger.setAttribute('aria-expanded', 'true');
    openDropdowns.add(this);
    this.onOpen?.();
  }

  public close(): void {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.container.dataset.open = 'false';
    this.trigger.setAttribute('aria-expanded', 'false');
    openDropdowns.delete(this);
    this.onClose?.();
  }

  /**
   * Returns true if the given node is inside this dropdown's container.
   * Used by the global click handler to decide whether to close.
   */
  public isTargetInside(node: Node): boolean {
    return this.container.contains(node);
  }

  /**
   * Detach local listeners and remove from global registries.
   * Call this if you destroy a dropdown manually (e.g. view transition).
   */
  public destroy(): void {
    this.close();
    allDropdowns.delete(this);
    // Note: local listeners attached to this.container/trigger go away
    // with the DOM nodes themselves when the page swaps.
  }

  public matchesContainer(el: HTMLElement): boolean {
    return this.container === el;
  }

  // --- internals -------------------------------------------------------------

  private attachLocalListeners(): void {
    if (this.openOnHover) {
      this.container.addEventListener('mouseenter', () => this.open());
    }

    if (this.closeOffHover) {
      this.container.addEventListener('mouseleave', () => this.close());
    }

    this.trigger.addEventListener('click', (e) => {
      // Stop the click from reaching the document listener,
      // otherwise it would immediately close what we just opened.
      e.stopPropagation();
      this.isOpen ? this.close() : this.open();
    });
  }
}

// -----------------------------------------------------------------------------
// Factory
// -----------------------------------------------------------------------------

export function registerDropdown(options: DropdownOptions): DropdownController {
  // Avoid duplicate registration for the same container.
  for (const d of allDropdowns) {
    if (d.matchesContainer(options.container)) {
      d.destroy();
      break;
    }
  }
  return new DropdownController(options);
}

/**
 * Tear down every registered dropdown.
 * Call this on Astro view transitions (astro:page-load) before re-initializing,
 * otherwise stale controllers accumulate across navigations.
 */
export function resetDropdowns(): void {
  allDropdowns.forEach((d) => d.destroy());
  allDropdowns.clear();
  openDropdowns.clear();
}