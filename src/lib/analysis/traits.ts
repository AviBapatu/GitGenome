import { GithubRepo } from "@/types/github";
import { Trait } from "@/types/analysis";

export function detectSerialStarter(repos: GithubRepo[]): Trait | null {
    if (repos.length > 40) {
        return {
            name: "Serial Project Starter",
            confidence: 0.7,
            explanation: `You created ${repos.length} repositories, many of which might be abandoned.`,
        };
    }

    return null;
}

export function detectTypeScriptFanatic(
    languageMap: Record<string, number>
): Trait | null {
    const tsCount = languageMap["TypeScript"] || 0;
    const total = Object.values(languageMap).reduce((a, b) => a + b, 0);

    if (total === 0) return null;

    const ratio = tsCount / total;

    if (ratio > 0.4) {
        return {
            name: "Type Safety Fanatic",
            confidence: ratio,
            explanation: `TypeScript dominates ${Math.round(
                ratio * 100
            )}% of your detected repositories.`,
        };
    }

    return null;
}

// Chaos Builder specific traits
export function detectRapidExperimenter(repos: GithubRepo[]): Trait | null {
    if (repos.length > 25) {
        return {
            name: "Rapid Experimenter",
            confidence: 0.8,
            explanation: `Creates new projects frequently and explores many different solutions simultaneously.`,
        };
    }

    return null;
}

export function detectBreakFixCycle(repos: GithubRepo[]): Trait | null {
    // Check for pattern of frequent commits
    const avgCommitsPerRepo = repos.reduce((sum, r) => sum + (r.defaultBranchRef?.target?.history?.totalCount || 0), 0) / Math.max(repos.length, 1);

    if (avgCommitsPerRepo > 50) {
        return {
            name: "Break-Fix Cycle Master",
            confidence: 0.7,
            explanation: "High commit frequency suggests constant iteration, breaking and rebuilding features.",
        };
    }

    return null;
}

export function detectMultiLanguageBouncer(
    languageMap: Record<string, number>
): Trait | null {
    const uniqueLanguages = Object.keys(languageMap).length;

    if (uniqueLanguages > 6) {
        return {
            name: "Multi-Language Bouncer",
            confidence: 0.6,
            explanation: `Experiments with ${uniqueLanguages} different programming languages, switching contexts rapidly.`,
        };
    }

    return null;
}

