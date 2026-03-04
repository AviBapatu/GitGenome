"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { AnalysisPipeline } from "@/components/analysis/analysis-pipeline";
import { GenomeExperience } from "@/components/experience/genome-experience";
import { analyzeDeveloper } from "@/lib/analysis/engine";
import { motion, AnimatePresence } from "framer-motion";
import { DevSwitcher } from "@/components/ui/dev-switcher";
import { sceneConfig } from "@/lib/scene-config";
import { DeveloperProfile } from "@/types/analysis";

/** Build a synthetic DeveloperProfile from sceneConfig for override mode. */
function buildOverrideProfile(archetypeId: string): DeveloperProfile {
    const cfg = sceneConfig[archetypeId];
    return {
        archetype: {
            id: archetypeId,
            name: cfg?.name ?? archetypeId,
            creature: cfg?.creature ?? "Unknown",
            score: 100,
            description: `[Dev Override] ${cfg?.environment ?? archetypeId}`,
            evidence: ["Forced via ?archetype= query param"],
        },
        confidence: 1,
        dominantLanguage: null,
        traits: [],
        mutations: [],
    };
}

export default function UserPage() {
    const params = useParams();
    const username = params.username as string;
    const searchParams = useSearchParams();
    const archetypeOverride = searchParams.get("archetype");

    const [showScene, setShowScene] = useState(false);

    const { data: user, isLoading: userLoading, error: userError } = useGithubUser(
        username
    );
    const { data: repos, isLoading: repoLoading, error: repoError } = useGithubRepos(
        username
    );

    const steps = [
        {
            label: "Extracting profile DNA...",
            done: !!user,
        },
        {
            label: "Scanning commit behavior...",
            done: !!repos,
        },
        {
            label: "Analyzing language genetics...",
            done: !!repos,
        },
        {
            label: "Detecting developer mutations...",
            done: !!repos,
        },
        {
            label: "Generating genome report...",
            done: !!repos,
        },
    ];

    const analysis = useMemo(() => {
        if (!repos) return null;
        return analyzeDeveloper(repos);
    }, [repos]);

    // --- Archetype Override ---
    // When ?archetype=<id> is in the URL we skip GitHub data entirely.
    const overrideAnalysis = useMemo(() => {
        if (!archetypeOverride) return null;
        return buildOverrideProfile(archetypeOverride);
    }, [archetypeOverride]);

    const loadingFinished = archetypeOverride
        ? true // override: nothing to load
        : !!(user && repos && analysis);

    // Cinematic delay before scene switch (skipped fully for override)
    useEffect(() => {
        if (archetypeOverride) {
            setShowScene(true);
            return;
        }
        if (loadingFinished) {
            const timer = setTimeout(() => setShowScene(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [loadingFinished, archetypeOverride]);

    if (!archetypeOverride && (userError || repoError)) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50">
                <DevSwitcher />
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-poppins text-pink-500 mb-2">Genome Sequence Failed</h1>
                    <p className="text-slate-600">
                        {userError?.message || repoError?.message || "Something went wrong in the lab."}
                    </p>
                </div>
            </main>
        );
    }

    // Resolve the final analysis — override takes priority
    const finalAnalysis = overrideAnalysis ?? analysis;

    return (
        <>
            {/* DevSwitcher always on top — persists across loading and scene states */}
            <DevSwitcher />

            <AnimatePresence mode="wait">
                {showScene && finalAnalysis ? (
                    <GenomeExperience key="scene" analysis={finalAnalysis} />
                ) : (
                    <motion.main
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-50 relative z-50"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold font-poppins mb-2">Scanning Specimen</h1>
                            <p className="text-xl text-indigo-600 font-semibold">@{username}</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-md w-full relative overflow-hidden">
                            <AnalysisPipeline steps={steps} />

                            {loadingFinished && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 pt-6 border-t border-slate-100 text-center"
                                >
                                    <p className="text-sm font-semibold text-emerald-500 mb-1 tracking-widest uppercase">Match Found</p>
                                    <p className="text-xl font-poppins font-bold text-slate-800 animate-pulse">
                                        {analysis?.archetype.name} Detected
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}
