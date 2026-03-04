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
    archetype: string;
    confidence: number;
    dominantLanguage: string | null;
    traits: Trait[];
    mutations: Mutation[];
}
