import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";
import { reposPerYear, inactiveRepoRatio } from "../../metrics";

export function detectBuilderBeaver(repos: GithubRepo[]): Archetype {
    // Calculate signals for Builder Beaver
    const repoCount = repos.length;
    const reposPerYearMap = reposPerYear(repos);
    const inactiveRatio = inactiveRepoRatio(repos);

    // Calculate average repo size (approximated by stargazers_count and forks_count)
    const avgRepoSize = repos.length > 0
        ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0) + (repo.forks_count || 0), 0) / repos.length
        : 0;

    // Calculate commit consistency (repos with consistent contribution patterns)
    // We estimate this by looking at repos with updates throughout the years
    const yearsActive = Object.keys(reposPerYearMap).length;
    const avgReposPerYear = repoCount / Math.max(yearsActive, 1);

    // Scoring logic
    let score = 0;
    const evidence: string[] = [];

    // Large repos indicate system building
    if (avgRepoSize > 50) {
        score += 2;
        evidence.push(`Average project size of ${Math.round(avgRepoSize)} - substantial systems built`);
    } else if (avgRepoSize > 20) {
        score += 1;
        evidence.push(`Moderate project complexity detected`);
    }

    // Moderate repo count (not too many, not too few)
    if (repoCount >= 5 && repoCount <= 25) {
        score += 2;
        evidence.push(`${repoCount} repositories - focused development portfolio`);
    } else if (repoCount > 25) {
        // Too many repos suggests experimenter
        score -= 1;
        evidence.push(`${repoCount} repositories - high experimentation rate`);
    }

    // Consistent development over time
    if (yearsActive >= 3) {
        score += 2;
        evidence.push(`${yearsActive} years of consistent development`);
    } else if (yearsActive >= 2) {
        score += 1;
        evidence.push(`Multi-year project history`);
    }

    // Low inactive ratio indicates commitment to projects
    if (inactiveRatio < 0.3) {
        score += 2;
        evidence.push(`${Math.round((1 - inactiveRatio) * 100)}% of projects actively maintained`);
    } else if (inactiveRatio < 0.5) {
        score += 1;
        evidence.push(`Majority of projects show recent activity`);
    }

    // Steady creation rate (not chaotic bursts)
    if (avgReposPerYear < 5 && avgReposPerYear > 0) {
        score += 1;
        evidence.push(`Steady development pace - ~${Math.round(avgReposPerYear)} repos per year`);
    }

    return {
        id: "builder_beaver",
        name: "Builder Beaver",
        creature: "Beaver",
        score,
        description: "This developer builds systems patiently, focusing on structure, reliability, and long-term maintainability. Projects show careful design and consistent development patterns.",
        evidence: evidence.length > 0 ? evidence : ["Structured development approach detected"]
    };
}
