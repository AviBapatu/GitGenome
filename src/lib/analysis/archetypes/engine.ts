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
  "builder_beaver",
  "night_owl",
  "framework_collector",
  "chaos_builder",
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

  return {
    archetype: sorted[0],
    topScore: sorted[0].score,
    secondScore: sorted[1].score,
  };
}
