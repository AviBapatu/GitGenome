import { Archetype } from "@/lib/analysis/archetypes/types";
import { DeveloperGenome } from "@/lib/analysis/genomeEngine";

export interface Trait {
    name: string;
    confidence: number;
    explanation: string;
}

export interface Mutation {
    name: string;
    explanation: string;
}

export interface DeveloperProfile {
    archetype: Archetype;
    genome: DeveloperGenome;
    confidence: number;
    dominantLanguage: string | null;
    traits: Trait[];
    mutations: Mutation[];
    evidence: string[];
}
