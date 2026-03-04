import { GithubRepo } from "@/types/github";
import { Archetype } from "../types";

export function detectNightOwl(repos: GithubRepo[]): Archetype {
    // Dummy logic for testing
    const score = 50;
    const evidence = [
        "73% commits after midnight",
        "Processes code via moonlight"
    ];

    return {
        id: "night_owl",
        name: "Night Owl",
        creature: "Owl",
        score,
        description: "This developer does their best work when the world is asleep.",
        evidence
    };
}
