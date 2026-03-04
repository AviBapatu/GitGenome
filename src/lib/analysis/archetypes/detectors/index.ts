import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";
import { AnalysisMetrics } from "../../metricsEngine";
import { DeveloperGenome } from "../../genomeEngine";
import { ANALYSIS_CONFIG, SCORING_THRESHOLDS } from "../../config";

/**
 * Night Owl Detector
 *
 * Signals:
 * - High night commit ratio
 * - Moderate to high commit frequency
 *
 * Genome pattern:
 * - High consistency (steady late-night commits)
 * - Medium other axes
 */
export function detectNightOwl(
  metrics: AnalysisMetrics,
  genome: DeveloperGenome
): Archetype {
  let score = 0;
  const evidence: string[] = [];

  if (metrics.nightCommitRatio > 0.35) {
    score = metrics.nightCommitRatio * 100;
  }

  if (score > 0) {
    evidence.push(`${Math.round(metrics.nightCommitRatio * 100)}% of commits occur late at night (22:00-05:00)`);
    if (metrics.commitFrequency > 20) {
      evidence.push(`Moderate to high commit frequency: ${Math.round(metrics.commitFrequency)} commits/month`);
    }
    if (score > 45) {
      evidence.push(`Extreme night owl detected. This developer's primary productive hours are in the dark.`);
    }
  }

  return {
    id: "night_owl",
    name: "Night Owl",
    creature: "Owl",
    score,
    description:
      "A developer who does their best work when the world is asleep. Thrives during late-night coding sessions.",
    evidence,
  };
}

/**
 * Framework Collector Detector
 *
 * Signals:
 * - High repo count
 * - High language diversity
 * - Many small repos (experiments)
 *
 * Genome pattern:
 * - Very high exploration
 * - High experimentation
 * - Low discipline
 */
export function detectFrameworkCollector(
  metrics: AnalysisMetrics,
  genome: DeveloperGenome
): Archetype {
  const score = (genome.exploration * 0.4) + (genome.experimentation * 0.4) + ((1 - metrics.activityConcentration) * 20);
  const evidence: string[] = [];

  evidence.push(`${metrics.repoCount} repositories analyzed`);
  evidence.push(`${metrics.languageCount} programming languages detected`);
  if (metrics.smallRepoRatio > 0) {
    evidence.push(`${Math.round(metrics.smallRepoRatio * 100)}% of projects are small experiments`);
  }
  if (metrics.activityConcentration < 0.5) {
    evidence.push(`Development activity is spread across many repositories (Concentration: ${Math.round(metrics.activityConcentration * 100)}%)`);
  } else {
    evidence.push(`Most activity concentrated in top repositories (Concentration: ${Math.round(metrics.activityConcentration * 100)}%)`);
  }

  return {
    id: "framework_collector",
    name: "Framework Collector",
    creature: "Raccoon",
    score: Math.round(score),
    description:
      "A developer obsessed with exploring new frameworks and technologies. Constantly experimenting with the latest tools.",
    evidence,
  };
}

/**
 * Chaos Builder Detector
 *
 * Signals:
 * - Very high repo count
 * - High abandoned repo ratio
 * - High commit frequency
 * - High exploration + experimentation
 *
 * Genome pattern:
 * - Very high experimentation
 * - High exploration
 * - Low consistency
 */
export function detectChaosBuilder(
  metrics: AnalysisMetrics,
  genome: DeveloperGenome
): Archetype {
  const score = (genome.experimentation * 0.5) + ((100 - genome.consistency) * 0.3) + ((1 - metrics.activityConcentration) * 20);
  const evidence: string[] = [];

  evidence.push(`${metrics.repoCount} repositories - high experimentation rate`);

  if (metrics.abandonedRepoRatio > 0) {
    evidence.push(`${Math.round(metrics.abandonedRepoRatio * 100)}% of projects are unfinished or abandoned`);
  }

  evidence.push(`Activity consistency is low, indicating frequent context switching`);
  evidence.push(`Development spread across projects (Concentration: ${Math.round(metrics.activityConcentration * 100)}%)`);

  return {
    id: "chaos_builder",
    name: "Chaos Builder",
    creature: "Gremlin",
    score: Math.round(score),
    description:
      "A developer who thrives on experimentation and innovation. High velocity, many ideas, constant iteration.",
    evidence,
  };
}

/**
 * Builder Beaver Detector
 *
 * Signals:
 * - Moderate repo count (5-15)
 * - Large average repo size
 * - Low abandonment ratio
 * - High commit consistency
 *
 * Genome pattern:
 * - Very high discipline
 * - High consistency
 * - Low experimentation
 */
export function detectBuilderBeaver(
  metrics: AnalysisMetrics,
  genome: DeveloperGenome
): Archetype {
  const score = (genome.discipline * 0.5) + (genome.consistency * 0.3) + (metrics.activityConcentration * 20);
  const evidence: string[] = [];

  evidence.push(`${metrics.repoCount} carefully crafted repositories`);

  if (metrics.avgRepoSize > 0) {
    evidence.push(`Repositories are substantial (avg ${Math.round(metrics.avgRepoSize / 1000)}MB)`);
  }

  evidence.push(`Only ${Math.round(metrics.abandonedRepoRatio * 100)}% of projects are inactive`);
  evidence.push(`Consistent commit patterns suggest structured development methodology`);
  evidence.push(`Highly focused effort (Activity Concentration: ${Math.round(metrics.activityConcentration * 100)}%)`);

  return {
    id: "builder_beaver",
    name: "Builder Beaver",
    creature: "Beaver",
    score: Math.round(score),
    description:
      "A disciplined, long-term builder. Creates substantial, well-maintained projects with consistent progress.",
    evidence,
  };
}
