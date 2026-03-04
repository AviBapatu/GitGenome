import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";
import { countLanguages, reposPerYear } from "../../metrics";

export function detectChaosBuilder(repos: GithubRepo[]): Archetype {
    // Calculate signals for Chaos Builder
    const repoCount = repos.length;
    const languageMap = countLanguages(repos);
    const languageDiversity = Object.keys(languageMap).length;
    const reposPerYearMap = reposPerYear(repos);
    
    // Count how many repos were created recently (high creation rate = chaos)
    const currentYear = new Date().getFullYear();
    const recentRepos = reposPerYearMap[currentYear] || 0;

    // Scoring logic
    let score = 0;
    const evidence: string[] = [];

    if (repoCount > 25) {
        score += 2;
        evidence.push(`${repoCount} repositories created`);
    } else if (repoCount > 15) {
        score += 1;
        evidence.push(`${repoCount} repositories showing active development`);
    }
    
    if (recentRepos > 5) {
        score += 2;
        evidence.push(`${recentRepos} new repositories created this year - rapid prototyping`);
    }
    
    if (languageDiversity > 5) {
        score += 2;
        evidence.push(`${languageDiversity} distinct languages - experimental approach`);
    } else if (languageDiversity > 3) {
        score += 1;
        evidence.push(`${languageDiversity} different languages used`);
    }

    return {
        id: "chaos_builder",
        name: "Chaos Builder",
        creature: "Gremlin",
        score,
        description: "This developer moves fast, experiments aggressively, and often breaks things before fixing them. Projects show rapid iteration, many experiments, and unpredictable code patterns.",
        evidence: evidence.length > 0 ? evidence : ["Experimental development approach detected"]
    };
}
