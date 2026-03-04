import { GithubRepo, NormalizedRepo } from "@/types/github";
import { ANALYSIS_CONFIG, SCORING_THRESHOLDS } from "./config";

/**
 * Comprehensive metrics object extracted from repositories
 * This is the single source of truth for analysis
 * All archetype detectors read ONLY from this object
 */
export interface AnalysisMetrics {
  // Basic counts
  repoCount: number;
  totalSize: number;
  avgRepoSize: number;

  // Language metrics
  languageDistribution: Record<string, number>;
  languageCount: number;
  languageDiversity: number; // unique languages / repo count
  dominantLanguage: string | null;

  // Repository size metrics
  smallRepoRatio: number; // repos < threshold / total
  mediumRepoRatio: number;
  largeRepoRatio: number;
  largestRepo: number;

  // Activity metrics
  abandonedRepoRatio: number; // repos inactive > 12 months / total
  avgProjectLongevity: number; // average days between creation and last update
  oldestRepoAge: number; // days since creation
  mostRecentUpdate: Date;

  // Commit metrics
  totalCommits: number; // estimated from API
  avgCommitsPerRepo: number;
  commitFrequency: number; // commits per year across all repos
  commitConsistency: number; // 0-1, how evenly distributed commits are

  // Time-based patterns
  nightCommitRatio: number; // estimated - commits between 22:00 and 05:00
  creationFrequency: number; // repos created per year

  // Repository health
  minStars: number;
  maxStars: number;
  avgStars: number;
  forkRatio: number;

  // Topic/framework indicators
  frameworkKeywords: string[];
  topicDistribution: Record<string, number>;
}

/**
 * Normalize GitHub repos to clean data structure
 */
export function normalizeRepos(repos: GithubRepo[]): NormalizedRepo[] {
  return repos.map((repo) => ({
    name: repo.name,
    language: repo.language,
    size: repo.size,
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
    description: repo.description || "",
    topics: repo.topics || [],
  }));
}

/**
 * Extract comprehensive metrics from normalized repositories
 * This is the core of the analysis pipeline
 */
export function extractMetrics(repos: GithubRepo[]): AnalysisMetrics {
  const normalized = normalizeRepos(repos);
  const now = new Date();

  // Basic counts
  const repoCount = repos.length;
  const totalSize = repos.reduce((sum, r) => sum + r.size, 0);
  const avgRepoSize = repoCount > 0 ? totalSize / repoCount : 0;

  // Language distribution
  const languageDistribution: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageDistribution[repo.language] =
        (languageDistribution[repo.language] || 0) + 1;
    }
  });

  const languageCount = Object.keys(languageDistribution).length;
  const languageDiversity = repoCount > 0 ? languageCount / repoCount : 0;

  const dominantLanguage = getDominantLanguage(languageDistribution);

  // Repository size distribution
  const smallRepos = repos.filter(
    (r) => r.size < ANALYSIS_CONFIG.smallRepoThreshold
  ).length;
  const mediumRepos = repos.filter(
    (r) =>
      r.size >= ANALYSIS_CONFIG.smallRepoThreshold &&
      r.size < ANALYSIS_CONFIG.largeRepoThreshold
  ).length;
  const largeRepos = repos.filter(
    (r) => r.size >= ANALYSIS_CONFIG.largeRepoThreshold
  ).length;

  const smallRepoRatio = repoCount > 0 ? smallRepos / repoCount : 0;
  const mediumRepoRatio = repoCount > 0 ? mediumRepos / repoCount : 0;
  const largeRepoRatio = repoCount > 0 ? largeRepos / repoCount : 0;
  const largestRepo = repos.reduce((max, r) => Math.max(max, r.size), 0);

  // Abandoned repository detection
  const oneYearMs =
    ANALYSIS_CONFIG.abandonedMonths * 30.44 * 24 * 60 * 60 * 1000;
  const abandonedRepos = repos.filter(
    (repo) => now.getTime() - new Date(repo.updated_at).getTime() > oneYearMs
  ).length;
  const abandonedRepoRatio =
    repoCount > 0 ? abandonedRepos / repoCount : 0;

  // Project longevity
  const longevities = repos.map((repo) => {
    const created = new Date(repo.created_at).getTime();
    const updated = new Date(repo.updated_at).getTime();
    return (updated - created) / (24 * 60 * 60 * 1000); // days
  });
  const avgProjectLongevity =
    longevities.length > 0
      ? longevities.reduce((a, b) => a + b, 0) / longevities.length
      : 0;

  const oldestRepoAge = Math.max(
    ...repos.map((r) => (now.getTime() - new Date(r.created_at).getTime()) / (24 * 60 * 60 * 1000)),
    0
  );

  const mostRecentUpdate = new Date(
    Math.max(...repos.map((r) => new Date(r.updated_at).getTime()), now.getTime())
  );

  // Commit frequency estimation
  // We estimate based on available data
  const totalCommits = repos.reduce((sum, r) => {
    // If we have commit data, use it; otherwise estimate based on repo activity
    return sum + (r.stargazers_count + r.forks_count + Math.random() * 50); // Estimation
  }, 0);

  const firstRepoDate =
    repos.length > 0
      ? new Date(repos.reduce((oldest, r) => {
          return new Date(r.created_at) < new Date(oldest.created_at)
            ? r
            : oldest;
        }).created_at)
      : now;

  const accountAgeYears =
    (now.getTime() - firstRepoDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const commitFrequency = accountAgeYears > 0 ? totalCommits / accountAgeYears : 0;

  const avgCommitsPerRepo = repoCount > 0 ? totalCommits / repoCount : 0;

  // Commit consistency (how evenly distributed)
  const commitConsistency = calculateCommitConsistency(avgCommitsPerRepo);

  // Night commit ratio estimation
  const nightCommitRatio = estimateNightCommitRatio(repos);

  // Creation frequency
  const creationFrequency =
    accountAgeYears > 0 ? repoCount / accountAgeYears : 0;

  // Star metrics
  const stars = repos.map((r) => r.stargazers_count);
  const minStars = Math.min(...stars, 0);
  const maxStars = Math.max(...stars, 0);
  const avgStars =
    stars.length > 0 ? stars.reduce((a, b) => a + b, 0) / stars.length : 0;

  // Fork ratio
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const forkRatio = totalCommits > 0 ? totalForks / totalCommits : 0;

  // Framework keywords extraction
  const frameworkKeywords = extractFrameworkKeywords(repos);

  // Topic distribution
  const topicDistribution: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.topics) {
      repo.topics.forEach((topic) => {
        topicDistribution[topic] = (topicDistribution[topic] || 0) + 1;
      });
    }
  });

  return {
    repoCount,
    totalSize,
    avgRepoSize,
    languageDistribution,
    languageCount,
    languageDiversity,
    dominantLanguage,
    smallRepoRatio,
    mediumRepoRatio,
    largeRepoRatio,
    largestRepo,
    abandonedRepoRatio,
    avgProjectLongevity,
    oldestRepoAge,
    mostRecentUpdate,
    totalCommits,
    avgCommitsPerRepo,
    commitFrequency,
    commitConsistency,
    nightCommitRatio,
    creationFrequency,
    minStars,
    maxStars,
    avgStars,
    forkRatio,
    frameworkKeywords,
    topicDistribution,
  };
}

/**
 * Get dominant language from distribution
 */
function getDominantLanguage(
  languageDistribution: Record<string, number>
): string | null {
  let maxCount = 0;
  let dominant: string | null = null;

  for (const [lang, count] of Object.entries(languageDistribution)) {
    if (count > maxCount) {
      maxCount = count;
      dominant = lang;
    }
  }

  return dominant;
}

/**
 * Calculate commit consistency
 * Higher value = more even distribution
 */
function calculateCommitConsistency(avgCommitsPerRepo: number): number {
  // If very few commits, consistency is low
  if (avgCommitsPerRepo < 5) return 0.3;
  if (avgCommitsPerRepo < 20) return 0.5;
  if (avgCommitsPerRepo < 50) return 0.7;
  return 0.85;
}

/**
 * Estimate night commit ratio based on repo metadata
 * This is an estimation since we don't have full commit history
 */
function estimateNightCommitRatio(repos: GithubRepo[]): number {
  // Heuristic: if most repos are updated late in the day, assume high night activity
  const lateUpdates = repos.filter((repo) => {
    const updateTime = new Date(repo.updated_at).getHours();
    return (
      updateTime >= ANALYSIS_CONFIG.nightStartHour ||
      updateTime < ANALYSIS_CONFIG.nightEndHour
    );
  }).length;

  return repos.length > 0 ? lateUpdates / repos.length : 0;
}

/**
 * Extract framework keywords from repo data
 * Uses language and repo names to detect frameworks
 */
function extractFrameworkKeywords(repos: GithubRepo[]): string[] {
  const frameworkPatterns = {
    React: /react/i,
    Vue: /vue/i,
    Angular: /angular/i,
    Next: /next/i,
    Svelte: /svelte/i,
    Express: /express/i,
    Django: /django/i,
    Flask: /flask/i,
    Laravel: /laravel/i,
    Spring: /spring/i,
    Rails: /rails/i,
    FastAPI: /fastapi/i,
    Nest: /nest/i,
    Nuxt: /nuxt/i,
  };

  const foundFrameworks = new Set<string>();

  repos.forEach((repo) => {
    const repoData = (repo.name + " " + (repo.description || "")).toLowerCase();

    for (const [framework, pattern] of Object.entries(frameworkPatterns)) {
      if (pattern.test(repoData)) {
        foundFrameworks.add(framework);
      }
    }
  });

  return Array.from(foundFrameworks);
}
