import { Mutation } from "@/types/analysis";

export function detectAbandonedProjects(activeRatio: number): Mutation | null {
    if (activeRatio > 0.6) {
        return {
            name: "Abandoned Project Syndrome",
            explanation: "Most of your repositories have not been updated in over a year.",
        };
    }

    return null;
}

export function detectFrameworkCollector(
    languageMap: Record<string, number>
): Mutation | null {
    const frameworks = ["JavaScript", "TypeScript", "Vue", "Svelte", "HTML"];

    const count = frameworks.filter((f) => languageMap[f]).length;

    if (count >= 4) {
        return {
            name: "Framework Collector",
            explanation: "You experiment with many different frontend ecosystems and let them rot.",
        };
    }

    return null;
}
