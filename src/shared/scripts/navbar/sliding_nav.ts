// src/shared/scripts/navbar/sliding_nav.ts

interface SlidingNavOptions {
  navSelector?: string;
  barSelector?: string;
  buttonSelector?: string;
  extraWidth?: number;
}

class SlidingNavigation {
  private static instance: SlidingNavigation | null = null;

  private container: HTMLElement | null = null;
  private bar: HTMLElement | null = null;
  private buttonSelector: string = '.nav__btn_nav';
  private extraWidth: number = 12;

  private buttons: HTMLElement[] = [];
  private currentActive: HTMLElement | null = null;

  private constructor() {}

  public static getInstance(): SlidingNavigation {
    if (!SlidingNavigation.instance) {
      SlidingNavigation.instance = new SlidingNavigation();
    }
    return SlidingNavigation.instance;
  }

/**
   * Binds the navigation instance to the current DOM subtree.
   * 
   * Intended for invocation on `astro:page-load` during SPA lifecycle transitions.
   * Re-evaluates container and bar references, refreshes cached button nodes, 
   * attaches event delegation, and synchronizes active button state with the current URL.
   * 
   * Note: Immediate `refreshBarPosition()` execution is intentionally omitted here 
   * to avoid dual-trigger layout updates that interfere with smooth CSS transition sequences.
   * Positioning is deferred until web fonts are fully resolved.
   * 
   * @param options - Configuration overrides for container, bar, and button selectors.
   */
  public mount(options: SlidingNavOptions = {}): void {
    const {
      navSelector = '#navContainer',
      barSelector = '.nav__sliding_bar',
      buttonSelector = '.nav__btn_nav',
      extraWidth = 12,
    } = options;

    const container = document.querySelector<HTMLElement>(navSelector);
    const bar = document.querySelector<HTMLElement>(barSelector);

    if (!container || !bar) {
      console.error('[sliding-nav] container or bar not found');
      return;
    }

    this.container = container;
    this.bar = bar;
    this.buttonSelector = buttonSelector;
    this.extraWidth = extraWidth;

    this.updateButtons();
    if (this.buttons.length === 0) return;

    this.setupEvents();
    this.setActiveFromLocation();

    // this.refreshBarPosition();
    // Defer positioning until fonts are fully loaded to ensure layout metrics are final 
    // without triggering duplicate animation passes on initial mount.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.refreshBarPosition());
    }
  }

  /**
   * Extracts the primary route segment from a URL pathname.
   * "/"             => "home"
   * "/projects"     => "projects"
   * "/projects/123" => "projects"
   */
  public extractRouteName(pathname: string = window.location.pathname): string {
    const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
    if (cleanPath === '' || cleanPath === '/') return 'home';
    const segments = cleanPath.split('/').filter(Boolean);
    return segments[0] || 'home';
  }

  /**
   * Binds user interaction event listeners to the navigation container.
   * Leverages event delegation to intercept clicks on navigation buttons 
   * and update the active button state.
   */
  private setupEvents(): void {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest<HTMLElement>(this.buttonSelector);
      if (!button) return;

      this.setActiveButton(button);
    });

    // ! THIS IS FROM ./utils/translations.ts
    document.addEventListener('languagechange', (e) => {
      document.fonts.ready.then(() => this.refreshBarPosition());
    });
  }

  /**
   * Selects the navigation button corresponding to the active route segment.
   * Evaluates the current pathname against the `data-nav` attribute of each button.
   * Falls back to the first available button if no matching route is found.
   */
  private setActiveFromLocation(): void {
    if (this.buttons.length === 0) return;

    const route = this.extractRouteName();
    const match = this.buttons.find(
      (btn) => btn.getAttribute('data-nav') === route
    );

    const target = match ?? this.buttons[0];
    this.setActiveButton(target);
  }

  /**
   * Updates the visual active state across the navigation button collection.
   * Removes the `.active` class from all items, applies it to the target element,
   * and updates the internal reference pointer.
   * 
   * @param button - The navigation button element to set as active.
   */
  private setActiveButton(button: HTMLElement): void {
    this.buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    this.currentActive = button;
  }
  
  /**
   * Queries and caches the current set of navigation buttons from the DOM container.
   * Synchronizes the internal `buttons` array snapshot using the configured selector.
   */
  private updateButtons(): void {
    if (!this.container) return;
    this.buttons = Array.from(
      this.container.querySelectorAll(this.buttonSelector)
    );
  }

  /**
   * Caches the previous left coordinate across recalculations 
   * to determine movement direction vector.
   */
  private static lastLeft: number = 0;

  /**
   * Recalculates and shifts the sliding underline bar beneath the active navigation button.
   * 
   * Direction-Aware Origin Pivot Rationale:
   * Standard CSS transforms with a fixed `left: 0` anchor create visual asymmetry when 
   * traveling backward (right-to-left) because width contractions collapse toward the 
   * left edge. To achieve a perfectly fluid and symmetric stretch/travel effect in 
   * both horizontal directions:
   * 
   * 1. Moving Right (`left >= lastLeft`):
   *    - Pins the zero-reference to `left: 0` (`right: auto`).
   *    - Shifts the bar forward using a positive `translateX(left)` value.
   * 
   * 2. Moving Left (`left < lastLeft`):
   *    - Flips the zero-reference anchor to `right: 0` (`left: auto`).
   *    - Computes the offset relative to the container's right bounding edge.
   *    - Shifts backward using a negative `translateX(-right)` value, ensuring the 
   *      trailing edge anchors properly while expanding/contracting toward the target.
   */
  public refreshBarPosition(): void {
    /** Instantly set the bar under the button (no animation). */
    if (!this.bar || !this.container || !this.currentActive) return;

    const buttonRect = this.currentActive.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    // Compute container-relative horizontal coordinates and expanded width
    const left = buttonRect.left - containerRect.left - this.extraWidth;
    const width = buttonRect.width + this.extraWidth * 2;

    // Evaluate trajectory direction against previous position snapshot
    const isGoingLeft = left < SlidingNavigation.lastLeft;
    SlidingNavigation.lastLeft = left;

    if (isGoingLeft) {
      // LEFTWARD TRAVEL:
      // Anchor origin to the container's right edge
      const right = containerRect.right - buttonRect.right - this.extraWidth;

      this.bar.style.left = 'auto';
      this.bar.style.right = '0';
      
      // Transform backward from the right baseline
      this.bar.style.transform = `translateX(-${right}px)`;
      this.bar.style.width = `${width}px`;
    } else {
      // RIGHTWARD TRAVEL (Standard):
      // Anchor origin to the container's left edge
      this.bar.style.right = 'auto';
      this.bar.style.left = '0';

      this.bar.style.transform = `translateX(${left}px)`;
      this.bar.style.width = `${width}px`;
    }
  }
}

export default SlidingNavigation;