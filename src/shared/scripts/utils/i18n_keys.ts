// src/shared/scripts/utils/i18n-keys.ts

/**
 * Centralized i18n keys.
 *
 * Use these constants instead of hardcoding strings in components:
 *
 *   <span data-i18n={I18N.nav.home}>Home</span>
 *   <button data-i18n={I18N.nav.mobile.themeLabel}>Select Theme:</button>
 *
 * The value must match a key in `lang/en.json` and `lang/es.json`.
 *
 * @example
 *   import { I18N } from '@shared/scripts/utils/i18n_keys';
 *
 *   <a data-i18n={I18N.nav.about} href="/about">About</a>
 */
export const I18N = {
  nav: {
    home: 'nav.home',
    about: 'nav.about',
    skills: 'nav.skills',
    projects: 'nav.projects',
    contact: 'nav.contact',

    languageEN: 'nav.languageEN',
    languageES: 'nav.languageES',

    mobile: {
      themeLabel: 'nav.mobile.themeLabel',
      langLabel: 'nav.mobile.langLabel',
      langES: 'nav.mobile.langES',
      langEN: 'nav.mobile.langEN',
    },
  },

  links: {
    github: 'links.github',
    linkedin: 'links.linkedin',
    email: 'links.email',
    cv: {
        href: 'links.cv.href',    
        altText: 'links.cv.altText',
    },
  },

  footer: {
    downloadLabel: 'footer.downloadLabel',
    resume: 'footer.resume',
    build: 'footer.build',
  }

} as const;