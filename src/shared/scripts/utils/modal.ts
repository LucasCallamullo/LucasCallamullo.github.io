


export interface ModalElements {
  /** Main modal container element. */
  modal: HTMLElement;
  /** Optional overlay backdrop element. */
  overlay?: HTMLElement;
  /** Custom selector for close buttons inside the modal. Defaults to '.modal__btn_close'. */
  closeButtonSelector?: string;
  /** Custom selector for the inner content container. Defaults to '.modal__content'. */
  contentSelector?: string;

  
}

export interface ModalCallbacks {
  /** Fired immediately after the modal opens. */
  onOpen?: () => void;
  /** Fired immediately after the modal closes. */
  onClose?: () => void;
}

// -----------------------------------------------------------------------------
// Global state & History Management
// -----------------------------------------------------------------------------

/** Stack of currently open modals. Top item = active/focused modal. */
const openModals: ModalController[] = [];

const __logging = true;

/** Guard to ensure document/window listeners are registered only once. */
let globalListenersAttached = false;
// setTimeout(() => { isCloseByCode = false; }, 700);

// ! DO NOT TOUCH THESE FLAGS - CRITICAL FOR STACK HISTORY SYNCHRONIZATION
/** Guard flag to prevent duplicate or cascading modal closures across the execution stack. */
let isHandlingPopState = false;
// setTimeout(() => { isHandlingPopState = false; }, 100);

/** 
 * Flag indicating whether the closing sequence was programmatically initiated by user UI 
 * (click, ESC key) prior to invoking `history.back()`, avoiding redundant `popstate` execution.
 */
let isCloseByCode = false;
// setTimeout(() => { isCloseByCode = false; }, 100);

/**
 * Attaches application-wide event listeners for keyboard navigation and browser history.
 */
function attachGlobalListeners(): void {
  if (__logging) console.log('[global] attach called. already attached:', globalListenersAttached);

  if (globalListenersAttached) return;

  if (__logging) console.log('[global] attach called again:', globalListenersAttached);

  globalListenersAttached = true;

  // ESC key closes only the topmost modal.
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;

    if (openModals.length > 0) {
      const topModal = openModals.at(-1);
      if (topModal) {
        // Enable execution guard before dispatching top-level dismissal
        isHandlingPopState = true;
        topModal.stupidCloseHandler();
      }
    }
  });

  /**
   * Handles mobile back gesture or browser back button navigation.
   * 
   * When closing is initiated programmatically (via UI click/ESC), `isCloseByCode` is set 
   * to `true` prior to calling `history.back()`. This prevents the resulting `popstate` event 
   * from re-triggering the closure logic on remaining queued modals. 
   * 
   * The flag is immediately reset to `false` at the end of the tick to ensure subsequent 
   * native browser navigation events function properly.
   */
  window.addEventListener('popstate', () => {
    if (__logging) console.log('[popstate] isCloseByCode:', isCloseByCode, 'stack:', openModals.length);

    
    if (!isCloseByCode && openModals.length > 0) {

      const topModal = openModals.at(-1);
      if (topModal) {
        const size = openModals.length;
        topModal.close(size, true);  // use directly the method to close
      }
    }
    
    // Always reset the programmatic navigation flag for future popstate triggers
    isCloseByCode = false;
  }); 

  /*   
  document.addEventListener('astro:before-preparation', (event) => {
    // Only intercept when the user navigated via back/forward
    if (event.navigationType !== 'traverse') return;


    // If there's an open modal, close it and cancel the navigation
    if (__logging) console.log('[before-preparation] isCloseByCode:', isCloseByCode, 'stack:', openModals.length);
    if (openModals.length > 0) {
      
      event.preventDefault(); // Cancels the browser back navigation

    }

    // Always reset the programmatic navigation flag for future popstate triggers
    // isCloseByCode = false;
  }); */
  
}

// -----------------------------------------------------------------------------
// Controller
// -----------------------------------------------------------------------------

export class ModalController {
  public static readonly DEFAULT_CLOSE_SELECTOR = '.modal__btn_close';
  public static readonly DEFAULT_CONTENT_SELECTOR = '.modal__content';

  private modal: HTMLElement;
  private overlay?: HTMLElement;
  private closeButtonSelector: string;
  private contentSelector: string;

  private _isOpen = false;
  private _setEventClick = false;
  private onOpen?: () => void;
  private onClose?: () => void;

  constructor(
    {
      modal,
      overlay,
      closeButtonSelector = ModalController.DEFAULT_CLOSE_SELECTOR,
      contentSelector = ModalController.DEFAULT_CONTENT_SELECTOR,
    }: ModalElements,
    callbacks: ModalCallbacks = {}
  ) {
    this.modal = modal;
    this.overlay = overlay;
    this.closeButtonSelector = closeButtonSelector;
    this.contentSelector = contentSelector;

    this._setEventClick = false;

    this.onOpen = callbacks.onOpen;
    this.onClose = callbacks.onClose;

    attachGlobalListeners();
    this.attachLocalListeners();
  }

  /** Gets the current visibility state of the modal. */
  public get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Opens the modal, updates z-index hierarchy, disables body scroll,
   * and pushes a new dummy entry to browser history.
   */
  public open(): void {
    if (__logging) console.log('[open] called. isOpen:', this._isOpen, 'stack:', openModals.length);
    if (this._isOpen) return;

    this._isOpen = true;
    this.modal.classList.add('is__open');
    this.overlay?.classList.add('is__open');
    openModals.push(this);

    // Calculate dynamic stack depth for proper layering
    const depth = openModals.length;
    this.modal.style.zIndex = String(50 + depth * 20);
    if (this.overlay) {
      this.overlay.style.zIndex = String(40 + depth * 20);
    }

    // Lock body scroll on first opened modal
    if (depth === 1) {
      document.body.style.overflow = 'hidden';
    }

    // ALWAYS push a history entry for EVERY modal opened
    history.pushState({ modalOpen: true, depth }, '', window.location.pathname);

    if (__logging) console.log('[open] called. Phase 2:', this._isOpen, 'stack Modals:', depth);

    this.onOpen?.();
  }

  /**
   * Closes the modal, adjusts remaining stack hierarchy, restores body scroll,
   * and synchronizes browser history based on the closure origin.
   * 
   * @param size - The total number of open modals captured immediately before this modal's removal.
   * @param isFromPopState - Flag indicating whether the call was triggered by a native browser `popstate` event.
   */
  public close(size: number, isFromPopState: boolean): void {
    if (__logging) console.log('[close] called. isOpen:', this._isOpen, 'size:', size, 'fromPopState:', isFromPopState);
    if (!this._isOpen) return;

    this._isOpen = false;
    this.modal.classList.remove('is__open');
    this.overlay?.classList.remove('is__open');

    // Remove this instance from the global openModals stack
    const index = openModals.indexOf(this);
    if (index !== -1) {
      openModals.splice(index, 1);
    }

    /*
     * Synchronize browser history:
     * If the stack size decreased by exactly 1 and the closure was NOT initiated by a native 
     * `popstate` event, we trigger `history.back()`.
     * 
     * `isCloseByCode` is set to `true` prior to calling `history.back()` to prevent the 
     * resulting `popstate` event from executing duplicate closure logic on remaining modals.
     */
    if (openModals.length == size - 1 && !isFromPopState) {
      isCloseByCode = true;
      if (__logging) console.log('[close] called historyBack', 'size modal list:', size);
      history.back();
    }

    // Restore body scroll when all modals are fully closed
    if (openModals.length === 0) {
      document.body.style.overflow = '';
    }

    this.onClose?.();
  }

  /**
   * Handles top-level modal dismissal triggered by history navigation (`popstate`).
   * 
   * The `isHandlingPopState` flag acts as a single-use execution guard to prevent 
   * duplicate or cascading closure events across multiple registered modals. Since 
   * event propagation stopping isn't sufficient for history state changes, this method 
   * evaluates the modal stack size prior to removal.
   * 
   * Execution Flow:
   * 1. Evaluates `isHandlingPopState`. If false, execution terminates to prevent unintended closures.
   * 2. Captures the active topmost modal (`topModal`) and the current stack length (`size`).
   * 3. Delegates the closure logic to `topModal.close()`, passing the remaining stack count and origin flag.
   * 4. Immediately resets `isHandlingPopState` back to `false` to block subsequent queued calls.
   * 
   * @param isFromPopState - Indicates whether the close action originated directly from a browser popstate event.
   */
  public stupidCloseHandler(isFromPopState = false): void {
    if (__logging) console.log('[stupidClose] isHandlingPopState:', isHandlingPopState, 'isCloseByCode:', isCloseByCode);
    if (!isHandlingPopState) return;

    const topModal = openModals.at(-1);
    const size = openModals.length;

    if (topModal) {
      topModal.close(size, isFromPopState);
    }

    isHandlingPopState = false;
  }

  public closeHandlerCallback(): void {
    // Explicitly set the guard flag to true before triggering the handler
    isHandlingPopState = true;
    this.stupidCloseHandler();
  }

  // --- Internal Event Handlers -----------------------------------------------

  /**
   * Binds local click listeners to handle user interactions within the modal.
   * 
   * When a close trigger (close button or backdrop overlay) is clicked, the 
   * `isHandlingPopState` flag is explicitly set to `true` prior to calling 
   * `stupidCloseHandler()`. This activates the execution guard required to 
   * safely resolve the top-level modal dismissal without triggering duplicate 
   * or unintended closing events across the stack.
   */
  private attachLocalListeners(): void {

    if (this._setEventClick) return;
    this._setEventClick = true;

    this.modal.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Handle close button triggers
      if (target.closest(this.closeButtonSelector)) {
        // Explicitly set the guard flag to true before triggering the handler
        isHandlingPopState = true;
        this.stupidCloseHandler();
        return;
      }

      // Handle outer backdrop clicks
      if (e.target === this.modal) {
        // Explicitly set the guard flag to true before triggering the handler
        isHandlingPopState = true;
        this.stupidCloseHandler();
        return;
      }

      e.stopPropagation();
    });

    this.overlay?.addEventListener('click', (e: MouseEvent) => {
      // Handle outer backdrop clicks
      if (e.target === this.overlay) {
        // Explicitly set the guard flag to true before triggering the handler
        isHandlingPopState = true;
        this.stupidCloseHandler();
        return;
      }

      e.stopPropagation();
    });
  }
}



export interface ModalBinding {
  /** ID of the modal root element. */
  modalSelector: string;
  /** ID of the overlay element (optional). */
  overlaySelector?: string;
  /** ID of the button that opens the modal (optional). */
  openBtnSelector?: string;
  /** Optional callbacks. */
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Create a ModalController from DOM ids and optionally wire an open button.
 * Returns null if the modal element is not found.
 */
export function bindModal(binding: ModalBinding): ModalController | null {
  const modal = document.querySelector<HTMLElement>(binding.modalSelector);
  if (!modal) return null;

  const overlay = binding.overlaySelector
    ? document.querySelector<HTMLElement>(binding.overlaySelector) ?? undefined
    : undefined;

  const controller = new ModalController(
    { modal, overlay },
    { onOpen: binding.onOpen, onClose: binding.onClose }
  );

  if (binding.openBtnSelector) {
    const btn = document.querySelector<HTMLElement>(binding.openBtnSelector);
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      controller.open();
    });
  }

  return controller;
}


export function resetModals(): void {
  openModals.length = 0;
  document.body.style.overflow = '';
}