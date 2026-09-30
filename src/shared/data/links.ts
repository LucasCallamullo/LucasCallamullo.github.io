// src/shared/data/links.ts
import { I18N } from '@shared/scripts/utils/i18n_keys';

/**
 * Shape of a single link used across the site
 * (footer, contact page, social buttons, etc.).
 */
export interface SiteLink {
  /** i18n key for the visible label. See `I18N` for available keys. */
  i18n: string;

  /** Destination URL. External links should use absolute URLs. */
  href: string;

  /** Iconify icon name (e.g. `lucide:github`, `simple-icons:linkedin`). */
  icon: string;

  /** Optional: show an "external link" indicator next to the label. */
  external?: boolean;

  /** Optional: controls the `target="_blank"` + `rel` behavior. Default: same as `external`. */
  newTab?: boolean;

  /** Optional: accessible label for the icon when the text is hidden. */
  ariaLabel?: string;

  altText?: string;
}

/**
 * Social / personal links.
 * Order here is the order they render everywhere.
 */
export const SOCIAL_LINKS: Record<string, SiteLink> = {
  github: {
    i18n: I18N.links.github,
    href: 'https://github.com/lucascallamullo',
    icon: 'ri:github-fill',
    external: true,
    newTab: true,
    ariaLabel: 'GitHub',
    altText: 'GitHub',
  },
  linkedin: {
    i18n: I18N.links.linkedin,
    href: 'https://linkedin.com/in/lucascallamullo',
    icon: 'ri:linkedin-fill',
    external: true,
    newTab: true,
    ariaLabel: 'LinkedIn',
    altText: 'LinkedIn',
  },
  email: {
    i18n: I18N.links.email,
    href: 'mailto:lucas@example.com',
    icon: 'ri:mail-line',
    external: false,
    ariaLabel: "Email",
    altText: "Email",
  },
  cv: {
    i18n: I18N.links.cv.href,
    href: './CV/LucasCallamullo_Software_Resume.pdf',
    altText: 'LucasCallamullo_Software_Resume.pdf',
    icon: 'lucide:file-text',
    external: true,
    newTab: true,
  },
  utn: {
    i18n: I18N.links.utn,
    href: 'https://www.frc.utn.edu.ar',
    icon: 'ri:school-fill',
    external: true,
    newTab: true,
  },
};



/**
 * Valid nav identifiers. Adding a new route requires updating this union.
 */
export type NavKey = 'home' | 'about' | 'skills' | 'projects' | 'contact'
  | 'github' | 'linkedin' | 'email' | 'cv' | 'utn';

// Navigation menu links
export interface NavItem {
  /** Route path. */
  href: string;

  /** i18n key for the visible label. */
  i18n: string;

  /** Fallback text (shown before translations load). */
  label: string;

  /** Stable identifier used across the app. */
  nav: NavKey;
}

export const navItems: NavItem[] = [
  { href: '/',         i18n: I18N.nav.home,     label: 'Home',     nav: 'home' },
  { href: '/about',    i18n: I18N.nav.about,    label: 'About',    nav: 'about' },
  { href: '/skills',   i18n: I18N.nav.skills,   label: 'Skills',   nav: 'skills' },
  { href: '/projects', i18n: I18N.nav.projects, label: 'Projects', nav: 'projects' },
  { href: '/contact',  i18n: I18N.nav.contact,  label: 'Contact',  nav: 'contact' },
];

/**
 * Get the full NavItem for a given nav key.
 * Throws if the key is not in `navItems` (should never happen if NavKey
 * and navItems stay in sync).
 */
export function getNavItem(nav: NavKey): NavItem | null {
  const item = navItems.find((n) => n.nav === nav);
  if (!item) {
    return null;
    // throw new Error(`[nav] unknown nav key: "${nav}"`);
  }
  return item;
}

/**
 * Get only the href for a given nav key.
 */
export function getNavHref(nav: NavKey): string {

  const itemNav = getNavItem(nav)
  if (itemNav) return itemNav.href;

  const itemSocial = SOCIAL_LINKS[nav];
  if (itemSocial) return itemSocial.href;

  throw new Error(`[nav] unknown nav key: "${nav}"`);
}