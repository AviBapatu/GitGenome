import { GithubRepo } from "@/types/github";
import { Archetype } from "./types";
import { detectNightOwl } from "./detectors/detectNightOwl";
import { detectFrameworkCollector } from "./detectors/detectFrameworkCollector";
import { detectChaosBuilder } from "./detectors/detectChaosCoder";

export function detectArchetype(repos: GithubRepo[]): Archetype {
    const detectors = [
        detectNightOwl,
        detectFrameworkCollector,
        detectChaosBuilder
    ];

    const scoredArchetypes = detectors.map(detector => detector(repos));

    // Sort descending by score
    scoredArchetypes.sort((a, b) => b.score - a.score);

    // Return the highest scoring archetype
    return scoredArchetypes[0];
}
