// @shared/data/github_stats.ts

const USERNAME = "LucasCallamullo";

const EXCLUDED_REPOS = [
  "pawn-project-mod-cs-game",
  "Tutoring-Algorithms-Data-Structures",
  "java-backend-3k2",
  "desarrollo-software-3k1",
  "python-mobile-kivy",
  "django-practice",
  "python-project-analysis",
  "java-microservices-backend",
].join(",");

const COMMON = {
  username: USERNAME,
  theme: "tokyonight",
  hide_border: "true",
  bg_color: "0D1117",
  background: "0D1117",
};

export const githubStatsUrl = `https://github-readme-stats.vercel.app/api?${new URLSearchParams({
  ...COMMON,
  hide: "contribs,issues",
  show_icons: "true",
  exclude_repo: EXCLUDED_REPOS,
  show: "reviews,prs_merged_percentage",
})}`;

export const githubStreakUrl = `https://github-readme-streak-stats.herokuapp.com?${new URLSearchParams({
  ...COMMON,
  user: USERNAME,
  // card_height: "208",
})}`;

export const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?${new URLSearchParams({
  ...COMMON,
  langs_count: "4",
  show_icons: "true",
  layout: "donut",
  hide: "css,javascript",
  exclude_repo: EXCLUDED_REPOS,
})}`;








export interface RepoLanguages {
  [language: string]: number; // bytes por lenguaje
}

/**
 * Fetch the language breakdown for a repo from the GitHub API.
 * Returns null if the URL is invalid or the request fails.
 *
 * Works at build time (Astro static) or runtime (client).
 */
export async function getRepoLanguages(githubSlug: string): Promise<RepoLanguages | null> {

  let owner = USERNAME;
  let repo = githubSlug;
  
  // This slugs is special cases from data/projects.ts
  if (githubSlug == 'university') return null;

  if (githubSlug == 'Antojitos_Ecommerce') {
    owner = 'No-Country-simulation';
  }

  // Leer del .env (solo disponible en build/server)
  const token = import.meta.env.GITHUB_TOKEN;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
    headers: {
      Accept: 'application/vnd.github+json',
      // Si querés evitar rate limits, agregá un token en build time:
      // Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) return null;
  return res.json();
  // return some like: { "Java": 45234, "TypeScript": 23000, "CSS": 1200 }
}
