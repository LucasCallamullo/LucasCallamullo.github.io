// src/shared/data/projects.ts
import { I18N } from '@shared/scripts/utils/i18n_keys';
import type { TagKey } from '@shared/data/tags';
import type { TechKey } from '@shared/data/tech_stack';

// ========================================================================
//  +  DEFAULT VALUES
// ========================================================================
const imageDefault: ImagesProject = {
  href: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  altText: 'Default Project Image'
};

const univExt: ExternalLink = {
  href: 'https://www.frc.utn.edu.ar', newTab: true, icon: 'ri:school-fill',
  i18n: I18N.projects.links.university.label,
  altText: I18N.projects.links.university.altText,
};
const githubExt: ExternalLink = {
  href: '', newTab: true, icon: 'ri:github-line',
  i18n: I18N.projects.links.github.label,
  altText: I18N.projects.links.github.altText,
};
const youtubeExt: ExternalLink = {
  href: 'https://www.youtube.com/@lucas_backend13', newTab: true, icon: 'ri:youtube-fill',
  i18n: I18N.projects.links.youtube.label,
  altText: I18N.projects.links.youtube.altText,
};

// ========================================================================
//  +  INTERFACES
// ========================================================================

/** External link (repo, live demo, etc.). */
export interface ExternalLink {
  /** i18n key for the visible label. */
  i18n: string;               //! I18N
  href: string;
  icon: string;
  /** i18n key for the alt text. */
  altText?: string;           //! I18N
  /** Open in a new tab? */
  newTab: boolean;
}

export interface ImagesProject {
  href: string;
  /** i18n key for the alt text. */
  altText?: string;           //! I18N
}

/** Single entry inside the timeline. */
export interface TimelineEntry {
  /** Display order (lower = first). */
  order: number | null;
  /** Iconify icon name. */
  icon: string;
  /**
   * i18n key for the description. Can be a single key or an array of keys
   * (each one a paragraph).
   */
  summary?: string | string[]; //! I18N
}

/** Single entry inside the project detail. */
export interface ProjectEntry {
  /** Display order (lower = first). */
  order: number | null;
  /**
   * i18n key for the short summary. Can be a single key or an array of keys.
   */
  summary?: string | string[]; //! I18N
  /**
   * i18n key for the long description. Can be a single key or an array of keys.
   */
  description?: string | string[]; //! I18N
}

interface ProjectDate {
  /** ISO 8601 date: 'YYYY-MM-DD' or 'YYYY-MM' or 'YYYY'. */
  start: string;
  /** ISO date, or null if ongoing. */
  end: string | null;
}

/** A project entry. */
export interface Project {
  /** i18n key for the title. */
  title: string;              //! I18N
  milestone?: string | null;     //! I18N

  isMain: boolean;

  /** Date range. */
  date: ProjectDate;

  /** Tech ids — resolved via `getTechs()` when rendering. */
  coreTechs: TechKey[];

  extraTechs: TechKey[] | null;

  /** Extra techs shown only on the detail page. */
  otherTechs: TechKey[] | null;

  /** External links (repo, live, etc.). */
  links: ExternalLink[];

  /** Timeline entry (single milestone) or null. */
  timeline?: TimelineEntry | null;

  /** Project detail entry or null. */
  project?: ProjectEntry | null;

  /** Astro page path for the project detail, if any. */
  hrefAstro?: string | null;

  /** External image URLs. */
  images: ImagesProject[];

  /** Tags for filtering. */
  tags: TagKey[] | null;
}

/*

2026       .NET E-commerce         → Dominio de otro stack empresarial: .NET + React + TS
2026       React Native + Java     → Seminario de Analista (grupo de 6).
                                     Mobile con React Native, liderazgo técnico
                                     sobre Backend (2), coordinación con los 3
                                     de documentación funcional, requerimientos
                                     y user stories

*/

// ========================================================================
//  +  PROJECTS
// ========================================================================
export const PROJECTS = {

  //! =================== PROJECT
  fleet_optimizer: {
    title: I18N.projects.fleet_optimizer.title,
    date: { start: '2026-03', end: '2026-07' },
    isMain: true,
    tags: ['Back-end', 'Front-end', 'Database', 'DevOps', 'Microservices', 'Layered', 'Full-Stack'],
    coreTechs: [
      'java', 'springboot', 'junit', 'typescript', 'react', 
      'nginx', 'postgresql', 'docker', 'jwt', 'oauth',
    ],
    extraTechs: [
      'springCloud', 'dockerCompose', 'tailwind', 'swagger', 
    ],
    otherTechs: [
      'javascript', 'html5', 'css3', 'hibernate', 'h2', 'vite',
      'git', 'ghActions', 'github', 'postman', 'bash',
    ],
    links: [
      { ...githubExt, href: 'https://github.com/lucascallamullo/fleet-optimizer' },
    ],
    timeline: {
      order: 20,
      icon: 'ri:git-merge-line',
      summary: I18N.projects.fleet_optimizer.timeline.summary,
    },
    project: {
      order: 20,
      summary: I18N.projects.fleet_optimizer.project.summary,
      description: I18N.projects.fleet_optimizer.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/fleet_optimizer',
    milestone: I18N.projects.fleet_optimizer.milestone
  },

  //! =================== PROJECT
  dds_tutor: {
    title: I18N.projects.dds_tutor.title,
    date: { start: '2026-03', end: '2026-06' },
    isMain: true,
    tags: ['Back-end', 'Front-end', 'Database', 'DevOps', 'Monolith Modular', 'Layered', 'Full-Stack'],
    coreTechs: [
      'typescript', 'javascript', 'react', 'tailwind', 'postgresql',  
    ],
    extraTechs: [
      'nodejs', 'express', 'sequelize', 'docker',
    ],
    otherTechs: [
      'html5', 'css3', 'github', 'postman', 'nginx', 'sqlite', 'ngrok',
      'dbeaver', 'bash', 'vite', 'git', 'jest', 'dockerCompose',
    ],
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/desarrollo-software-3k1' },
      { ...youtubeExt, href: 'https://www.youtube.com/watch?v=jWQxnE9pUiw&list=PLXN8Fu4EL1x9gvbNMOsEdly4CRy4PdB8y' },
    ],
    timeline: {
      order: 38,
      icon: 'ri:youtube-line',
      summary: I18N.projects.dds_tutor.timeline.summary,
    },
    project: {
      order: 38,
      summary: I18N.projects.dds_tutor.project.summary,
      description: I18N.projects.dds_tutor.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/dds_tutor',
    milestone: I18N.projects.dds_tutor.milestone
  },

  //! =================== PROJECT
  portfolio: {
    title: I18N.projects.portfolio.title,
    date: { start: '2026-01', end: '2026-02' },
    isMain: false,
    tags: ['Front-end', 'DevOps'],
    coreTechs: [
      'astro', 'typescript', 'tailwind', 'ghActions', 'ghPages'
    ],
    extraTechs: [
      'git', 'vite', 'javascript',
    ],
    otherTechs: [
      'html5', 'css3', 'github', 'vscode'
    ],
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/LucasCallamullo.github.io' },
    ],
    timeline: {
      order: 42,
      icon: 'thesvg-color:portfolio',
      summary: I18N.projects.portfolio.timeline.summary,
    },
    project: {
      order: 42,
      summary: I18N.projects.portfolio.project.summary,
      description: I18N.projects.portfolio.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/portfolio',
    milestone: I18N.projects.portfolio.milestone
  },

  //! =================== PROJECT
  ecommerce_dj: {
    title: I18N.projects.ecommerce_dj.title,
    date: { start: '2024-03', end: '2025-12' },
    isMain: true,
    tags: ['Back-end', 'Front-end', 'Database', 'DevOps', 'Monolith Modular', 'Layered', 'Full-Stack'],
    coreTechs: [
      'python', 'django', 'pytest', 'javascript', 'tailwind',
      'postgresql', 'redis', 'docker', 'mercadoPago', 'nginx',
    ],
    extraTechs: [
      'drf', 'djTemplates', 'dockerCompose', 'swagger', 'gunicorn',
    ],
    otherTechs: [
      'html5', 'css3', 'git', 'ghActions', 'github', 'postman',
      'sqlite', 'ngrok', 'dbeaver', 'bash',
    ],
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/E-commerce-Public-Demo' },
    ],
    timeline: {
      order: 45,
      icon: 'ri:code-s-slash-line',
      summary: I18N.projects.ecommerce_dj.timeline.summary,
    },
    project: {
      order: 30,
      summary: I18N.projects.ecommerce_dj.project.summary,
      description: I18N.projects.ecommerce_dj.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/ecommerce_dj',
    milestone: I18N.projects.ecommerce_dj.milestone
  },

  //! =================== PROJECT
  backend_tp: {
    title: I18N.projects.backend_tp.title,
    date: { start: '2025-08', end: '2025-10' },
    isMain: false,
    tags: ['Back-end', 'Database', 'DevOps', 'Microservices', 'Layered'],
    coreTechs: [
      'java', 'springboot', 'postgresql', 'docker', 'junit',  'jwt', 'keycloack', 
    ],
    extraTechs: [
      'springCloud', 'springSecurity', 'h2',  'dockerCompose', 'swagger',
    ],
    otherTechs: [
      'hibernate', 'git', 'ghActions', 'github', 'postman', 'bash', 'dbeaver',
    ],
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/java-microservices-backend' },
    ],
    timeline: {
      order: 47,
      icon: 'ri:git-merge-line',
      summary: I18N.projects.backend_tp.timeline.summary,
    },
    project: {
      order: 47,
      summary: I18N.projects.backend_tp.project.summary,
      description: I18N.projects.backend_tp.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/backend_tp',
    milestone: I18N.projects.backend_tp.milestone
  },

  //! =================== PROJECT
  no_country: {
    title: I18N.projects.no_country.title,
    date: { start: '2024-07', end: '2024-11' },
    isMain: false,
    tags: ['Back-end', 'Front-end', 'DevOps', 'Database', 'Full-Stack', 'Monolith Modular'],
    coreTechs: [
      'python', 'django', 'javascript', 'tailwind', 'railway',
    ],
    extraTechs: [
      'git', 'gunicorn', 'drf', 'djTemplates',
    ],
    otherTechs: [
      'vscode', 'github', 'html5', 'css3', 'dbeaver', 'postman'
    ],
    links: [
      { ...githubExt, href: 'https://github.com/No-Country-simulation/Antojitos_Ecommerce' },
    ],
    timeline: {
      order: 50,
      icon: 'ri:group-line',
      summary: I18N.projects.no_country.timeline.summary,
    },
    project: {
      order: 50,
      summary: I18N.projects.no_country.project.summary,
      description: I18N.projects.no_country.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/no_country',
    milestone: I18N.projects.no_country.milestone
  },

  //! =================== PROJECT
  py_tutor: {
    title: I18N.projects.py_tutor.title,
    date: { start: '2023-11', end: '2026-03' },
    isMain: false,
    tags: ['Tutorial'],
    coreTechs: ['python', 'java', 'bash', 'git'],
    extraTechs: ['vscode', 'github'],
    otherTechs: null,
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/Tutoring-Algorithms-Data-Structures' },
      { ...youtubeExt },
    ],
    timeline: {
      order: 51,
      icon: 'ri:macbook-line',
      summary: I18N.projects.py_tutor.timeline.summary,
    },
    project: {
      order: 51,
      summary: I18N.projects.py_tutor.project.summary,
      description: I18N.projects.py_tutor.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/py_tutor',
    milestone: I18N.projects.py_tutor.milestone
  },

  //! =================== PROJECT
  university: {
    title: I18N.projects.university.title,
    date: { start: '2023-03', end: null },
    isMain: false,
    tags: ['Microservices', 'Monolith Modular', 'Full-Stack'],
    coreTechs: ['python', 'java', 'springboot', 'react', 'docker', 'bash', 'linux'],
    extraTechs: [
      'nodejs', 'express', 'sequelize', 'javascript', 'html5', 'css3', 
      'sqlServer', 'jwt', 'git', 
    ],
    otherTechs: null,
    links: [{ ...univExt }],
    timeline: {
      order: 52,
      icon: 'ri:graduation-cap-fill',
      summary: I18N.projects.university.timeline.summary,
    },
    project: null,
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/university',
    milestone: I18N.projects.university.milestone
  },

  //! =================== PROJECT
  pawn_cs: {
    title: I18N.projects.pawn_cs.title,
    date: { start: '2021-03', end: '2022-12' },
    isMain: false,
    tags: [],
    coreTechs: ['pawn', 'counterStrike', 'git'],
    extraTechs: ['github'],
    otherTechs: null,
    links: [
      { ...githubExt, href: 'https://github.com/LucasCallamullo/pawn-project-mod-cs-game' },
    ],
    timeline: {
      order: 55,
      icon: 'thesvg-color:counter-strike',
      summary: I18N.projects.pawn_cs.timeline.summary,
    },
    project: {
      order: 55,
      summary: I18N.projects.pawn_cs.project.summary,
      description: I18N.projects.pawn_cs.project.description,
    },
    images: [{ ...imageDefault }],
    hrefAstro: '/projects/pawn_cs',
    milestone: I18N.projects.pawn_cs.milestone
  },
} as const satisfies Record<string, Project>;

export type KeyProject = keyof typeof PROJECTS;




// ========================================================================
//  +  HELPERS
// ========================================================================

/**
 * Convert a project date to a comparable number.
 * Uses `start` as the sort key.
 */
export function dateToNumber(date: { start: string }): number {
  return new Date(date.start).getTime();
}

/**
 * Format a project date range into a human-readable label.
 * Falls back to "Ongoing" / "En progreso" when `end` is null.
 */
export function formatDateRange(
  date: ProjectDate,
  lang: 'en' | 'es' = 'en'
): string {
  const fmt = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
  });

  const parseYearMonth = (value: string): Date => {
    const [year, month] = value.split('-').map(Number);
    return new Date(year, month - 1, 1);
  };

  const start = fmt.format(parseYearMonth(date.start));

  const end = date.end
    ? fmt.format(parseYearMonth(date.end))
    : lang === 'es'
      ? 'En progreso'
      : 'Ongoing';

  return `${start} – ${end}`;
}




type OrderBy = 'asc' | 'desc';

interface TimelineQueryOptions {
  /** Only include projects that have a timeline entry. Default: true. */
  hasTimeline?: boolean;
  /** Sort direction for the chosen key. Default: 'asc'. */
  orderBy?: OrderBy;
}

/**
 * Get all projects, optionally filtered by timeline presence, sorted by
 * `timeline.order` or by start date.
 *
 * @param options.hasTimeline - If true, exclude projects without a timeline.
 *                              If false, include all projects. Default: true.
 * @param options.orderBy     - Sort direction. Default: 'asc'.
 * @param options.sortBy      - 'timeline' sorts by timeline.order;
 *                              'date' sorts by project start date. Default: 'timeline'.
 */
export function getProjects(options: TimelineQueryOptions & { sortBy?: 'timeline' | 'date' } = {}) {
  const {
    hasTimeline = true,
    orderBy = 'asc',
    sortBy = 'timeline',
  } = options;

  const entries = Object.entries(PROJECTS).map(([id, project]) => ({ id, ...project }));

  const filtered = hasTimeline
    ? entries.filter(
        (p): p is typeof p & { timeline: TimelineEntry } =>
          p.timeline !== null && p.timeline !== undefined
      )
    : entries;

  const dir = orderBy === 'asc' ? 1 : -1;

  if (sortBy === 'date') {
    return filtered.sort(
      (a, b) => dir * (new Date(a.date.start).getTime() - new Date(b.date.start).getTime())
    );
  }

  // Sort by timeline.order. Projects without an order go last regardless of direction.
  return filtered.sort((a, b) => {
    const aOrder = a.timeline?.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.timeline?.order ?? Number.MAX_SAFE_INTEGER;
    return dir * (aOrder - bOrder);
  });
}





interface ProjectQueryOptions {
  /** Filter by isMain. undefined = all. */
  isMain?: boolean;
  /** Filter by tag key. */
  tag?: TagKey;
  /** Filter by tech key (must be in `techs`). */
  tech?: TechKey;
  /** Sort order. Default: 'date-desc'. */
  sortBy?: 'date-asc' | 'date-desc' | 'order';
}

export function getProjectsForPage(options: ProjectQueryOptions = {}) {
  const { isMain, tag, tech, sortBy = 'date-desc' } = options;

  let entries = Object.entries(PROJECTS).map(([id, project]) => ({ id, ...project }));

  if (isMain !== undefined) {
    entries = entries.filter((p) => p.isMain === isMain);
  }
  if (tag) {
    entries = entries.filter((p) => hasValue(p.tags, tag));
  }
  if (tech) {
    entries = entries.filter((p) => {
      const allTechs = [
        ...p.coreTechs,
        ...(p.extraTechs ?? []),
        ...(p.otherTechs ?? []),
      ];
      return hasValue(allTechs, tech);
    });
  }

  switch (sortBy) {
    case 'date-asc':
      entries.sort((a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime());
      break;
    case 'date-desc':
      entries.sort((a, b) => new Date(b.date.start).getTime() - new Date(a.date.start).getTime());
      break;
    case 'order':
      entries.sort((a, b) => (a.project?.order ?? 0) - (b.project?.order ?? 0));
      break;
  }

  return entries;
}

/**
 * Check if a value is in an array, with proper type narrowing.
 * Works with readonly arrays of literals.
 */
function hasValue<T>(arr: readonly T[] | null | undefined, value: T): boolean {
  return arr?.some((item) => item === value) ?? false;
}
