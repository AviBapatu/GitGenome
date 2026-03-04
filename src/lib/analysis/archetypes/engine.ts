import { Archetype, ArchetypeScore } from "./types";
import {
  detectNightOwl,
  detectFrameworkCollector,
  detectChaosBuilder,
  detectBuilderBeaver,
} from "./detectors/index";
import { AnalysisMetrics } from "../metricsEngine";
import { DeveloperGenome } from "../genomeEngine";

const ARCHETYPE_PRIORITY = [
  "chaos_builder",
  "framework_collector",
  "night_owl",
  "builder_beaver",
];

/**
 * Run all archetype detectors and select the best match
 * Returns both the winning archetype and the runner-up for confidence calculation
 */
export function detectArchetype(
  metrics: AnalysisMetrics,
  genome: DeveloperGenome
): ArchetypeScore {
  const detectors = [
    { name: "Night Owl", fn: detectNightOwl },
    { name: "Framework Collector", fn: detectFrameworkCollector },
    { name: "Chaos Builder", fn: detectChaosBuilder },
    { name: "Builder Beaver", fn: detectBuilderBeaver },
  ];

  // Run all detectors
  const archetypes = detectors.map((detector) =>
    detector.fn(metrics, genome)
  );

  // Sort by score descending
  const sorted = [...archetypes].sort((a, b) => b.score - a.score);

  // Handle ties using priority system
  if (sorted[0].score === sorted[1].score) {
    const tieArchetypes = sorted.filter((a) => a.score === sorted[0].score);
    const byPriority = tieArchetypes.sort(
      (a, b) =>
        ARCHETYPE_PRIORITY.indexOf(a.id) -
        ARCHETYPE_PRIORITY.indexOf(b.id)
    );
    sorted[0] = byPriority[0];
  }

  let winner = sorted[0];
  let runnerUp = sorted[1];

  // Night Owl override logic: if > 0.45 it overrides other archetypes
  const nightOwl = archetypes.find((a) => a.id === "night_owl");
  if (nightOwl && metrics.nightCommitRatio > 0.45 && winner.id !== "night_owl") {
    runnerUp = winner;
    winner = nightOwl;
  }

  return {
    archetype: winner,
    topScore: winner.score,
    secondScore: runnerUp.score,
  };
}
