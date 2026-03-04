import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";

export function detectChaosCoder(repos: GithubRepo[]): Archetype {
    const score = 40; // Mock score
    const evidence = [
        "High variance in commit frequencies",
        "Multiple abandoned experimental projects"
    ];

    return {
        id: "chaos_coder",
        name: "Chaos Coder",
        creature: "Raccoon",
        score,
        description: "Thrives in the entropy of unstructured, fast-paced coding experiments.",
        evidence
    };
}
