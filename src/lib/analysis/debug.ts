import { DeveloperProfile } from "@/types/analysis";
import { AnalysisMetrics } from "./metricsEngine";
import { DeveloperGenome } from "./genomeEngine";

/**
 * Debug utilities for development
 * Provides detailed output for tuning the scoring engine
 */

export interface DebugOutput {
  timestamp: string;
  archetype: string;
  scores: {
    nightOwl: number;
    frameworkCollector: number;
    chaosBuilder: number;
    builderBeaver: number;
  };
  genome: DeveloperGenome;
  confidence: number;
  metrics: AnalysisMetrics;
  evidence: string[];
}

/**
 * Generate debug output for development and tuning
 */
export function generateDebugOutput(
  profile: DeveloperProfile,
  metrics: AnalysisMetrics
): DebugOutput {
  return {
    timestamp: new Date().toISOString(),
    archetype: profile.archetype.name,
    scores: {
      nightOwl: profile.archetype.id === "night_owl" ? profile.archetype.score : 0,
      frameworkCollector:
        profile.archetype.id === "framework_collector"
          ? profile.archetype.score
          : 0,
      chaosBuilder:
        profile.archetype.id === "chaos_builder" ? profile.archetype.score : 0,
      builderBeaver:
        profile.archetype.id === "builder_beaver" ? profile.archetype.score : 0,
    },
    genome: profile.genome,
    confidence: profile.confidence,
    metrics,
    evidence: profile.evidence,
  };
}

/**
 * Format debug output for console display
 */
export function formatDebugOutput(debug: DebugOutput): string {
  const pad = (text: string, width: number) => text.padEnd(width);
  const bar = (value: number) => "█".repeat(Math.round(value / 10));

  return `
╔════════════════════════════════════════════════════════════════════════════╗
║                       GITGENOME DEBUG OUTPUT                               ║
╚════════════════════════════════════════════════════════════════════════════╝

📊 ARCHETYPE CLASSIFICATION
${pad("Selected:", 20)} ${debug.archetype}
${pad("Confidence:", 20)} ${debug.confidence}%

🎯 ARCHETYPE SCORES
${pad("Night Owl", 20)} ${bar(debug.scores.nightOwl)} (${debug.scores.nightOwl})
${pad("Framework Collector", 20)} ${bar(debug.scores.frameworkCollector)} (${debug.scores.frameworkCollector})
${pad("Chaos Builder", 20)} ${bar(debug.scores.chaosBuilder)} (${debug.scores.chaosBuilder})
${pad("Builder Beaver", 20)} ${bar(debug.scores.builderBeaver)} (${debug.scores.builderBeaver})

🧬 DEVELOPER GENOME
${pad("Exploration", 20)} ${bar(debug.genome.exploration)} (${debug.genome.exploration})
${pad("Experimentation", 20)} ${bar(debug.genome.experimentation)} (${debug.genome.experimentation})
${pad("Discipline", 20)} ${bar(debug.genome.discipline)} (${debug.genome.discipline})
${pad("Consistency", 20)} ${bar(debug.genome.consistency)} (${debug.genome.consistency})

📈 KEY METRICS
${pad("Repository Count:", 20)} ${debug.metrics.repoCount}
${pad("Language Count:", 20)} ${debug.metrics.languageCount}
${pad("Language Diversity:", 20)} ${(debug.metrics.languageDiversity * 100).toFixed(1)}%
${pad("Avg Repo Size:", 20)} ${(debug.metrics.avgRepoSize / 1000).toFixed(1)}MB
${pad("Small Repo Ratio:", 20)} ${(debug.metrics.smallRepoRatio * 100).toFixed(1)}%
${pad("Abandoned Repos:", 20)} ${(debug.metrics.abandonedRepoRatio * 100).toFixed(1)}%
${pad("Commit Frequency:", 20)} ${debug.metrics.commitFrequency.toFixed(1)}/month
${pad("Night Commit Ratio:", 20)} ${(debug.metrics.nightCommitRatio * 100).toFixed(1)}%
${pad("Activity Concentrat.:", 20)} ${(debug.metrics.activityConcentration * 100).toFixed(1)}%
${pad("Avg Project Life:", 20)} ${(debug.metrics.avgProjectLongevity / 30).toFixed(1)} months
${pad("Creation Rate:", 20)} ${debug.metrics.creationFrequency.toFixed(2)}/year
${pad("Dominant Language:", 20)} ${debug.metrics.dominantLanguage || "None"}

📋 EVIDENCE
${debug.evidence.map((e, i) => `${i + 1}. ${e}`).join("\n")}

⏰ Generated: ${debug.timestamp}
`;
}

/**
 * Display genome visualization
 */
export function displayGenomeVisualization(genome: DeveloperGenome): string {
  const bar = (score: number) => "█".repeat(Math.round(score / 10));

  return `
🧬 DEVELOPER GENOME BREAKDOWN

Exploration      ${bar(genome.exploration)} ${String(genome.exploration).padStart(3, " ")}
Experimentation  ${bar(genome.experimentation)} ${String(genome.experimentation).padStart(3, " ")}
Discipline       ${bar(genome.discipline)} ${String(genome.discipline).padStart(3, " ")}
Consistency      ${bar(genome.consistency)} ${String(genome.consistency).padStart(3, " ")}
  `.trim();
}

/**
 * Create a development report summary
 */
export function createDevReport(profile: DeveloperProfile): string {
  return `
╔════════════════════════════════════════════════════════════════════════════╗
║                    DEVELOPER GENOME REPORT                                 ║
╚════════════════════════════════════════════════════════════════════════════╝

🎭 ARCHETYPE: ${profile.archetype.name.toUpperCase()}
${profile.archetype.description}

📊 CLASSIFICATION CONFIDENCE: ${profile.confidence}%

🧬 GENOME BREAKDOWN:
${displayGenomeVisualization(profile.genome)}

✨ TRAITS DETECTED:
${profile.traits.length > 0
      ? profile.traits.map((t) => `• ${t.name} (${Math.round(t.confidence * 100)}%)`).join("\n")
      : "No major traits detected"
    }

⚡ MUTATIONS:
${profile.mutations.length > 0
      ? profile.mutations.map((m) => `• ${m.name}: ${m.explanation}`).join("\n")
      : "No mutations detected"
    }

📋 EVIDENCE:
${profile.evidence.map((e, i) => `${i + 1}. ${e}`).join("\n")}

🔬 DOMINANT LANGUAGE: ${profile.dominantLanguage || "None detected"}
  `.trim();
}

/**
 * Log detailed debug information for development
 */
export function logDebugInfo(profile: DeveloperProfile, metrics: AnalysisMetrics): void {
  if (typeof window === "undefined") {
    // Server-side or test environment
    return;
  }

  const debug = generateDebugOutput(profile, metrics);
  const formatted = formatDebugOutput(debug);

  console.log(formatted);
  console.log("\n📊 Raw Debug Data:", debug);
}

/**
 * Create a shareable profile string
 */
export function createShareableProfile(profile: DeveloperProfile): string {
  const emoji = {
    night_owl: "🦉",
    framework_collector: "🦝",
    chaos_builder: "👹",
    builder_beaver: "🦫",
  };

  const defaultEmoji = "🧬";
  const archetypeEmoji =
    emoji[profile.archetype.id as keyof typeof emoji] || defaultEmoji;

  return `I'm a ${archetypeEmoji} ${profile.archetype.name} Developer!

Genome:
• Exploration: ${profile.genome.exploration}
• Experimentation: ${profile.genome.experimentation}
• Discipline: ${profile.genome.discipline}
• Consistency: ${profile.genome.consistency}

What's your GitGenome? 🧬`;
}
