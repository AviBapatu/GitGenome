/**
 * Validation script to test the GitGenome analysis engine
 * Run this to verify all archetypes work correctly with test profiles
 */

import { analyzeDeveloper } from "@/lib/analysis/engine";
import { extractMetrics } from "@/lib/analysis/metricsEngine";
import { calculateGenome } from "@/lib/analysis/genomeEngine";
import {
  NIGHT_OWL_PROFILE,
  FRAMEWORK_COLLECTOR_PROFILE,
  CHAOS_BUILDER_PROFILE,
  BUILDER_BEAVER_PROFILE,
} from "@/lib/analysis/testProfiles";
import { createDevReport } from "@/lib/analysis/debug";

interface ValidationResult {
  archetype: string;
  expectedArchetype: string;
  correct: boolean;
  confidence: number;
  genome: {
    exploration: number;
    discipline: number;
    experimentation: number;
    consistency: number;
  };
}

export async function validateEngine(): Promise<ValidationResult[]> {
  const testCases = [
    {
      name: "Night Owl",
      profile: NIGHT_OWL_PROFILE,
      expected: "night_owl",
    },
    {
      name: "Framework Collector",
      profile: FRAMEWORK_COLLECTOR_PROFILE,
      expected: "framework_collector",
    },
    {
      name: "Chaos Builder",
      profile: CHAOS_BUILDER_PROFILE,
      expected: "chaos_builder",
    },
    {
      name: "Builder Beaver",
      profile: BUILDER_BEAVER_PROFILE,
      expected: "builder_beaver",
    },
  ];

  const results: ValidationResult[] = [];

  for (const testCase of testCases) {
    const analysis = analyzeDeveloper(testCase.profile);

    const result: ValidationResult = {
      archetype: analysis.archetype.id,
      expectedArchetype: testCase.expected,
      correct: analysis.archetype.id === testCase.expected,
      confidence: analysis.confidence,
      genome: analysis.genome,
    };

    results.push(result);

    // Log each test result
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Test: ${testCase.name}`);
    console.log(`${"=".repeat(60)}`);
    console.log(`Expected: ${testCase.expected}`);
    console.log(`Got: ${analysis.archetype.id}`);
    console.log(result.correct ? "✓ PASS" : "✗ FAIL");
    console.log(`Confidence: ${analysis.confidence}%`);
    console.log("\nFull Report:");
    console.log(createDevReport(analysis));
  }

  // Summary
  const passed = results.filter((r) => r.correct).length;
  const total = results.length;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`VALIDATION SUMMARY`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Passed: ${passed}/${total}`);
  console.log(
    `Success Rate: ${((passed / total) * 100).toFixed(1)}%`
  );

  return results;
}

/**
 * Run validation in development
 * Add this to your dev environment or testing pipeline
 */
export function runValidationInDev() {
  if (typeof window !== "undefined") {
    // Browser environment
    validateEngine().then(() => {
      console.log(
        "%cEngine validation complete!",
        "color: green; font-weight: bold; font-size: 14px;"
      );
    });
  }
}
