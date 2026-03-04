import { GithubRepo } from "@/types/github";
import { Trait } from "@/types/analysis";
import { AnalysisMetrics } from "./metricsEngine";

export function detectSerialStarter(
  repos: GithubRepo[],
  metrics: AnalysisMetrics
): Trait | null {
  if (metrics.repoCount > 40) {
    return {
      name: "Serial Project Starter",
      confidence: 0.7,
      explanation: `You've created ${metrics.repoCount} repositories, exploring many different ideas.`,
    };
  }

  return null;
}

export function detectTypeScriptFanatic(metrics: AnalysisMetrics): Trait | null {
  if (!metrics.languageDistribution["TypeScript"]) {
    return null;
  }

  const tsCount = metrics.languageDistribution["TypeScript"];
  const total = metrics.repoCount;
  const ratio = tsCount / total;

  if (ratio > 0.4) {
    return {
      name: "Type Safety Fanatic",
      confidence: ratio,
      explanation: `TypeScript dominates ${Math.round(
        ratio * 100
      )}% of your detected repositories.`,
    };
  }

  return null;
}

// Chaos Builder specific traits
export function detectRapidExperimenter(
  metrics: AnalysisMetrics
): Trait | null {
  if (metrics.creationFrequency > 3) {
    return {
      name: "Rapid Experimenter",
      confidence: 0.8,
      explanation: `Creates new projects frequently - approximately ${Math.round(metrics.creationFrequency)} repositories per year.`,
    };
  }

  return null;
}

export function detectBreakFixCycle(metrics: AnalysisMetrics): Trait | null {
  if (metrics.avgCommitsPerRepo > 50) {
    return {
      name: "Break-Fix Cycle Master",
      confidence: 0.7,
      explanation: "High commit frequency suggests constant iteration, breaking and rebuilding features.",
    };
  }

  return null;
}

export function detectMultiLanguageBouncer(
  metrics: AnalysisMetrics
): Trait | null {
  const uniqueLanguages = metrics.languageCount;

  if (uniqueLanguages > 6) {
    return {
      name: "Multi-Language Bouncer",
      confidence: 0.6,
      explanation: `Experiments with ${uniqueLanguages} different programming languages, switching contexts rapidly.`,
    };
  }

  return null;
}

