import { GithubRepo } from "@/types/github";
import { DeveloperProfile, Trait, Mutation } from "@/types/analysis";

import { extractMetrics } from "./metricsEngine";
import { calculateGenome, calculateConfidence } from "./genomeEngine";
import { detectArchetype } from "./archetypes/engine";
import {
  detectSerialStarter,
  detectTypeScriptFanatic,
  detectRapidExperimenter,
  detectBreakFixCycle,
  detectMultiLanguageBouncer,
} from "./traits";
import {
  detectAbandonedProjects,
  detectConsoleLogAddict,
  detectStackOverflowSummoner,
  detectInfiniteRefactorer,
  detectDependencyExplosion,
} from "./mutations";

/**
 * Main analysis engine
 * Orchestrates the complete pipeline:
 * GitHub API Data → Normalization → Metrics → Genome → Archetype → Traits/Mutations → Output
 */
export function analyzeDeveloper(repos: GithubRepo[]): DeveloperProfile {
  // Step 1: Extract comprehensive metrics from repos
  const metrics = extractMetrics(repos);

  // Step 2: Calculate behavioral genome
  const genome = calculateGenome(metrics);

  // Step 3: Detect archetype using metrics + genome
  const archetypeScore = detectArchetype(metrics, genome);
  const archetype = archetypeScore.archetype;

  // Step 4: Calculate confidence in classification
  const confidence = calculateConfidence(
    archetypeScore.topScore,
    archetypeScore.secondScore
  );

  // Step 5: Build traits based on metrics and archetype
  const traitDetectors: Array<() => Trait | null> = [
    () => detectSerialStarter(repos, metrics),
    () => detectTypeScriptFanatic(metrics),
  ];

  if (archetype.id === "chaos_builder") {
    traitDetectors.push(
      () => detectRapidExperimenter(metrics),
      () => detectBreakFixCycle(metrics),
      () => detectMultiLanguageBouncer(metrics)
    );
  }

  const traits = traitDetectors
    .map((fn) => fn())
    .filter((trait): trait is Trait => trait !== null);

  // Step 6: Build mutations based on archetype
  const mutationDetectors: Array<() => Mutation | null> = [
    () => detectAbandonedProjects(metrics),
  ];

  if (archetype.id === "chaos_builder") {
    mutationDetectors.push(
      () => detectConsoleLogAddict(repos),
      () => detectStackOverflowSummoner(repos),
      () => detectInfiniteRefactorer(repos),
      () => detectDependencyExplosion(repos)
    );
  }

  const mutations = mutationDetectors
    .map((fn) => fn())
    .filter((mutation): mutation is Mutation => mutation !== null);

  // Step 7: Combine all evidence
  const combinedEvidence = [
    ...archetype.evidence,
    ...traits.map((t) => t.explanation),
  ];

  return {
    archetype,
    genome,
    confidence,
    dominantLanguage: metrics.dominantLanguage,
    traits,
    mutations,
    evidence: combinedEvidence,
  };
}

