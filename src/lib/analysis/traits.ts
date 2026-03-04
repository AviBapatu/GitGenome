import { GithubRepo } from "@/types/github";
import { Trait } from "@/types/analysis";
import { AnalysisMetrics } from "./metricsEngine";

export function detectSerialStarter(
  repos: GithubRepo[],
  metrics: AnalysisMetrics
): Trait | null {
  if (metrics.repoCount > 20) {
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

// Universal & General Traits
export function detectSteadyCoder(metrics: AnalysisMetrics): Trait | null {
  if (metrics.commitConsistency > 0.75) {
    return {
      name: "Steady Pacer",
      confidence: metrics.commitConsistency,
      explanation: "Maintains a reliable, consistent cadence of contributions rather than bursty sprints.",
    };
  }
  return null;
}

export function detectLoneWolf(metrics: AnalysisMetrics): Trait | null {
  if (metrics.forkRatio < 0.1 && metrics.repoCount >= 10) {
    return {
      name: "Lone Wolf",
      confidence: 0.8,
      explanation: "Prefers building original projects from scratch rather than relying heavily on forked codebases.",
    };
  }
  return null;
}

export function detectCommunityCollaborator(metrics: AnalysisMetrics): Trait | null {
  if (metrics.forkRatio > 0.3) {
    return {
      name: "Community Collaborator",
      confidence: Math.min(metrics.forkRatio, 1),
      explanation: "High fork ratio suggests active collaboration and contribution to community projects.",
    };
  }
  return null;
}

export function detectMidnightCoder(metrics: AnalysisMetrics): Trait | null {
  if (metrics.nightCommitRatio > 0.35) {
    return {
      name: "Midnight Coder",
      confidence: metrics.nightCommitRatio,
      explanation: "High frequency of activity occurring during late night hours.",
    };
  }
  return null;
}

export function detectDeepRoots(metrics: AnalysisMetrics): Trait | null {
  if (metrics.avgProjectLongevity > 180) {
    return {
      name: "Deep Roots",
      confidence: 0.8,
      explanation: "Projects tend to be maintained for extended durations rather than quickly abandoned.",
    };
  }
  return null;
}

export function detectLanguageExplorer(metrics: AnalysisMetrics): Trait | null {
  if (metrics.languageDiversity > 0.4 && metrics.languageCount > 4) {
    return {
      name: "Polyglot Explorer",
      confidence: metrics.languageDiversity,
      explanation: `Commands high language diversity across repositories (${metrics.languageCount} languages).`,
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

