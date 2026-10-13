// src/shared/data/tags.ts
import { I18N } from '@shared/scripts/utils/i18n_keys';

/**
 * Category of a tag. Groups related tags for filtering and defines their look.
 */
export type TagCategory =
  | 'architecture'  // cómo está construido
  | 'structure'     // cómo está organizado
  | 'scope'         // alcance (back/front/full)
  | 'context'       // de dónde viene
  | 'type'          // qué es
  | 'status'        // en qué estado está
  | 'team';         // cómo se trabajó

/**
 * Metadata per category: i18n key + Tailwind background class.
 * Add a new category → add an entry here.
 */
export interface TagCategoryMeta {
  /** i18n key for the category label. */
  i18n: string;
  /** Tailwind background class applied to every tag of this category. */
  bg: string;
}

export const TAG_CATEGORIES: Record<TagCategory, TagCategoryMeta> = {
  architecture: { i18n: I18N.tags.category.architecture, bg: 'bg-tag-architecture' },
  structure:    { i18n: I18N.tags.category.structure,    bg: 'bg-tag-structure' },
  scope:        { i18n: I18N.tags.category.scope,        bg: 'bg-tag-scope' },
  context:      { i18n: I18N.tags.category.context,      bg: 'bg-tag-context' },
  type:         { i18n: I18N.tags.category.type,         bg: 'bg-tag-type' },
  status:       { i18n: I18N.tags.category.status,       bg: 'bg-tag-status' },
  team:         { i18n: I18N.tags.category.team,         bg: 'bg-tag-team' },
};

/**
 * A single tag entry.
 */
export interface Tag {
  /** Human-readable label (not translated — technical terms). */
  label: string;
  /** Category used for filtering/grouping and styling. */
  category: TagCategory;
  /** Sort weight. Lower = first. */
  order: number;
  /** i18n key for the tag itself. */
  i18n: string;
}

export const TAGS = {
  // ── Architecture ────────────────────────────────────────
  'Microservices':    { label: 'Microservices',    category: 'architecture', order: 10,  i18n: I18N.tags.microservices },
  'Monolith Modular': { label: 'Monolith Modular', category: 'architecture', order: 20,  i18n: I18N.tags.monolithModular },

  // ── Structure ───────────────────────────────────────────
  'Layered':          { label: 'Layered',          category: 'structure',    order: 50,  i18n: I18N.tags.layered },
  'ONION':            { label: 'ONION',            category: 'structure',    order: 60,  i18n: I18N.tags.onion },

  // ── Scope ───────────────────────────────────────────────
  'Full-Stack':       { label: 'Full-Stack',       category: 'scope',        order: 110, i18n: I18N.tags.fullStack },
  'Back-end':         { label: 'Back-end',         category: 'scope',        order: 120, i18n: I18N.tags.backend },
  'Front-end':        { label: 'Front-end',        category: 'scope',        order: 130, i18n: I18N.tags.frontend },

  // ── Context ─────────────────────────────────────────────
  'University':       { label: 'University',       category: 'context',      order: 210, i18n: I18N.tags.university },
  'Personal':         { label: 'Personal',         category: 'context',      order: 220, i18n: I18N.tags.personal },
  'Freelance':        { label: 'Freelance',        category: 'context',      order: 230, i18n: I18N.tags.freelance },
  'NoCountry':        { label: 'No Country',       category: 'context',      order: 235, i18n: I18N.tags.noCountry },
  'Course':           { label: 'Course',           category: 'context',      order: 240, i18n: I18N.tags.course },
  'Tutorial':         { label: 'Tutorial',         category: 'context',      order: 250, i18n: I18N.tags.tutorial },

  // ── Type ────────────────────────────────────────────────
  'Web App':          { label: 'Web App',          category: 'type',         order: 310, i18n: I18N.tags.webApp },
  'Mobile App':       { label: 'Mobile App',       category: 'type',         order: 320, i18n: I18N.tags.mobileApp },
  'API':              { label: 'API',              category: 'type',         order: 330, i18n: I18N.tags.api },
  'CLI':              { label: 'CLI',              category: 'type',         order: 340, i18n: I18N.tags.cli },
  'Game Mod':         { label: 'Game Mod',         category: 'type',         order: 350, i18n: I18N.tags.gameMod },

  // ── Status ──────────────────────────────────────────────
  'Completed':        { label: 'Completed',        category: 'status',       order: 410, i18n: I18N.tags.completed },
  'In Progress':      { label: 'In Progress',      category: 'status',       order: 420, i18n: I18N.tags.inProgress },
  'Archived':         { label: 'Archived',         category: 'status',       order: 430, i18n: I18N.tags.archived },

  // ── Team ────────────────────────────────────────────────
  'Solo':             { label: 'Solo',             category: 'team',         order: 510, i18n: I18N.tags.solo },
  'Team':             { label: 'Team',             category: 'team',         order: 520, i18n: I18N.tags.team },
  'Lead':             { label: 'Lead',             category: 'team',         order: 530, i18n: I18N.tags.lead },
  'Pair':             { label: 'Pair',             category: 'team',         order: 540, i18n: I18N.tags.pair },
  'Contributor':      { label: 'Contributor',      category: 'team',         order: 550, i18n: I18N.tags.contributor },
} as const satisfies Record<string, Tag>;

/**
 * Union of all valid tag keys.
 */
export type TagKey = keyof typeof TAGS;

/**
 * Get the full Tag entry for a key.
 */
export function getTag(key: TagKey): Tag {
  return TAGS[key];
}

/**
 * Get the category meta (i18n + bg) for a tag.
 */
export function getTagCategory(key: TagKey): TagCategoryMeta {
  return TAG_CATEGORIES[TAGS[key].category];
}

/**
 * Get all tags in a given category, sorted by `order`.
 */
export function getTagsByCategory(category: TagCategory): TagKey[] {
  return (Object.keys(TAGS) as TagKey[])
    .filter((key) => TAGS[key].category === category)
    .sort((a, b) => TAGS[a].order - TAGS[b].order);
}

/**
 * Filter a list of tag keys by category.
 * Returns the full Tag objects (not the keys), sorted by `order`.
 *
 * If `category` is omitted, returns all tags sorted by `order`.
 */
export function filterTags(keys: TagKey[], category?: TagCategory | null): Tag[] {
  const resolved = category == null
    ? keys.map((key) => TAGS[key])
    : keys
        .filter((key) => TAGS[key].category === category)
        .map((key) => TAGS[key]);

  return resolved.sort((a, b) => a.order - b.order);
}



// ==========================================================================
//    +    SECTIONS STUFF
// ==========================================================================



export type SectionId =
  | 'links'
  | 'stack'
  | 'gallery'
  | 'history'
  | 'c4'
  | 'der'
  | 'flow'
  | 'next';

export interface SectionMeta {
  label: string;
  i18n: string;
  /** Remix Icon name (Iconify format). */
  icon: string;
}

// TODO: define more flows when needed.
/**
 * Metadata for every section that can appear on a project page.
 * Each entry maps a SectionId to its display label, i18n key and icon.
 */
export const SECTIONS_TO_RENDER: Record<SectionId, SectionMeta> = {
  links:   { label: 'Links',         i18n: I18N.projectsSlug.sections.links,   icon: 'ri:link' },
  stack:   { label: 'Core Stack',    i18n: I18N.projectsSlug.sections.stack,   icon: 'ri:stack-line' },
  gallery: { label: 'Gallery',       i18n: I18N.projectsSlug.sections.gallery, icon: 'ri:image-line' },
  history: { label: 'History',       i18n: I18N.projectsSlug.sections.history, icon: 'ri:history-line' },
  c4:      { label: 'C4 Model',      i18n: I18N.projectsSlug.sections.c4,      icon: 'ri:node-tree' },
  der:     { label: 'DER',           i18n: I18N.projectsSlug.sections.der,     icon: 'ri:database-2-line' },
  flow:    { label: 'Flow',          i18n: I18N.projectsSlug.sections.flow,    icon: 'ri:flow-chart' },
  next:    { label: 'More projects', i18n: I18N.projectsSlug.sections.next,    icon: 'ri:arrow-right-circle-line' },
};

/** A section with its id attached, ready to be rendered. */
export interface ResolvedSection extends SectionMeta {
  id: SectionId;
}

/**
 * Resolve a list of section ids into full section objects.
 * Preserves the input order, which defines the page layout.
 */
export function getSections(ids: SectionId[]): ResolvedSection[] {
  return ids.map(id => ({ id, ...SECTIONS_TO_RENDER[id] }));
}

/** Returns true if a section with the given id is present in the list. */
export function existSection(sections: ResolvedSection[], id: SectionId): boolean {
  return sections.some(s => s.id === id);
}

export function getSection(sections: ResolvedSection[], id: SectionId): ResolvedSection | undefined {
  return sections.find(s => s.id === id);
}

/**
 * Convert a string to Title Case.
 * Splits on dashes, underscores and whitespace.
 * Keeps known acronyms (e.g. DER) uppercase.
 */
export const titleCase = (s: string) => {
  if (s === 'DER') return 'DER';

  return s
    .split(/[-_\s]+/)
    .map(w => w.charAt(0).toLocaleUpperCase() + w.slice(1).toLocaleLowerCase())
    .join(' ');
};
