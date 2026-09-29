// src/shared/scripts/navigation.ts

import { registerDropdown } from '@/shared/scripts/utils/dropdownNav';
import { bindModal } from '@shared/scripts/utils/modal';
import { initThemeOptions, syncThemeBeforeSwap } from './theme';
import SlidingNavigation from '@shared/scripts/navbar/sliding_nav';

import { initLanguageOptions } from './translations';


export function initNavigation(): void {

  // Every SPA navigation
  document.addEventListener('astro:page-load', () => {

    // ======================================================
    // +  DESKTOP
    // ======================================================

    // --- Register THEME dropdown desktop ---
    const themeContainer = document.getElementById('themeDropdownContainer');
    const themeTrigger = document.getElementById('themeDropdownBtn');
    
    if (themeContainer && themeTrigger) {
      registerDropdown({
        container: themeContainer,
        trigger: themeTrigger,
        openOnHover: false,
      });
    }

    // --- Wire option clicks (state only) ---
    const themeMenu = themeContainer?.querySelector<HTMLElement>('#themeMenu');
    if (themeMenu) {
      initThemeOptions(themeMenu);
    }

    // --- Register LANGUAGE dropdown desktop ---
    const langContainer = document.getElementById('langDropdownContainer');
    const langTrigger = document.getElementById('langDropdownBtn');

    if (langContainer && langTrigger) {
      registerDropdown({
        container: langContainer,
        trigger: langTrigger,
        openOnHover: false,
      });
    }

    const langMenu = langContainer?.querySelector<HTMLElement>('#langMenu');
    if (langMenu) {
      initLanguageOptions(langMenu);
    }

    // set effects slide navbar effect
    SlidingNavigation.getInstance().mount()
    
    // ======================================================
    // +  MOBILE
    // ======================================================
    
    // --- Mobile drawer ---
    const modalMobile = bindModal({ 
      modalSelector: '#mobileMenu',  
      overlaySelector: '#mobileOverlay',  
      openBtnSelector: '#mobileMenuBtn' 
    });

    const mobThemeMenu = document.querySelector<HTMLElement>('#mobileMenu__theme_btns');
    if (mobThemeMenu) {
      initThemeOptions(mobThemeMenu, {
        onSelect: () => {
          if (!modalMobile) return;
          // Explicitly set the guard flag to true before triggering the handler
          modalMobile.closeHandlerCallback();
        },
      });
    }

    // language options on mobile menu
    const mobLangMenu = document?.querySelector<HTMLElement>('#mobileMenu__lang_btns');
    if (mobLangMenu) {
      initLanguageOptions(mobLangMenu);
    }
  });

  // Runs before Astro swaps the <body> — applies the theme to the incoming document.
  document.addEventListener('astro:before-swap', syncThemeBeforeSwap);
}