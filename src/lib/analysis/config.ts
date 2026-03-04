/**
 * Configuration constants for the analysis engine
 * These are tunable parameters that affect scoring thresholds
 */

export const ANALYSIS_CONFIG = {
  // Repository size thresholds
  smallRepoThreshold: 500, // KB - repos smaller than this are considered "small"
  mediumRepoThreshold: 5000, // KB
  largeRepoThreshold: 50000, // KB

  // Time-based thresholds
  abandonedMonths: 12, // repos inactive > 12 months are considered abandoned
  projectLongevityYears: 2, // projects active > 2 years are considered long-term

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
    veryHigh: 0.5, // 50% of commits at night
    high: 0.3, // 30% of commits at night
    moderate: 0.2, // 20% of commits at night
  },

  repoCount: {
    veryHigh: 25,
    high: 15,
    moderate: 8,
  },

  languageDiversity: {
    veryHigh: 0.6, // 60% of unique languages relative to repos
    high: 0.4,
    moderate: 0.25,
  },

  abandonmentRatio: {
    high: 0.5, // 50% abandoned
    moderate: 0.3,
    low: 0.1,
  },

  commitConsistency: {
    high: 0.8, // 80% consistency
    moderate: 0.6,
    low: 0.4,
  },
};
