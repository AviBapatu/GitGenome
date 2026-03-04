import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";
import { countLanguages } from "../../metrics";

export function detectFrameworkCollector(repos: GithubRepo[]): Archetype {
    const languageMap = countLanguages(repos);
    const uniqueLanguages = Object.keys(languageMap).length;

    const score = Math.min(uniqueLanguages * 10, 100);

    const evidence = [
        `${uniqueLanguages} distinct languages/frameworks detected`,
        "Shows a strong tendency to adopt new technologies"
    ];

    return {
        id: "framework_collector",
        name: "Framework Collector",
        creature: "Fox",
        score,
        description: "A developer who loves exploring and accumulating new languages and frameworks.",
        evidence
    };
}
