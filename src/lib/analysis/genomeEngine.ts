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
  const languageDiversity = metrics.languageDiversity; // Already 0-1
  const creationScore = Math.min(Math.log(metrics.repoCreationRate + 1) / Math.log(40), 1);

  const exploration = (languageDiversity * 60) + (creationScore * 40);
  return Math.max(0, Math.min(100, Math.round(exploration)));
}

/**
 * Calculate discipline score
 * Signals: large repos, long project lifespan, low abandonment
 */
function calculateDiscipline(metrics: AnalysisMetrics): number {
  const sizeScore = Math.min(metrics.avgRepoSize / 5000, 1);
  const longevityScore = Math.min(metrics.avgProjectLongevity / 5, 1);

  const discipline = (metrics.largeRepoRatio * 40) + (longevityScore * 40) + (sizeScore * 20);
  return Math.max(0, Math.min(100, Math.round(discipline)));
}

/**
 * Calculate experimentation score
 * Signals: many small repos, rapid creation, technology variety
 */
function calculateExperimentation(metrics: AnalysisMetrics): number {
  const creationScore = Math.min(Math.log(metrics.repoCreationRate + 1) / Math.log(40), 1);

  const experimentation = (metrics.smallRepoRatio * 50) + (creationScore * 30) + ((1 - metrics.activityConcentration) * 20);
  return Math.max(0, Math.min(100, Math.round(experimentation)));
}

/**
 * Calculate consistency score
 * Signals: steady commit frequency, regular activity, long contribution span
 */
function calculateConsistency(metrics: AnalysisMetrics): number {
  const commitScore = Math.min(metrics.commitFrequency / 60, 1);
  const consistency = (commitScore * 60) + (metrics.activityConcentration * 20) + (metrics.activeRepoRatio * 20);
  return Math.max(0, Math.min(100, Math.round(consistency)));
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
  if (topScore === 0) return 0;
  // Confidence based on score gap
  const difference = (topScore - secondScore) / topScore;
  return Math.max(0, Math.min(1, difference)); // Representing the percentage
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
