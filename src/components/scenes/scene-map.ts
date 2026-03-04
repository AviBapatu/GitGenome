import React from "react";
import { DeveloperProfile } from "@/types/analysis";
import { NightOwlScene } from "./night-owl/night-owl-scene";
import { PlaceholderScene } from "./placeholder-scene";

export const sceneMap: Record<string, React.FC<{ analysis: DeveloperProfile }>> = {
    night_owl: NightOwlScene,
    framework_collector: PlaceholderScene,
    chaos_coder: PlaceholderScene,
};
