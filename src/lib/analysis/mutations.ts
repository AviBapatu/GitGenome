import { GithubRepo } from "@/types/github";
import { Mutation } from "@/types/analysis";
import { AnalysisMetrics } from "./metricsEngine";

export function detectAbandonedProjects(metrics: AnalysisMetrics): Mutation | null {
  if (metrics.abandonedRepoRatio > 0.4) {
    return {
      name: "Abandoned Project Syndrome",
      explanation: `${Math.round(
        metrics.abandonedRepoRatio * 100
      )}% of your repositories have not been updated in over a year.`,
    };
  }

  return null;
}

// Chaos Builder specific mutations
export function detectConsoleLogAddict(repos: GithubRepo[]): Mutation | null {
  // This would check commit messages or repo content for high console.log usage
  // Mock implementation for now
  const hasHighDebugActivity = Math.random() > 0.7; // Simulated

  if (hasHighDebugActivity) {
    return {
      name: "☢ Console.log Addict",
      explanation:
        "Primary debugging strategy relies heavily on console.log statements scattered throughout codebase.",
    };
  }

  return null;
}

export function detectStackOverflowSummoner(repos: GithubRepo[]): Mutation | null {
  // Mock implementation - would check for StackOverflow-style patterns
  const hasStackOverflowPattern = Math.random() > 0.75;

  if (hasStackOverflowPattern) {
    return {
      name: "☢ StackOverflow Summoner",
      explanation:
        "Code patterns suggest solutions frequently copied from StackOverflow with minimal adaptation.",
    };
  }

  return null;
}

export function detectInfiniteRefactorer(repos: GithubRepo[]): Mutation | null {
  // Would check for frequent refactoring commits
  const hasRefactoringPattern = Math.random() > 0.8;

  if (hasRefactoringPattern) {
    return {
      name: "☢ Infinite Refactorer",
      explanation:
        "Commits suggest constant code reorganization without completing features.",
    };
  }

  return null;
}

export function detectDependencyExplosion(repos: GithubRepo[]): Mutation | null {
  // Would check for rapid dependency additions
  const hasDependencyPattern = Math.random() > 0.75;

  if (hasDependencyPattern) {
    return {
      name: "☢ Dependency Explosion",
      explanation:
        "Project dependencies grow exponentially with each commit, rarely removed.",
    };
  }

  return null;
}

