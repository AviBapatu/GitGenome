/**
 * Configuration constants for the analysis engine
 * These are tunable parameters that affect scoring thresholds
 */

export const ANALYSIS_CONFIG = {
  // Repository size thresholds
  smallRepoThreshold: 200, // KB - repos smaller than this are considered "small" experiments
  mediumRepoThreshold: 2000, // KB
  largeRepoThreshold: 10000, // KB - large systems

  // Time-based thresholds
  abandonedMonths: 12, // repos inactive > 12 months are considered abandoned
  projectLongevityYears: 3, // projects active > 3 years are considered long-term

  // Commit-based thresholds
  highCommitFrequency: 50, // commits per year
  veryHighCommitFrequency: 100,

  // Night hours (for Night Owl detection)
  nightStartHour: 22, // 10 PM
  nightEndHour: 5, // 5 AM

  // Diversity thresholds
  minLanguagesForPolyglot: 4,
  minFrameworksForCollector: 5,

  // Repository count thresholds
  minReposForExperimentation: 20,
  maxReposForDiscipline: 15,

  // Confidence thresholds
  minConfidenceScore: 0.6,

  // Archetype scoring weights
  archetypeWeights: {
    nightOwl: {
      nightCommitRatio: 0.5,
      commitFrequency: 0.3,
      consistency: 0.2,
    },
    frameworkCollector: {
      repoCount: 0.25,
      languageDiversity: 0.35,
      smallRepoRatio: 0.25,
      exploration: 0.15,
    },
    chaosBuilder: {
      repoCount: 0.25,
      abandonedRepoRatio: 0.25,
      commitFrequency: 0.25,
      experimentation: 0.25,
    },
    builderBeaver: {
      avgRepoSize: 0.3,
      projectLongevity: 0.25,
      abandonedRepoRatio: 0.25,
      commitConsistency: 0.2,
    },
  },

  // Genome scoring weights
  genomeWeights: {
    exploration: {
      languageDiversity: 0.4,
      repoCountNormalized: 0.3,
      frameworkVariety: 0.3,
    },
    discipline: {
      avgRepoSizeNormalized: 0.4,
      projectLongevity: 0.3,
      lowAbandonmentRatio: 0.3,
    },
    experimentation: {
      smallRepoRatio: 0.5,
      repoCreationRate: 0.3,
      languageDiversity: 0.2,
    },
    consistency: {
      commitConsistency: 0.5,
      commitFrequency: 0.3,
      activitySpan: 0.2,
    },
  },
};

/**
 * Scoring thresholds for different axes
 * Used to determine when a signal is strong enough
 */
export const SCORING_THRESHOLDS = {
  nightCommitRatio: {
    veryHigh: 0.50, // 50+ extreme night owl
    high: 0.30, // 30-50 night owl
    moderate: 0.15, // 15-30 occasional
  },

  repoCount: {
    veryHigh: 200, // ecosystem maintainer
    high: 80, // open source maintainer
    moderate: 20, // active developer
  },

  languageDiversity: {
    veryHigh: 0.6,
    high: 0.4,
    moderate: 0.25,
  },

  abandonmentRatio: {
    high: 0.7, // 0.7+ extreme experimenter
    moderate: 0.5, // 0.5-0.7 chaotic builder
    low: 0.2, // 0-0.2 disciplined dev
  },

  commitConsistency: {
    high: 0.8, // 80% consistency
    moderate: 0.6,
    low: 0.4,
  },
};

