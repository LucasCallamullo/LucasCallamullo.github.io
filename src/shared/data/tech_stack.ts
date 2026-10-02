// src/shared/data/tech-stack.ts

export interface Tech {
  name: string;
  icon: string;
  category: TechCategory;
  isOnlyLightTheme?: boolean | null;
}

export type TechCategory =
  | 'languages'
  | 'backend'
  | 'frontend'
  | 'databases'
  | 'infra'
  | 'tools'
  | 'testing'
  | 'games'
  | 'api';

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
  java:        { name: 'Java',           icon: 'devicon:java',           category: 'languages' },
  csharp:      { name: 'C#',             icon: 'thesvg-color:csharp',    category: 'languages' },
  python:      { name: 'Python',         icon: 'devicon:python',         category: 'languages' },

  // --- Backend ---
  springboot:  { name: 'Spring Boot',    icon: 'devicon:spring',         category: 'backend' },
  springCloud:  { name: 'Spring Cloud',  icon: 'devicon:spring',         category: 'backend' },
  springSecurity: { name: 'Spring Security',  icon: 'thesvg-color:spring-security',  category: 'backend' },
  hibernate:   { name: 'Hibernate',      icon: 'devicon:hibernate',      category: 'backend' },

  dotnet:      { name: '.Net',           icon: 'thesvg-color:microsoft-dotnet',   category: 'backend' },
  efCore:      { name: 'EF Core',        icon: 'thesvg-color:entityframeworkcore',   category: 'backend' },

  django:      { name: 'Django',         icon: 'thesvg-color:django',    category: 'backend' },
  drf:         { name: 'DRF',            icon: 'devicon:djangorest',     category: 'backend' },
  fastapi:     { name: 'FastAPI',        icon: 'devicon:fastapi',        category: 'backend' },

  nodejs:      { name: 'Node.js',        icon: 'devicon:nodejs',         category: 'backend' },
  express:     { name: 'Express',        icon: 'thesvg-color:expressdotjs-light', category: 'backend', isOnlyLightTheme: true },
  sequelize:   { name: 'Sequelize',      icon: 'devicon:sequelize',      category: 'backend' },

  // --- Frontend ---
  react:       { name: 'React',          icon: 'devicon:react',          category: 'frontend' },
  typescript:  { name: 'TypeScript',     icon: 'devicon:typescript',     category: 'frontend' },
  javascript:  { name: 'JavaScript',     icon: 'devicon:javascript',     category: 'frontend' },
  tailwind:    { name: 'Tailwind',       icon: 'devicon:tailwindcss',    category: 'frontend' },
  bootstrap:    { name: 'BootStrap 5',   icon: 'thesvg-color:bootstrap',    category: 'frontend' },

  astro:       { name: 'Astro',          icon: 'devicon:astro',          category: 'frontend',       isOnlyLightTheme: true },
  html5:       { name: 'HTML5',          icon: 'devicon:html5',          category: 'frontend' },
  css3:        { name: 'CSS3',           icon: 'devicon:css3',           category: 'frontend' },
  reactNative: { name: 'React Native',   icon: 'devicon:reactnative',    category: 'frontend' },
  nextjs:      { name: 'Next.js',        icon: 'devicon:nextjs',         category: 'frontend' },
  djTemplates: { name: 'Django Templates',  icon: 'thesvg-color:jinja',       category: 'frontend' },

  // --- Databases ---
  postgresql:  { name: 'PostgreSQL',     icon: 'devicon:postgresql',     category: 'databases' },
  sqlite:      { name: 'SQLite',         icon: 'devicon:sqlite',         category: 'databases' },
  h2:          { name: 'H2',             icon: 'thesvg-color:h2-database',   category: 'databases' },
  sqlServer:   { name: 'SQL Server',     icon: 'thesvg-color:microsoft-sql-server', category: 'databases' },
  redis:       { name: 'Redis',          icon: 'devicon:redis',          category: 'databases' },

  // --- Infra / Servers ---
  docker:      { name: 'Docker',         icon: 'devicon:docker',         category: 'infra' },
  dockerCompose: { name: 'Docker Compose', icon: 'devicon:docker-wordmark', category: 'infra' },
  nginx:       { name: 'Nginx',          icon: 'devicon:nginx',          category: 'infra' },

  linux:       { name: 'Linux',          icon: 'devicon:linux',          category: 'infra',          isOnlyLightTheme: true },
  bash:        { name: 'Bash Scripts',   icon: 'devicon:bash',           category: 'tools' },
  gunicorn:    { name: 'Gunicorn',       icon: 'thesvg-color:gunicorn',  category: 'infra' },
  railway:     { name: 'Railway',       icon: 'thesvg-color:railway-dark',  category: 'infra' },

  jwt:         { name: 'JWT',            icon: 'devicon:jwt',            category: 'infra' },
  oauth:       { name: 'OAuth',          icon: 'devicon:oauth',          category: 'infra' },
  keycloack:   { name: 'Keycloack',      icon: 'thesvg-color:keycloak',  category: 'infra' },

  // --- Tools / Version Control ---
  git:         { name: 'Git',            icon: 'devicon:git',          category: 'tools' },
  github:      { name: 'GitHub',         icon: 'devicon:github',       category: 'tools',            isOnlyLightTheme: true },
  ghActions:   { name: 'GitHub Actions', icon: 'devicon:githubactions',category: 'tools' },
  ghPages:      { name: 'GitHub Pages', icon: 'thesvg-color:github-pages',category: 'tools',          isOnlyLightTheme: true},
  vite:        { name: 'Vite',            icon: 'thesvg-color:vite',      category: 'tools' },

  vscode:      { name: 'VSCode',         icon: 'devicon:vscode',       category: 'tools' },
  dbeaver:     { name: 'DBeaver',        icon: 'devicon:dbeaver',      category: 'tools' },
  ngrok:       { name: 'Ngrok',          icon: 'devicon:ngrok',        category: 'tools' },

  // --- Testing / Docs ---
  pytest:      { name: 'PyTest',         icon: 'devicon:pytest',       category: 'testing' },
  junit:       { name: 'JUnit 5',        icon: 'devicon:junit',        category: 'testing' },
  jest:        { name: 'Jest',           icon: 'thesvg-color:jest',    category: 'testing' },
  postman:     { name: 'Postman',        icon: 'devicon:postman',      category: 'testing' },
  swagger:     { name: 'Swagger',        icon: 'devicon:swagger',      category: 'testing' },

  // --- API Integration ---
  mercadoPago: { name: 'Mercado Pago API',   icon: 'thesvg-color:mercado-pago',  category: 'api' },

  counterStrike: { name: 'Counter Strike 1.6', icon: 'thesvg-color:counter-strike',  category: 'games', isOnlyLightTheme: true },
  pawn:        { name: 'Pawn (c-like)',     icon: 'thesvg-color:cplusplus',  category: 'games' },


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


const byCategory = (techs: TechKey[], category: TechCategory) =>
  techs
    .map((id) => TECH_STACK[id])
    .filter((t) => t.category === category);



/**
 * Get all techs in a given category.
 */
export function getTechsByCategory(category: TechCategory): Tech[] {
  return Object.values(TECH_STACK).filter((t) => t.category === category);
}