export interface Archetype {
    id: string;
    name: string;
    creature: string;
    score: number;
    description: string;
    evidence: string[];
}

export interface ArchetypeScore {
    archetype: Archetype;
    topScore: number;
    secondScore: number;
}
