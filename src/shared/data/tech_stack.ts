// src/shared/data/tech-stack.ts
import { TECH_CATEGORIES, type TechCategoryKey } from './tech_categories';

export interface Tech {
  name: string;
  icon: string;
  category: TechCategoryKey;

  isShow: boolean;
  isMain: boolean;
  isOnlyLightTheme?: boolean | null;
}


/**
 * Tech stack as a dictionary keyed by a stable id.
 * Use the id (e.g. `TECH_STACK.java`) when referencing a specific tech.
 * Iterate with `Object.values(TECH_STACK)` when rendering the full list.
 * 
 * 
 */

// ? Icons is from these libraries
// ? https://icon-sets.iconify.design/devicon/
// ? https://icon-sets.iconify.design/thesvg-color/

export const TECH_STACK = {
  // --- Languages ---
  java:      { name: 'Java',        isShow: true,  isMain: true,  category: 'languages', icon: 'devicon:java' },
  csharp:    { name: 'C#',          isShow: true,  isMain: true, category: 'languages', icon: 'thesvg-color:csharp' },
  ts:        { name: 'TypeScript',  isShow: true,  isMain: true,  category: 'languages',  icon: 'devicon:typescript' },
  js:        { name: 'JavaScript',  isShow: true,  isMain: false, category: 'languages',  icon: 'devicon:javascript' },
  python:    { name: 'Python',      isShow: true,  isMain: false,  category: 'languages', icon: 'devicon:python' },

  // --- Backend ---
  springboot:    { name: 'Spring Boot',     isShow: true,  isMain: true,  category: 'backend',   icon: 'devicon:spring' },
  springSecurity:{ name: 'Spring Security', isShow: false,  isMain: false, category: 'backend',   icon: 'thesvg-color:spring-security' },
  springCloud:   { name: 'Spring Cloud',    isShow: true,  isMain: false, category: 'backend',   icon: 'devicon:spring' },
  hibernate:     { name: 'Hibernate',       isShow: false, isMain: false, category: 'backend',   icon: 'devicon:hibernate' },

  dotnet:        { name: '.NET',            isShow: true,  isMain: true,  category: 'backend',   icon: 'thesvg-color:microsoft-dotnet' },
  efCore:        { name: 'EF Core', isShow: true,  isMain: false, category: 'backend',   icon: 'thesvg-color:entityframeworkcore' },
  
  django:        { name: 'Django',          isShow: true,  isMain: false,  category: 'backend',   icon: 'thesvg-color:django' },
  drf:           { name: 'Django Rest Framework',  isShow: true,  isMain: false, category: 'backend',   icon: 'devicon:djangorest' },
  fastapi:       { name: 'FastAPI',         isShow: false, isMain: false, category: 'backend',   icon: 'devicon:fastapi' },

  nodejs:        { name: 'Node.js',         isShow: false,  isMain: false, category: 'backend',   icon: 'devicon:nodejs' },
  express:       { name: 'Express',         isShow: false,  isMain: false, category: 'backend',   icon: 'thesvg-color:expressdotjs-light', isOnlyLightTheme: true },
  sequelize:     { name: 'Sequelize',       isShow: false,  isMain: false, category: 'backend',   icon: 'devicon:sequelize' },

  // --- Frontend ---
  react:       { name: 'React',             isShow: true,  isMain: true,  category: 'frontend',  icon: 'devicon:react' },
  tailwind:    { name: 'Tailwind',          isShow: true,  isMain: true,  category: 'frontend',  icon: 'devicon:tailwindcss' },
  typescript:  { name: 'TypeScript',        isShow: true,  isMain: true,  category: 'frontend',  icon: 'devicon:typescript' },
  javascript:  { name: 'JavaScript',        isShow: true,  isMain: false, category: 'frontend',  icon: 'devicon:javascript' },

  astro:       { name: 'Astro',             isShow: true,  isMain: false, category: 'frontend',  icon: 'devicon:astro',                  isOnlyLightTheme: true },
  html5:       { name: 'HTML5',             isShow: true,  isMain: false, category: 'frontend',  icon: 'devicon:html5' },
  css3:        { name: 'CSS3',              isShow: true,  isMain: false, category: 'frontend',  icon: 'devicon:css3' },
  bootstrap:   { name: 'BootStrap 5',       isShow: false, isMain: false, category: 'frontend',  icon: 'thesvg-color:bootstrap' },
  nextjs:      { name: 'Next.js',           isShow: false, isMain: false, category: 'frontend',  icon: 'devicon:nextjs' },
  djTemplates: { name: 'Django Templates',  isShow: false, isMain: false, category: 'frontend',  icon: 'thesvg-color:jinja' },

  // --- Mobile ---
  reactNative: { name: 'React Native',      isShow: true,  isMain: false,  category: 'mobile',   icon: 'devicon:reactnative' },
  nativeWind:  { name: 'Native Wind',       isShow: true,  isMain: false, category: 'mobile',    icon: 'thesvg-color:nativewind' },
  expo:        { name: 'Expo',              isShow: true,  isMain: false, category: 'mobile',    icon: 'thesvg-color:expo',              isOnlyLightTheme: true },

  // --- Databases ---
  postgresql:  { name: 'PostgreSQL',        isShow: true,  isMain: true,  category: 'databases', icon: 'devicon:postgresql' },
  redis:       { name: 'Redis',             isShow: true,  isMain: true, category: 'databases', icon: 'devicon:redis' },
  sqlite:      { name: 'SQLite',            isShow: true,  isMain: false, category: 'databases', icon: 'devicon:sqlite' },
  h2:          { name: 'H2',                isShow: true,  isMain: true, category: 'databases', icon: 'thesvg-color:h2-database' },
  sqlServer:   { name: 'SQL Server',        isShow: false, isMain: false, category: 'databases', icon: 'thesvg-color:microsoft-sql-server' },

  // --- Infra / Servers ---
  docker:       { name: 'Docker',           isShow: true,  isMain: true,  category: 'devops',     icon: 'devicon:docker' },
  dockerCompose:{ name: 'Docker Compose',   isShow: true,  isMain: true, category: 'devops',     icon: 'devicon:docker-wordmark' },
  nginx:        { name: 'Nginx',            isShow: true,  isMain: true, category: 'devops',     icon: 'devicon:nginx' },
  linux:        { name: 'Linux',            isShow: false,  isMain: false, category: 'devops',     icon: 'devicon:linux',                  isOnlyLightTheme: true },
  gunicorn:     { name: 'Gunicorn',         isShow: true,  isMain: false, category: 'devops',     icon: 'thesvg-color:gunicorn' },
  railway:      { name: 'Railway',          isShow: false,  isMain: false, category: 'devops',     icon: 'thesvg-color:railway-dark' },

  jwt:          { name: 'JWT',              isShow: true,  isMain: false, category: 'devops',     icon: 'devicon:jwt' },
  oauth:        { name: 'OAuth',            isShow: true,  isMain: false, category: 'devops',     icon: 'devicon:oauth' },
  keycloack:    { name: 'Keycloak',         isShow: true,  isMain: false, category: 'devops',     icon: 'thesvg-color:keycloak' },

  // --- Tools / Version Control ---
  git:          { name: 'Git',              isShow: true,  isMain: false,  category: 'tools',     icon: 'devicon:git' },
  github:       { name: 'GitHub',           isShow: false,  isMain: false, category: 'tools',     icon: 'devicon:github',                 isOnlyLightTheme: true },
  ghActions:    { name: 'GitHub Actions',   isShow: true,  isMain: false, category: 'tools',     icon: 'devicon:githubactions' },
  ghPages:      { name: 'GitHub Pages',     isShow: false,  isMain: false, category: 'tools',     icon: 'thesvg-color:github-pages',      isOnlyLightTheme: true },
  vite:         { name: 'Vite',             isShow: true,  isMain: false, category: 'tools',     icon: 'thesvg-color:vite' },
  bash:         { name: 'Bash Scripts',     isShow: true,  isMain: false, category: 'tools',     icon: 'devicon:bash' },

  vscode:       { name: 'VSCode',           isShow: false,  isMain: false, category: 'tools',     icon: 'devicon:vscode' },
  dbeaver:      { name: 'DBeaver',          isShow: true,  isMain: false, category: 'tools',     icon: 'devicon:dbeaver' },
  ngrok:        { name: 'Ngrok',            isShow: true,  isMain: false, category: 'tools',     icon: 'devicon:ngrok',    isOnlyLightTheme: true },

  // --- Testing / Docs ---
  pytest:       { name: 'PyTest',           isShow: true,  isMain: false, category: 'testing',   icon: 'devicon:pytest' },
  junit:        { name: 'JUnit 5',          isShow: true,  isMain: true, category: 'testing',   icon: 'devicon:junit' },
  jest:         { name: 'Jest',             isShow: false,  isMain: false, category: 'testing',   icon: 'thesvg-color:jest' },
  postman:      { name: 'Postman',          isShow: true,  isMain: false, category: 'testing',   icon: 'devicon:postman' },
  swagger:      { name: 'Swagger',          isShow: true,  isMain: true, category: 'testing',   icon: 'devicon:swagger' },

  // --- API Integration ---
  mercadoPago:  { name: 'Mercado Pago API',  isShow: true,  isMain: false, category: 'api',       icon: 'thesvg-color:mercado-pago' },

  // --- Games ---
  counterStrike:{ name: 'Counter Strike 1.6', isShow: false,  isMain: false, category: 'games',     icon: 'thesvg-color:counter-strike',    isOnlyLightTheme: true },
  pawn:         { name: 'Pawn (c-like)',      isShow: false,  isMain: false, category: 'games',     icon: 'thesvg-color:cplusplus' },

} as const satisfies Record<string, Tech>;

export type TechKey = keyof typeof TECH_STACK;
// → 'java' | 'csharp' | 'python' | 'springboot' | ... | 'swagger'

/**
 * Preferred display order for the tech stack.
 * Ids must match keys in `TECH_STACK`.
 */
export const TECH_STACK_ORDER: TechKey[] = [
  'junit', 'java', 'springboot', 'react', 'typescript', 'tailwind',
  'postgresql', 'docker', 'dockerCompose', 'redis',
  'csharp', 'dotnet', 
  'python', 'django', 'pytest', 'sqlite',
  'javascript', 'git', 'bash', 'nginx', 'swagger', 'jwt'
];



/**
 * Resolve a list of tech ids to their Tech entries.
 * Unknown ids are silently dropped (useful when a project references
 * a tech you removed later).
 *
 * @param ids - Array of keys (TechKey) in TECH_STACK (e.g. ['java', 'docker', 'postgresql'])
 * @returns Array of Tech in the same order as `ids`
 */
export function getTechs(ids: TechKey[]): Tech[] {
  return ids.map((id) => TECH_STACK[id]);
  // .filter((tech): tech is Tech => Boolean(tech));
}

/**
 * All techs, in the preferred display order.
 */
export function getOrderedTechs(): Tech[] {
  return getTechs(TECH_STACK_ORDER);
}









export interface GroupedTechs {
  category: {
    key: TechCategoryKey;
    i18n: string;
    label: string;
    order: number;
  };
  techs: Tech[];
}

interface FilterOptions {
  /** Only include these categories. If omitted, all categories. */
  categories?: TechCategoryKey[];
  /** Only include techs with isShow === true. Default: true. */
  onlyVisible?: boolean;
  /** Only include techs with isMain === true. Default: false. */
  onlyMain?: boolean;
}

/**
 * Group techs by category, optionally filtered, sorted by category.order.
 *
 * @param options.categories - Whitelist of categories. Omit for all.
 * @param options.onlyVisible - Filter by `isShow`. Default: true.
 * @param options.onlyMain - Filter by `isMain`. Default: false.
 *
 * @returns Array of groups, sorted by category.order. Empty categories
 *          are excluded.
 */
export function getGroupedTechs(options: FilterOptions = {}): GroupedTechs[] {
  const {
    categories,
    onlyVisible = true,
    onlyMain = false,
  } = options;

  // 1. Filter the TECH_STACK entries.
  const filtered = Object.values(TECH_STACK).filter((tech) => {
    if (categories && !categories.includes(tech.category)) return false;
    if (onlyVisible && !tech.isShow) return false;
    if (onlyMain && !tech.isMain) return false;
    return true;
  });

  // 2. Group by category.
  const grouped = filtered.reduce<Record<string, Tech[]>>((acc, tech) => {
    (acc[tech.category] ??= []).push(tech);
    return acc;
  }, {});

  // 3. Build the output with category metadata, sorted by order.
  return Object.entries(grouped)
    .map(([key, techs]) => {
      const cat = TECH_CATEGORIES[key as TechCategoryKey];
      return {
        category: {
          key: key as TechCategoryKey,
          i18n: cat.i18n,
          label: cat.label,
          order: cat.order,
        },
        techs,
      };
    })
    .sort((a, b) => a.category.order - b.category.order);
}





