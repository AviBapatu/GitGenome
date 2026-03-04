import { GithubRepo } from "@/types/github";
import { DeveloperProfile, Trait, Mutation } from "@/types/analysis";

import { countLanguages, dominantLanguage, inactiveRepoRatio } from "./metrics";
import { detectSerialStarter, detectTypeScriptFanatic, detectRapidExperimenter, detectBreakFixCycle, detectMultiLanguageBouncer } from "./traits";
import { detectAbandonedProjects, detectFrameworkCollector, detectConsoleLogAddict, detectStackOverflowSummoner, detectInfiniteRefactorer, detectDependencyExplosion } from "./mutations";
import { detectArchetype } from "./archetypes/engine";

export function analyzeDeveloper(repos: GithubRepo[]): DeveloperProfile {
    const languageMap = countLanguages(repos);
    const dominant = dominantLanguage(languageMap);
    const inactiveRatio = inactiveRepoRatio(repos);

    const archetype = detectArchetype(repos);

    // Build traits based on archetype
    let traits: Trait[] = [
        detectSerialStarter(repos),
        detectTypeScriptFanatic(languageMap),
    ];

    // Add Chaos Builder specific traits
    if (archetype.id === "chaos_builder") {
        traits = traits.concat([
            detectRapidExperimenter(repos),
            detectBreakFixCycle(repos),
            detectMultiLanguageBouncer(languageMap),
        ]);
    }

    traits = traits.filter(Boolean) as Trait[];

    // Build mutations based on archetype
    let mutations: Mutation[] = [
        detectAbandonedProjects(inactiveRatio),
        detectFrameworkCollector(languageMap),
    ];

    // Add Chaos Builder specific mutations
    if (archetype.id === "chaos_builder") {
        mutations = mutations.concat([
            detectConsoleLogAddict(repos),
            detectStackOverflowSummoner(repos),
            detectInfiniteRefactorer(repos),
            detectDependencyExplosion(repos),
        ]);
    }

    mutations = mutations.filter(Boolean) as Mutation[];

    return {
        archetype,
        confidence: 0.7,
        dominantLanguage: dominant,
        traits,
        mutations,
    };
}

