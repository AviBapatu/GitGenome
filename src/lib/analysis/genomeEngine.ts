import { AnalysisMetrics } from "./metricsEngine";
import { ANALYSIS_CONFIG } from "./config";

/**
 * Developer behavioral genome
 * Represents 4 core axes of developer behavior
 */
export interface DeveloperGenome {
  exploration: number; // 0-100: How much they explore different technologies
  discipline: number; // 0-100: How structured and long-term their projects are
  experimentation: number; // 0-100: How often they try new ideas
  consistency: number; // 0-100: How steady their development is
}

/**
 * Calculate exploration score
 * Signals: language diversity, repo count, framework variety
 */
function calculateExploration(metrics: AnalysisMetrics): number {
  // Normalize metrics to 0-1 range
  const languageDiversityScore = Math.min(
    metrics.languageDiversity * 1.5,
    1
  ); // Higher diversity = more exploration
  const repoCountScore = Math.min(
    metrics.repoCount / 50,
    1
  ); // More repos = more exploration
  const frameworkScore = Math.min(
    metrics.frameworkKeywords.length / 10,
    1
  ); // More frameworks = more exploration

  const weights = ANALYSIS_CONFIG.genomeWeights.exploration;

  const score =
    languageDiversityScore * weights.languageDiversity +
    repoCountScore * weights.repoCountNormalized +
    frameworkScore * weights.frameworkVariety;

  return Math.round(score * 100);
}

/**
 * Calculate discipline score
 * Signals: large repos, long project lifespan, low abandonment
 */
function calculateDiscipline(metrics: AnalysisMetrics): number {
  // Large repos indicate long-term commitment
  const largeRepoScore = Math.min(metrics.largeRepoRatio * 4, 1);

  // Long-lived projects indicate discipline
  const longevityScore = Math.min(metrics.avgProjectLongevity / 500, 1); // Normalize to 500 days

  // Low abandonment indicates finish-what-you-start mentality
  const lowAbandonmentScore = 1 - metrics.abandonedRepoRatio;

  const weights = ANALYSIS_CONFIG.genomeWeights.discipline;

  const score =
    largeRepoScore * weights.avgRepoSizeNormalized +
    longevityScore * weights.projectLongevity +
    lowAbandonmentScore * weights.lowAbandonmentRatio;

  return Math.round(score * 100);
}

/**
 * Calculate experimentation score
 * Signals: many small repos, rapid creation, technology variety
 */
function calculateExperimentation(metrics: AnalysisMetrics): number {
  // Small repos indicate experiments
  const smallRepoScore = metrics.smallRepoRatio;

  // Rapid repo creation indicates frequent experimentation
  const creationRateScore = Math.min(metrics.creationFrequency / 5, 1); // 5 repos/year = max

  // Language diversity shows trying different tech
  const languageDiversityScore = Math.min(
    metrics.languageDiversity * 1.5,
    1
  );

  const weights = ANALYSIS_CONFIG.genomeWeights.experimentation;

  const score =
    smallRepoScore * weights.smallRepoRatio +
    creationRateScore * weights.repoCreationRate +
    languageDiversityScore * weights.languageDiversity;

  return Math.round(score * 100);
}

/**
 * Calculate consistency score
 * Signals: steady commit frequency, regular activity, long contribution span
 */
function calculateConsistency(metrics: AnalysisMetrics): number {
  // Commit consistency indicates regular coding patterns
  const commitConsistencyScore = metrics.commitConsistency;

  // Steady commit frequency
  const frequencyScore = Math.min(metrics.commitFrequency / 100, 1); // 100 commits/year = max

  // Long activity span
  const activitySpanScore = Math.min(metrics.oldestRepoAge / 1825, 1); // 5 years = max

  const weights = ANALYSIS_CONFIG.genomeWeights.consistency;

  const score =
    commitConsistencyScore * weights.commitConsistency +
    frequencyScore * weights.commitFrequency +
    activitySpanScore * weights.activitySpan;

  return Math.round(score * 100);
}

/**
 * Calculate the complete developer genome
 */
export function calculateGenome(metrics: AnalysisMetrics): DeveloperGenome {
  return {
    exploration: calculateExploration(metrics),
    discipline: calculateDiscipline(metrics),
    experimentation: calculateExperimentation(metrics),
    consistency: calculateConsistency(metrics),
  };
}

/**
 * Calculate confidence in the archetype classification
 * Based on the distance between top candidates
 */
export function calculateConfidence(
  topScore: number,
  secondScore: number
): number {
  const difference = topScore - secondScore;
  // Normalize to 0-100
  // Larger difference = higher confidence
  const confidence = Math.min((difference / 10) * 100, 100);
  return Math.round(confidence);
}

/**
 * Get visual representation of genome scores
 */
export function getGenomeVisualization(genome: DeveloperGenome): string {
  const bar = (score: number) => "█".repeat(Math.round(score / 10));
  const pad = (label: string) => label.padEnd(15);

  return `
Developer Genome Breakdown

Exploration      ${bar(genome.exploration)} ${genome.exploration}
Experimentation  ${bar(genome.experimentation)} ${genome.experimentation}
Discipline       ${bar(genome.discipline)} ${genome.discipline}
Consistency      ${bar(genome.consistency)} ${genome.consistency}
  `.trim();
}
