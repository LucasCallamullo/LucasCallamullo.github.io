// @shared/data/github_stats.ts

const USERNAME = "LucasCallamullo";

const EXCLUDED_REPOS = [
  "pawn-project-mod-cs-game",
  "python-mobile-kivy",
  "django-practice",
  "python-project-analysis",
  "desarrollo-software-3k1",
  "Tutoring-Algorithms-Data-Structures",
  "java-backend-3k2",

  "java-microservices-backend",
  "LucasCallamullo",
  "Antojitos_Ecommerce",
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
  
  // This slugs is special cases from data/projects.ts
  if (githubSlug == 'university') return null;

  if (githubSlug == 'Antojitos_Ecommerce') {
    owner = 'No-Country-simulation';
  }
  
  // Some projects span multiple repos and need to be merged (py_tutor)
  let otherRepo: string | null = null;
  if (githubSlug === 'Tutoring-Algorithms-Data-Structures') {
    otherRepo = 'java-backend-3k2';
  }

  // Leer del .env (solo disponible en build/server)
  const token = import.meta.env.GITHUB_TOKEN;

  if (!otherRepo) {
    return await fetchToGitHub(owner, githubSlug, token);
  }
  
// Merge both repos into a single language map
  const [primary, secondary] = await Promise.all([
    fetchToGitHub(owner, githubSlug, token),
    fetchToGitHub(owner, otherRepo, token),
  ]);

  return mergeLanguages(primary, secondary);
}

async function fetchToGitHub(owner: string, repo: string, token: string): Promise<RepoLanguages | null> {

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

/**
 * Merge two language maps by summing byte counts per language.
 * Languages present in only one map are kept as-is.
 */
function mergeLanguages(
  a: RepoLanguages | null,
  b: RepoLanguages | null
): RepoLanguages | null {
  if (!a && !b) return null;
  if (!a) return b;
  if (!b) return a;

  const merged: RepoLanguages = { ...a };
  for (const [lang, bytes] of Object.entries(b)) {
    merged[lang] = (merged[lang] ?? 0) + bytes;
  }
  return merged;
}