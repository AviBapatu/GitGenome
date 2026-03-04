import { Trait } from "@/types/analysis";

export function determineArchetype(traits: Trait[]) {
    const names = traits.map((t) => t.name);

    if (names.includes("Type Safety Fanatic")) {
        return "TypeScript Guardian";
    }

    if (names.includes("Serial Project Starter")) {
        return "Idea Machine";
    }

    return "Generalist Developer";
}
