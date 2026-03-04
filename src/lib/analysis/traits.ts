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
