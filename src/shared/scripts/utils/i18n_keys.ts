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
    utn: 'links.utn',
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
    contact: {
      title: 'home.contact.title',
      span1: 'home.contact.span1',
      span2: 'home.contact.span2',
    },
  },

  about: {
    title: 'about.title',
    subtitle: 'about.subtitle',
    bio: {
      p1: 'about.bio.p1',
      p2: 'about.bio.p2',
      p3: 'about.bio.p3',
      p4: 'about.bio.p4',
      p5: 'about.bio.p5',
      p6: 'about.bio.p6',
    },
    stats: {
      title: 'about.stats.title',
      projectLabel: 'about.stats.projectLabel',
      projectTotal: 'about.stats.projectTotal',
      currentLabel: 'about.stats.currentLabel',
      currentTotal: 'about.stats.currentTotal',
      universityLabel: 'about.stats.universityLabel',
      residenceLabel: 'about.stats.residenceLabel',
    },
    milestone: {
      title: 'about.milestone.title',
      subtitle: 'about.milestone.subtitle',
      stepSpan: 'about.milestone.stepSpan',
    }
  },

  // ! PROJECTS KEYS TO ADD MORE 
  projects: {
    links: {
      youtube: {
        label: 'projects.links.youtube.label',
        altText: 'projects.links.youtube.altText',
      },
      github: {
        label: 'projects.links.github.label',
        altText: 'projects.links.github.altText',
      },
      university: {
        label: 'projects.links.university.label',
        altText: 'projects.links.university.altText',
      },
    },

    fleet_optimizer: {
      title: 'projects.fleet_optimizer.title',
      milestone: 'projects.fleet_optimizer.milestone',
      timeline: {
        summary: 'projects.fleet_optimizer.timeline.summary',
      },
      project: {
        summary: 'projects.fleet_optimizer.project.summary',
        description: 'projects.fleet_optimizer.project.description',
      },
    },

    university: {
      title: 'projects.university.title',
      milestone: 'projects.university.milestone',
      timeline: {
        summary: 'projects.university.timeline.summary',
      },
    },

    ecommerce_dj: {
      title: 'projects.ecommerce_dj.title',
      milestone: 'projects.ecommerce_dj.milestone',
      timeline: {
        summary: 'projects.ecommerce_dj.timeline.summary',
      },
      project: {
        summary: 'projects.ecommerce_dj.project.summary',
        description: 'projects.ecommerce_dj.project.description',
      },
    },

    portfolio: {
      title: 'projects.portfolio.title',
      milestone: 'projects.portfolio.milestone',
      timeline: {
        summary: 'projects.portfolio.timeline.summary',
      },
      project: {
        summary: 'projects.portfolio.project.summary',
        description: 'projects.portfolio.project.description',
      },
    },

    dds_tutor: {
      title: 'projects.dds_tutor.title',
      milestone: 'projects.dds_tutor.milestone',
      timeline: {
        summary: 'projects.dds_tutor.timeline.summary',
      },
      project: {
        summary: 'projects.dds_tutor.project.summary',
        description: 'projects.dds_tutor.project.description',
      },
    },

    backend_tp: {
      title: 'projects.backend_tp.title',
      milestone: 'projects.backend_tp.milestone',
      timeline: {
        summary: 'projects.backend_tp.timeline.summary',
      },
      project: {
        summary: 'projects.backend_tp.project.summary',
        description: 'projects.backend_tp.project.description',
      },
    },

    py_tutor: {
      title: 'projects.py_tutor.title',
      milestone: 'projects.py_tutor.milestone',
      timeline: {
        summary: 'projects.py_tutor.timeline.summary',
      },
      project: {
        summary: 'projects.py_tutor.project.summary',
        description: 'projects.py_tutor.project.description',
      },
    },

    no_country: {
      title: 'projects.no_country.title',
      milestone: 'projects.no_country.milestone',
      timeline: {
        summary: 'projects.no_country.timeline.summary',
      },
      project: {
        summary: 'projects.no_country.project.summary',
        description: 'projects.no_country.project.description',
      },
    },

    pawn_cs: {
      title: 'projects.pawn_cs.title',
      milestone: 'projects.pawn_cs.milestone',
      timeline: {
        summary: 'projects.pawn_cs.timeline.summary',
      },
      project: {
        summary: 'projects.pawn_cs.project.summary',
        description: 'projects.pawn_cs.project.description',
      },
    },
  },


} as const;