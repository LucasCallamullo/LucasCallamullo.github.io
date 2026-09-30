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
  },

  home: {
    title: 'home.title',    // My Name
    subtitle: 'home.subtitle',
    spanOne: 'home.spanOne',
    spanTwo: 'home.spanTwo',
    btn: {
      projects: 'home.btn.projects',
      contact: 'home.btn.contact',
      downloadCv: 'home.btn.downloadCv',
    },
    about: {
      about_txt: 'home.about.about_txt',
      about_p1_1: 'home.about.about_p1_1',
      about_p1_2: 'home.about.about_p1_2',
      about_p1_3: 'home.about.about_p1_3',
      about_p2_1: 'home.about.about_p2_1',
      about_p2_2: 'home.about.about_p2_2',
      about_p2_3: 'home.about.about_p2_3',
      about_p3_1: 'home.about.about_p3_1',
    },
    skills: {
      title: 'home.skills.title',
      subtitle: 'home.skills.subtitle',
      btn: 'home.skills.btn',
    },
  },

} as const;