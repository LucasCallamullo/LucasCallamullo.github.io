// src/shared/data/tags.ts

/**
 * Category of a tag. Groups related tags for filtering.
 */
export type TagCategory =
  | 'area'        // Back-end, Front-end, Full-Stack
  | 'data'        // Database
  | 'ops'         // DevOps
  | 'architecture' // Microservices, Monolith, Layered, ONION
  | 'tutor'       // Tutor Class
  | 'scope';      // Full-Stack (si querés separarlo de area)

/**
 * A single tag entry.
 */
export interface Tag {
  /** Human-readable label (not translated — technical terms). */
  label: string;
  /** Category used for filtering/grouping. */
  category: TagCategory;
}

/**
 * All tags available across the site.
 * Add new tags here; `TagKey` updates automatically.
 */
export const TAGS = {
  'Back-end':        { label: 'Back-end',        category: 'area' },
  'Front-end':       { label: 'Front-end',       category: 'area' },
  'Full-Stack':      { label: 'Full-Stack',      category: 'area' },
  'Database':        { label: 'Database',        category: 'area' },
  'DevOps':          { label: 'DevOps',          category: 'area' },
  'Microservices':   { label: 'Microservices',   category: 'architecture' },
  'Monolith Modular':{ label: 'Monolith Modular',category: 'architecture' },
  'Layered':         { label: 'Layered',         category: 'architecture' },
  'ONION':           { label: 'ONION',           category: 'architecture' },
  'Tutorial':        { label: 'Tutorial',        category: 'tutor' },
} as const satisfies Record<string, Tag>;

/**
 * Union of all valid tag keys.
 * → 'Back-end' | 'Front-end' | 'Full-Stack' | 'Database' | ...
 */
export type TagKey = keyof typeof TAGS;


/**
 * Get all tags in a given category.
 */
export function getTagsByCategory(category: TagCategory): TagKey[] {
  return (Object.keys(TAGS) as TagKey[]).filter(
    (key) => TAGS[key].category === category
  );
}

/**
 * Get the full Tag entry for a key.
 */
export function getTag(key: TagKey): Tag {
  return TAGS[key];
}

/**
 * Filter a list of tag keys by category.
 */
export function filterTags(
  keys: TagKey[],
  category: TagCategory
): TagKey[] {
  return keys.filter((key) => TAGS[key].category === category);
}





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
}

export const SECTIONS_TO_RENDER: Record<SectionId, SectionMeta> = {
  links:   { label: 'Links',          i18n: 'projects.sections.links' },
  stack:   { label: 'Core Stack',     i18n: 'projects.sections.stack' },
  gallery: { label: 'Gallery',        i18n: 'projects.sections.gallery' },
  history: { label: 'History',        i18n: 'projects.sections.history' },
  c4:      { label: 'C4 Model',       i18n: 'projects.sections.c4' },
  der:     { label: 'DER',            i18n: 'projects.sections.der' },
  flow:    { label: 'Flow',           i18n: 'projects.sections.flow' },
  next:    { label: 'More projects',  i18n: 'projects.sections.next' },
};


/*
<nav>
  <ul>
    {sections.map(s => (
      <li>
        <a href={`#${s.id}`} data-i18n={s.i18n}>{s.label}</a>
      </li>
    ))}
  </ul>
</nav>
*/
export interface ResolvedSection extends SectionMeta {
  id: SectionId;
}

export function getSections(ids: SectionId[]): ResolvedSection[] {
  return ids.map(id => ({ id, ...SECTIONS_TO_RENDER[id] }));
}