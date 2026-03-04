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
  const repoCountNormalized = Math.min(metrics.repoCount / 100, 1);
  const languageCountNormalized = Math.min(metrics.languageCount / 10, 1);

  const exploration = (repoCountNormalized * 50) + (languageCountNormalized * 50);
  return Math.round(exploration);
}

/**
 * Calculate discipline score
 * Signals: large repos, long project lifespan, low abandonment
 */
function calculateDiscipline(metrics: AnalysisMetrics): number {
  const avgRepoSizeNormalized = Math.min(metrics.avgRepoSize / 10000, 1);
  const projectLongevityNormalized = Math.min(metrics.avgProjectLongevity / 1095, 1); // 3 years = 1095 days

  const discipline = (avgRepoSizeNormalized * 40) + (projectLongevityNormalized * 30) + (metrics.activityConcentration * 30);
  return Math.round(discipline);
}

/**
 * Calculate experimentation score
 * Signals: many small repos, rapid creation, technology variety
 */
function calculateExperimentation(metrics: AnalysisMetrics): number {
  const experimentation = (metrics.smallRepoRatio * 60) + (metrics.abandonedRepoRatio * 40);
  return Math.round(experimentation);
}

/**
 * Calculate consistency score
 * Signals: steady commit frequency, regular activity, long contribution span
 */
function calculateConsistency(metrics: AnalysisMetrics): number {
  const commitFrequencyNormalized = Math.min(metrics.commitFrequency / 60, 1);

  const consistency = commitFrequencyNormalized * 100;
  return Math.round(consistency);
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
  // Confidence based on score gap
  const difference = topScore - secondScore;
  return Math.max(0, difference); // Representing the percentage
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
