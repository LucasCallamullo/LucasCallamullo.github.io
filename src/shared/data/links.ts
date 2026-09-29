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
};


/**
 * Useful / navigation links (footer, sitemap, etc.).
 */
// Navigation menu links
interface NavItem {
  href: string;
  i18n: string;
  label: string;
  nav: string;
}

export const navItems: NavItem[] = [
  { href: '/',         i18n: I18N.nav.home,     label: 'Home',     nav: 'home' },
  { href: '/about',    i18n: I18N.nav.about,    label: 'About',    nav: 'about' },
  { href: '/skills',   i18n: I18N.nav.skills,   label: 'Skills',   nav: 'skills' },
  { href: '/projects', i18n: I18N.nav.projects, label: 'Projects', nav: 'projects' },
  { href: '/contact',  i18n: I18N.nav.contact,  label: 'Contact',  nav: 'contact' },
];