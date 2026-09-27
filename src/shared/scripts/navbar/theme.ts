// src/shared/scripts/navbar/theme.ts

type ThemeId = 'light' | 'dark' | 'violet' | 'blue';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: ThemeId = 'light';

const VALID_THEMES: readonly ThemeId[] = ['light', 'dark', 'violet', 'blue'];

function isThemeId(value: string | null): value is ThemeId {
  return value !== null && (VALID_THEMES as readonly string[]).includes(value);
}

// -----------------------------------------------------------------------------
// Public API — state
// -----------------------------------------------------------------------------

/** Apply a theme to <html> and persist it. */
export function setTheme(theme: ThemeId): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  syncThemeLabel(theme);
}

/** Read the initial theme: localStorage → DOM → default. */
export function getInitialTheme(): ThemeId {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isThemeId(stored)) return stored;

  const dom = document.documentElement.getAttribute('data-theme');
  if (isThemeId(dom)) return dom;

  return DEFAULT_THEME;
}

// -----------------------------------------------------------------------------
// Internals
// -----------------------------------------------------------------------------

/** Update the visible label on the trigger button. */
function syncThemeLabel(theme: ThemeId): void {
  const label = document.getElementById('currentThemeLabel');
  if (label) label.textContent = theme;
}

// -----------------------------------------------------------------------------
// Wiring — delegated events
// -----------------------------------------------------------------------------

interface ThemeOptionsConfig {
  /**
   * Called after a theme is applied via a click on an option.
   * Useful to close the dropdown from the caller without coupling this
   * module to the dropdown controller.
   */
  onSelect?: (theme: ThemeId) => void;
}

/**
 * Wire the theme options inside the given menu using event delegation.
 *
 * A single listener on the menu handles every `[data-theme-select]` button,
 * so newly added options work automatically and removed ones don't leave
 * orphan listeners behind.
 *
 * Does NOT handle opening/closing the dropdown — that's the dropdown util.
 *
 * @param menu - The dropdown menu element that wraps the option buttons.
 * @param config - Optional callbacks.
 */
export function initThemeOptions(
  menu: HTMLElement | null,
  config: ThemeOptionsConfig = {}
): void {
  // Apply the initial theme on load, whether or not the menu exists.
  setTheme(getInitialTheme());

  if (!menu) return;

  // Delegated click — one listener for all option buttons.
  menu.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLElement>('[data-theme-select]');
    if (!btn) return;

    const value = btn.getAttribute('data-theme-select');
    if (!isThemeId(value)) return;

    setTheme(value);
    config.onSelect?.(value);
  });
}