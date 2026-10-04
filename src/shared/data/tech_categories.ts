// src/shared/data/tech_categories.ts

import { I18N } from '@shared/scripts/utils/i18n_keys';

export type TechCategoryKey =
  | 'languages'
  | 'backend'
  | 'frontend'
  | 'mobile'
  | 'databases'
  | 'devops'
  | 'tools'
  | 'testing'
  | 'games'
  | 'api';

interface TechCategory {
  /** i18n key for the section title. */
  i18n: string;
  /** Fallback label shown before translations load. */
  label: string;
  /** Display order (lower = first). */
  order: number;
}

export const TECH_CATEGORIES: Record<TechCategoryKey, TechCategory> = {
  languages: { i18n: I18N.skills.languages, label: 'Languages',       order: 10 },
  backend:   { i18n: I18N.skills.backend,   label: 'Back-End',        order: 20 },
  databases: { i18n: I18N.skills.databases, label: 'Databases',       order: 30 },

  frontend:  { i18n: I18N.skills.frontend,  label: 'Front-End',       order: 40 },
  mobile:    { i18n: I18N.skills.mobile,    label: 'Mobile',          order: 50 },

  devops:    { i18n: I18N.skills.devops,    label: 'DevOps & Infra',  order: 60 },
  testing:   { i18n: I18N.skills.testing,   label: 'Testing & Docs',  order: 70 },
  tools:     { i18n: I18N.skills.tools,     label: 'Extra Tools',     order: 70 },
  api:       { i18n: I18N.skills.api,       label: 'External APIs',   order: 90 },
  games:     { i18n: I18N.skills.games,     label: 'Games',           order: 100 },
} as const;