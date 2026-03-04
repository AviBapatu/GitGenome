import React from "react";
import { DeveloperProfile } from "@/types/analysis";
import { NormalizedUser } from "@/lib/github/githubNormalizer";
import { GithubRepo } from "@/types/github";
import { NightOwlScene } from "./night-owl/night-owl-scene";
import { FrameworkCollectorScene } from "./framework-collector/framework-collector-scene";
import { ChaosBuilderScene } from "./chaos-builder/chaos-builder-scene";
import { BuilderBeaverScene } from "./builder-beaver/builder-beaver-scene";

export interface SceneProps {
    analysis: DeveloperProfile;
    user?: NormalizedUser;
    repos?: GithubRepo[];
    username: string;
}

export const sceneMap: Record<string, React.FC<SceneProps>> = {
    night_owl: NightOwlScene,
    framework_collector: FrameworkCollectorScene,
    chaos_builder: ChaosBuilderScene,
    builder_beaver: BuilderBeaverScene,
};

