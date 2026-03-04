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

  // Night commit ratio is the primary signal
  if (metrics.nightCommitRatio > SCORING_THRESHOLDS.nightCommitRatio.veryHigh) {
    score += 4;
    evidence.push(
      `${Math.round(metrics.nightCommitRatio * 100)}% of commits occur after ${ANALYSIS_CONFIG.nightStartHour}:00 PM`
    );
  } else if (metrics.nightCommitRatio > SCORING_THRESHOLDS.nightCommitRatio.high) {
    score += 3;
    evidence.push(
      `${Math.round(metrics.nightCommitRatio * 100)}% of commits occur after 10 PM`
    );
  } else if (
    metrics.nightCommitRatio > SCORING_THRESHOLDS.nightCommitRatio.moderate
  ) {
    score += 2;
    evidence.push(
      `${Math.round(metrics.nightCommitRatio * 100)}% of commits occur late at night`
    );
  }

  // Moderate to high commit frequency supports Night Owl
  if (metrics.commitFrequency > ANALYSIS_CONFIG.highCommitFrequency) {
    score += 1;
    evidence.push(`Moderate to high commit frequency: ${Math.round(metrics.commitFrequency)} commits/year`);
  }

  // Genome pattern check
  if (genome.consistency > 60) {
    score += 1;
    evidence.push("Consistent late-night development pattern");
  }

  return {
    id: "night_owl",
    name: "Night Owl",
    creature: "Owl",
    score: Math.min(score, 10),
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
  let score = 0;
  const evidence: string[] = [];

  // Repo count signal
  if (metrics.repoCount > SCORING_THRESHOLDS.repoCount.veryHigh) {
    score += 3;
    evidence.push(`${metrics.repoCount} repositories analyzed`);
  } else if (metrics.repoCount > SCORING_THRESHOLDS.repoCount.high) {
    score += 2;
    evidence.push(`${metrics.repoCount} repositories created`);
  }

  // Language diversity signal
  if (metrics.languageDiversity > SCORING_THRESHOLDS.languageDiversity.veryHigh) {
    score += 2;
    evidence.push(
      `${metrics.languageCount} programming languages detected - extensive technology exploration`
    );
  } else if (
    metrics.languageDiversity > SCORING_THRESHOLDS.languageDiversity.high
  ) {
    score += 1;
    evidence.push(`${metrics.languageCount} different programming languages used`);
  }

  // Small repo ratio signal (many experiments)
  if (metrics.smallRepoRatio > 0.6) {
    score += 2;
    evidence.push(
      `${Math.round(metrics.smallRepoRatio * 100)}% of projects are small experiments`
    );
  } else if (metrics.smallRepoRatio > 0.4) {
    score += 1;
    evidence.push(`Many small experimental repositories`);
  }

  // Framework variety
  if (metrics.frameworkKeywords.length > 5) {
    score += 1;
    evidence.push(
      `${metrics.frameworkKeywords.length} different frameworks detected: ${metrics.frameworkKeywords.slice(0, 4).join(", ")}`
    );
  }

  // Genome pattern
  if (genome.exploration > 70) {
    score += 1;
    evidence.push("Very high technology exploration score");
  }

  return {
    id: "framework_collector",
    name: "Framework Collector",
    creature: "Raccoon",
    score: Math.min(score, 10),
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
  let score = 0;
  const evidence: string[] = [];

  // Repo count signal
  if (metrics.repoCount > SCORING_THRESHOLDS.repoCount.veryHigh) {
    score += 3;
    evidence.push(`${metrics.repoCount} repositories - high experimentation rate`);
  } else if (metrics.repoCount > SCORING_THRESHOLDS.repoCount.high) {
    score += 2;
  }

  // Abandoned repo ratio signal
  if (metrics.abandonedRepoRatio > SCORING_THRESHOLDS.abandonmentRatio.high) {
    score += 3;
    evidence.push(
      `${Math.round(metrics.abandonedRepoRatio * 100)}% of projects are unfinished or abandoned`
    );
  } else if (
    metrics.abandonedRepoRatio > SCORING_THRESHOLDS.abandonmentRatio.moderate
  ) {
    score += 2;
    evidence.push(`Many unfinished projects detected`);
  }

  // High commit frequency
  if (
    metrics.commitFrequency > ANALYSIS_CONFIG.veryHighCommitFrequency
  ) {
    score += 2;
    evidence.push(
      `Very high commit frequency: ${Math.round(metrics.commitFrequency)} commits/year`
    );
  } else if (metrics.commitFrequency > ANALYSIS_CONFIG.highCommitFrequency) {
    score += 1;
    evidence.push(`High activity level with frequent commits`);
  }

  // Language diversity
  if (metrics.languageDiversity > SCORING_THRESHOLDS.languageDiversity.high) {
    score += 1;
    evidence.push(`Programming language variety: ${metrics.languageCount} languages`);
  }

  // Genome pattern
  if (genome.experimentation > 75) {
    score += 1;
    evidence.push("Very high experimentation pattern");
  }
  if (genome.consistency < 40) {
    score += 1;
    evidence.push("Inconsistent commit patterns suggest frequent context switching");
  }

  return {
    id: "chaos_builder",
    name: "Chaos Builder",
    creature: "Gremlin",
    score: Math.min(score, 10),
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
  let score = 0;
  const evidence: string[] = [];

  // Repo count in sweet spot (focused but experienced)
  if (
    metrics.repoCount >= ANALYSIS_CONFIG.maxReposForDiscipline &&
    metrics.repoCount <=
    ANALYSIS_CONFIG.minReposForExperimentation
  ) {
    score += 1;
    evidence.push(`${metrics.repoCount} carefully crafted repositories`);
  }

  // Large average repo size
  if (metrics.avgRepoSize > 10000) {
    score += 2;
    evidence.push(
      `Large repositories detected (avg ${Math.round(metrics.avgRepoSize / 1000)}MB) - indicates long-term projects`
    );
  } else if (metrics.avgRepoSize > 5000) {
    score += 1;
    evidence.push(`Substantial repositories suggest substantial projects`);
  }

  // Low abandonment ratio
  if (
    metrics.abandonedRepoRatio < SCORING_THRESHOLDS.abandonmentRatio.low
  ) {
    score += 1;
    evidence.push(
      `Only ${Math.round(metrics.abandonedRepoRatio * 100)}% of projects are inactive - strong follow-through`
    );
  } else if (metrics.abandonedRepoRatio < SCORING_THRESHOLDS.abandonmentRatio.moderate) {
    score += 0.5;
    evidence.push(`Low abandonment ratio indicates commitment to projects`);
  }

  // High commit consistency
  if (metrics.commitConsistency > SCORING_THRESHOLDS.commitConsistency.high) {
    score += 1;
    evidence.push(
      `Consistent commit patterns suggest structured development methodology`
    );
  } else if (metrics.commitConsistency > SCORING_THRESHOLDS.commitConsistency.moderate) {
    score += 0.5;
    evidence.push(`Regular commit patterns detected`);
  }

  // High project longevity
  if (metrics.avgProjectLongevity > 700) {
    score += 1;
    evidence.push(
      `Projects maintained for long periods (avg ${Math.round(metrics.avgProjectLongevity / 30)} months active)`
    );
  }

  // Genome pattern
  if (genome.discipline > 70) {
    score += 1;
    evidence.push("High discipline and structured approach to development");
  }
  if (genome.experimentation < 40) {
    score += 1;
    evidence.push("Focused approach with minimal context switching");
  }

  return {
    id: "builder_beaver",
    name: "Builder Beaver",
    creature: "Beaver",
    score: Math.min(score, 10),
    description:
      "A disciplined, long-term builder. Creates substantial, well-maintained projects with consistent progress.",
    evidence,
  };
}
