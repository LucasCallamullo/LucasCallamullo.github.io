// src/shared/scripts/utils/translations.ts

/**
 * i18n module.
 *
 * - Loads translation JSON files from `/lang/<code>.json`.
 * - Applies translations to elements with `data-i18n="some.key"`.
 * - Supports both flat keys (`"nav.home"`) and nested keys
 *   (`"projects.label.span1"` → `{ projects: { label: { span1: "..." } } }`).
 * - Persists the current language in localStorage.
 * - Dispatches `translationsLoaded` when done, so other modules can react.
 */

type LangCode = 'en' | 'es';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

const STORAGE_KEY = 'language';
const STORAGE_KEY_FLAG = 'language_flag';
const DEFAULT_LANG: LangCode = 'en';
const VALID_LANGS: readonly LangCode[] = ['en', 'es'];

/**
 * The shape of the translations JSON. It's a tree of nested objects
 * whose leaves are strings.
 *
 * Example:
 *   {
 *     nav: { home: "Home", about: "About" },
 *     projects: { label: { span1: "A", span2: "B" } }
 *   }
 */
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = Record<string, TranslationValue>;

let currentLang: LangCode = DEFAULT_LANG;
let translations: Translations = {};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function isLangCode(value: string | null): value is LangCode {
  return value !== null && (VALID_LANGS as readonly string[]).includes(value);
}

/**
 * Read the initial language from localStorage, falling back to the default.
 */
function getInitialLanguage(): LangCode {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isLangCode(stored) ? stored : DEFAULT_LANG;
}

/**
 * Resolve a dot-separated key against the translations tree.
 *
 * Supports two shapes:
 *   - Flat:   the JSON literally has a key `"nav.home"`.
 *   - Nested: the JSON has `{ nav: { home: "..." } }`.
 *
 * Tries flat first, then nested. Returns undefined if not found.
 */
function resolveKey(key: string): string | undefined {
  // Try 1: flat lookup.
  const flat = translations[key];
  if (typeof flat === 'string') return flat;

  // Try 2: nested lookup.
  const nested = key.split('.').reduce<TranslationValue | undefined>(
    (acc, part) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return acc[part];
      }
      return undefined;
    },
    translations
  );

  return typeof nested === 'string' ? nested : undefined;
}

// -----------------------------------------------------------------------------
// Core: load + apply
// -----------------------------------------------------------------------------

/**
 * Fetch the JSON file for `lang`, store it, and re-apply all translations.
 *
 * Dispatches `languagechange` on `document` with the new code.
 */
export async function loadLanguage(lang: LangCode): Promise<void> {
  try {
    const response = await fetch(`/lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: failed to load ${lang}.json`);
    }

    translations = (await response.json()) as Translations;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    applyTranslations();

    // Single event: the language changed and the translations were applied.
    document.dispatchEvent(
      new CustomEvent('languagechange', { detail: { lang } })
    );
  } catch (err) {
    console.error('[i18n] failed to load language:', err);
  }
}

/**
 * Sync the language trigger with the values stored in localStorage.
 *
 * Updates:
 *  - `#currentLangLabel` text → uppercase language code (e.g. "EN", "ES").
 *  - `#currentFlagLabel` src  → path to the flag icon.
 *
 * Values are read from localStorage so the trigger reflects the persisted
 * state without needing callers to pass `lang` / `flag` as parameters.
 */
function syncLabelTranslations(): void {
  const label = document.querySelector<HTMLElement>('#currentLangLabel');
  if (label) {
    label.textContent = localStorage.getItem(STORAGE_KEY)?.toLocaleUpperCase() || "EN";
  }

  const flagImg = document.querySelector<HTMLImageElement>('#currentFlagLabel');
  if (flagImg) {
    flagImg.src = localStorage.getItem(STORAGE_KEY_FLAG) || "/icons/flag_us.svg";
  }
}

/**
 * Apply the current translations to every `[data-i18n]` element in the DOM.
 *
 * - Elements with a `value` attribute (inputs) get their value set.
 * - Elements with a `href` attribute (links) get their href set.
 * - Everything else gets its `textContent` set.
 *
 * @param callbacks Optional map of functions to run after applying translations.
 *                  Useful for re-rendering dynamic sections.
 */
export function applyTranslations(
  callbacks: Record<string, () => void> = {}
): void {

  syncLabelTranslations();

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const value = resolveKey(key);
    if (value === undefined) return;

    el.setAttribute('data-original-text', value);

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
    } else if (el instanceof HTMLImageElement) {
      el.src = value;

    } else if (el instanceof HTMLAnchorElement && el.hasAttribute('href')) {
      
      // ! This is only for cv download href
      if (el.getAttribute('data-cv') === 'true') {
        el.href = value;
        el.download = resolveKey(el.getAttribute('data-altText') || '') || '';
      } else {
        el.textContent = value;
      }

    } else {
      el.textContent = value;
    }
  });

  // Run callbacks (re-render dynamic sections, etc.)
  for (const fn of Object.values(callbacks)) {
    if (typeof fn === 'function') fn();
  }
}

/**
 * Change language programmatically.
 * Persists to localStorage and re-applies translations.
 */
export async function setLanguage(lang: LangCode): Promise<void> {
  if (lang === currentLang) return;
  await loadLanguage(lang);
}

// -----------------------------------------------------------------------------
// Wiring for language option buttons
// -----------------------------------------------------------------------------

interface LanguageOptionsConfig {
  onSelect?: (lang: LangCode) => void;
}

/**
 * Wire the language option buttons inside the given menu using event delegation.
 * Expects each option to have a `data-lang="en" | "es"` attribute.
 */
export function initLanguageOptions(
  menu: HTMLElement | null,
  config: LanguageOptionsConfig = {}
): void {
  if (!menu) return;

  menu.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLElement>('[data-lang]');
    if (!btn) return;

    const value = btn.getAttribute('data-lang');
    const flagImg = btn.getAttribute('data-flag');
    if (!isLangCode(value) || !flagImg) return;

    localStorage.setItem(STORAGE_KEY_FLAG, flagImg);

    void setLanguage(value);
    config.onSelect?.(value);
  });
}

// -----------------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------------

/**
 * Bootstrap the i18n module.
 * Reads the stored language and loads it.
 *
 * Call this once per page load (and after each Astro view transition if needed).
 */
export async function initTranslations(): Promise<void> {
  currentLang = getInitialLanguage();
  await loadLanguage(currentLang);
}