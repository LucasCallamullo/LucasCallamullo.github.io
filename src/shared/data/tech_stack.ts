// src/shared/data/tech-stack.ts

export interface Tech {
  name: string;
  icon: string;
  category: TechCategory;
}

export type TechCategory =
  | 'languages'
  | 'backend'
  | 'frontend'
  | 'databases'
  | 'infra'
  | 'tools'
  | 'testing';

/**
 * Tech stack as a dictionary keyed by a stable id.
 * Use the id (e.g. `TECH_STACK.java`) when referencing a specific tech.
 * Iterate with `Object.values(TECH_STACK)` when rendering the full list.
 * 
 * 
 */

// ? Icons is from these libraries
// ? https://icon-sets.iconify.design/devicon/
// ? https://icon-sets.iconify.design/skill-icons/

export const TECH_STACK = {
  // --- Languages ---
  java:        { name: 'Java',         icon: 'devicon:java',         category: 'languages' },
  csharp:      { name: 'C#',           icon: 'devicon:csharp',       category: 'languages' },
  python:      { name: 'Python',       icon: 'devicon:python',       category: 'languages' },

  // --- Backend ---
  springboot:  { name: 'Spring Boot',  icon: 'devicon:spring',       category: 'backend' },
  hibernate:   { name: 'Hibernate',    icon: 'devicon:hibernate',    category: 'backend' },

  dotnet:      { name: '.Net Core',    icon: 'skill-icons:dotnet',   category: 'backend' },

  django:      { name: 'Django',       icon: 'skill-icons:django',   category: 'backend' },
  drf:         { name: 'DRF',          icon: 'devicon:djangorest',   category: 'backend' },
  fastapi:     { name: 'FastAPI',      icon: 'devicon:fastapi',      category: 'backend' },

  nodejs:      { name: 'Node.js',      icon: 'devicon:nodejs',       category: 'backend' },
  express:     { name: 'Express',      icon: 'devicon:express',      category: 'backend' },
  sequelize:   { name: 'Sequelize',    icon: 'devicon:sequelize',    category: 'backend' },

  // --- Frontend ---
  react:       { name: 'React',        icon: 'devicon:react',        category: 'frontend' },
  typescript:  { name: 'TypeScript',   icon: 'devicon:typescript',   category: 'languages' },
  javascript:  { name: 'JavaScript',   icon: 'devicon:javascript',   category: 'languages' },
  tailwind:    { name: 'Tailwind',     icon: 'devicon:tailwindcss',  category: 'frontend' },

  astro:       { name: 'Astro',        icon: 'devicon:astro',        category: 'frontend' },
  html5:       { name: 'HTML5',        icon: 'devicon:html5',        category: 'frontend' },
  css3:        { name: 'CSS3',         icon: 'devicon:css3',         category: 'frontend' },
  reactNative: { name: 'React Native', icon: 'devicon:reactnative',  category: 'frontend' },
  nextjs:      { name: 'Next.js',      icon: 'devicon:nextjs',       category: 'frontend' },

  // --- Databases ---
  postgresql:  { name: 'PostgreSQL',   icon: 'devicon:postgresql',   category: 'databases' },
  sqlite:      { name: 'SQLite',       icon: 'devicon:sqlite',       category: 'databases' },
  redis:       { name: 'Redis',        icon: 'devicon:redis',        category: 'databases' },

  // --- Infra / Servers ---
  docker:      { name: 'Docker',       icon: 'devicon:docker',       category: 'infra' },
  dockerCompose: { name: 'Docker Compose', icon: 'devicon:docker-wordmark', category: 'infra' },
  nginx:       { name: 'Nginx',        icon: 'devicon:nginx',        category: 'infra' },
  linux:       { name: 'Linux',        icon: 'devicon:linux',        category: 'infra' },
  bash:        { name: 'Bash Scripts', icon: 'devicon:bash',         category: 'tools' },
  jwt:         { name: 'JWT',          icon: 'devicon:jwt',          category: 'infra' },
  oauth:       { name: 'OAuth',        icon: 'devicon:oauth',        category: 'infra' },

  // --- Tools / Version Control ---
  git:         { name: 'Git',          icon: 'devicon:git',          category: 'tools' },
  github:      { name: 'GitHub',       icon: 'devicon:github',       category: 'tools' },
  ghactions:   { name: 'GitHub Actions', icon: 'devicon:githubactions', category: 'tools' },
  vscode:      { name: 'VSCode',       icon: 'devicon:vscode',       category: 'tools' },
  dbeaver:     { name: 'DBeaver',      icon: 'devicon:dbeaver',      category: 'tools' },
  ngrok:       { name: 'Ngrok',        icon: 'devicon:ngrok',        category: 'tools' },

  // --- Testing / Docs ---
  pytest:      { name: 'PyTest',       icon: 'devicon:pytest',       category: 'testing' },
  junit:       { name: 'JUnit 5',      icon: 'devicon:junit',        category: 'testing' },
  postman:     { name: 'Postman',      icon: 'devicon:postman',      category: 'testing' },
  swagger:     { name: 'Swagger',      icon: 'devicon:swagger',      category: 'testing' },
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
  'javascript', 'git', 'bash', 'nginx', 'swagger', 'jwt',
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




/**
 * Get all techs in a given category.
 */
export function getTechsByCategory(category: TechCategory): Tech[] {
  return Object.values(TECH_STACK).filter((t) => t.category === category);
}