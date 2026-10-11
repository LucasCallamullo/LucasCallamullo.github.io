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
  card_height: "208",
})}`;

export const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?${new URLSearchParams({
  ...COMMON,
  langs_count: "6",
  show_icons: "true",
  layout: "donut",
  exclude_repo: EXCLUDED_REPOS,
})}`;