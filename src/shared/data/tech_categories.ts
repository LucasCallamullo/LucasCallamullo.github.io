// src/shared/data/tech_categories.ts
import { I18N } from '@shared/scripts/utils/i18n_keys';

export type TechCategoryKey =
  | 'languages'
  | 'backend'
  | 'frontend'
  | 'mobile'
  | 'databases'
  | 'devops'
  | 'auth'
  | 'tools'
  | 'testing'
  | 'games'
  | 'ai'
  | 'api';

interface TechCategory {
  /** i18n key for the section title. */
  i18n: string;
  /** Fallback label shown before translations load. */
  label: string;
  /** Display order (lower = first). */
  order: number;
  /** Remix Icon name (e.g., 'ri:code-line'). */
  icon: string;
  /** Tailwind text color class for the icon. */
  colorIcon: string;
}

export const TECH_CATEGORIES: Record<TechCategoryKey, TechCategory> = {
  languages: { 
    i18n: I18N.skills.languages, label: 'Languages',       order: 10,
    icon: 'ri:code-view',          colorIcon: 'text-blue-400' 
  },
  backend: { 
    i18n: I18N.skills.backend,   label: 'Back-End',        order: 20,
    icon: 'ri:server-line',          colorIcon: 'text-emerald-400' 
  },
  databases: { 
    i18n: I18N.skills.databases, label: 'Databases',       order: 30,
    icon: 'ri:database-2-line',      colorIcon: 'text-amber-400' 
  },
  frontend: { 
    i18n: I18N.skills.frontend,  label: 'Front-End',       order: 40,
    icon: 'ri:layout-line',          colorIcon: 'text-cyan-400' 
  },
  devops: { 
    i18n: I18N.skills.devops,    label: 'DevOps & Infra',  order: 60,
    icon: 'ri:cloud-line',           colorIcon: 'text-orange-400' 
  },
  testing: { 
    i18n: I18N.skills.testing,   label: 'Testing & Docs',  order: 70,
    icon: 'ri:bug-line',             colorIcon: 'text-rose-400' 
  },
  mobile: { 
    i18n: I18N.skills.mobile,    label: 'Mobile',          order: 72,
    icon: 'ri:smartphone-line',      colorIcon: 'text-purple-400' 
  },
  auth: { 
    i18n: I18N.skills.auth,      label: 'Auth & Security', order: 74,
    icon: 'ri:shield-keyhole-line',  colorIcon: 'text-red-400' 
  },
  ai: { 
    i18n: I18N.skills.ai,        label: 'AI',              order: 75,
    icon: 'ri:robot-line',           colorIcon: 'text-pink-400' 
  },
  tools: { 
    i18n: I18N.skills.tools,     label: 'Extra Tools',     order: 80,
    icon: 'ri:tools-line',           colorIcon: 'text-slate-400' 
  },
  api: { 
    i18n: I18N.skills.api,       label: 'External APIs',   order: 90,
    icon: 'ri:plug-line',            colorIcon: 'text-indigo-400' 
  },
  games: { 
    i18n: I18N.skills.games,     label: 'Games',           order: 100,
    icon: 'ri:gamepad-line',         colorIcon: 'text-lime-400' 
  },
} as const;