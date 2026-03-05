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
  const repoCountNormalized = Math.min(metrics.repoCount / 150, 1);
  const languageCountNormalized = Math.min(metrics.languageCount / 10, 1);

  const exploration = (repoCountNormalized * 50) + (languageCountNormalized * 50);
  return Math.max(0, Math.min(100, Math.round(exploration)));
}

/**
 * Calculate discipline score
 * Signals: large repos, long project lifespan, low abandonment
 */
function calculateDiscipline(metrics: AnalysisMetrics): number {
  const avgRepoSizeNormalized = Math.min(metrics.avgRepoSize / 10000, 1);
  const projectLongevityNormalized = Math.min(metrics.avgProjectLongevity / (365 * 3), 1); // 3 years

  const discipline = (avgRepoSizeNormalized * 50) + (projectLongevityNormalized * 40) + (metrics.activityConcentration * 10);
  return Math.max(0, Math.min(100, Math.round(discipline)));
}

/**
 * Calculate experimentation score
 * Signals: many small repos, rapid creation, technology variety
 */
function calculateExperimentation(metrics: AnalysisMetrics): number {
  const creationRateNormalized = Math.min(metrics.repoCreationRate / 15, 1);
  const languageDiversityPercent = Math.min(metrics.languageDiversity, 1);

  const experimentation = (metrics.smallRepoRatio * 50) + (languageDiversityPercent * 30) + (creationRateNormalized * 20);
  return Math.max(0, Math.min(100, Math.round(experimentation)));
}

/**
 * Calculate consistency score
 * Signals: steady commit frequency, regular activity, long contribution span
 */
function calculateConsistency(metrics: AnalysisMetrics): number {
  const commitFrequencyNormalized = Math.min(metrics.commitFrequency / 60, 1);
  const consistency = commitFrequencyNormalized * 100;
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
