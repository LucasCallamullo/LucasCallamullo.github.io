// src/shared/scripts/navigation.ts

import { registerDropdown } from '@/shared/scripts/utils/dropdownNav';
import { initThemeOptions } from './theme';
import { initLanguageOptions } from './language';
import { initMobileNav } from './mobile-nav';

export function initNavigation(): void {
  // --- Mobile drawer ---
  initMobileNav();

  // --- Register the two dropdowns ---
  const themeContainer = document.getElementById('themeDropdownContainer');
  const themeTrigger = document.getElementById('themeDropdownBtn');
  

  const langContainer = document.getElementById('langDropdownContainer');
  const langTrigger = document.getElementById('langDropdownBtn');


  if (themeContainer && themeTrigger) {
    registerDropdown({
      container: themeContainer,
      trigger: themeTrigger,
    });
  }

  if (langContainer && langTrigger) {
    registerDropdown({
      container: langContainer,
      trigger: langTrigger,
    });
  }

  // --- Wire option clicks (state only) ---
  const themeMenu = themeContainer?.querySelector<HTMLElement>('#themeMenu');
  if (themeMenu) {
    initThemeOptions(themeMenu, {
      /* onSelect: () => {
        themeMenu?.closest<HTMLElement>('[data-open]')?.setAttribute('data-open', 'false');
      }, */
    });
  }


  const langMenu = document.getElementById('langMenu');
  // initLanguageOptions();
}