import { GithubRepo } from "@/types/github";
import { DeveloperProfile, Trait, Mutation } from "@/types/analysis";

import { countLanguages, dominantLanguage, inactiveRepoRatio } from "./metrics";

import { detectSerialStarter, detectTypeScriptFanatic } from "./traits";

import { detectAbandonedProjects, detectFrameworkCollector } from "./mutations";

import { determineArchetype } from "./archetypes";

export function analyzeDeveloper(repos: GithubRepo[]): DeveloperProfile {
    const languageMap = countLanguages(repos);
    const dominant = dominantLanguage(languageMap);
    const inactiveRatio = inactiveRepoRatio(repos);

    const traits = [
        detectSerialStarter(repos),
        detectTypeScriptFanatic(languageMap),
    ].filter(Boolean) as Trait[];

    const mutations = [
        detectAbandonedProjects(inactiveRatio),
        detectFrameworkCollector(languageMap),
    ].filter(Boolean) as Mutation[];

    const archetype = determineArchetype(traits);

    return {
        archetype,
        confidence: 0.7,
        dominantLanguage: dominant,
        traits,
        mutations,
    };
}
