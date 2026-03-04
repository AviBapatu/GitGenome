import React from "react";
import { DeveloperProfile } from "@/types/analysis";
import { NightOwlScene } from "./night-owl/night-owl-scene";
import { FrameworkCollectorScene } from "./framework-collector/framework-collector-scene";
import { PlaceholderScene } from "./placeholder-scene";

export const sceneMap: Record<string, React.FC<{ analysis: DeveloperProfile }>> = {
    night_owl: NightOwlScene,
    framework_collector: FrameworkCollectorScene,
    chaos_coder: PlaceholderScene,
};
