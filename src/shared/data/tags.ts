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