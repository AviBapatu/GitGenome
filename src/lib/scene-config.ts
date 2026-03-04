export interface SceneConfig {
    name: string;
    creature: string;
    color: string;            // accent hex used for glow, highlights
    environment: string;      // human-readable environment label
}

export const sceneConfig: Record<string, SceneConfig> = {
    night_owl: {
        name: "Night Owl",
        creature: "Owl",
        color: "#818cf8",
        environment: "Night Sky",
    },
    framework_collector: {
        name: "Framework Collector",
        creature: "Raccoon",
        color: "#10b981",
        environment: "Tech Forest",
    },
    chaos_coder: {
        name: "Chaos Coder",
        creature: "Fox",
        color: "#f59e0b",
        environment: "Neon Wasteland",
    },
};

/** IDs of all known archetypes, useful for the dev switcher. */
export const archetypeIds = Object.keys(sceneConfig) as (keyof typeof sceneConfig)[];
