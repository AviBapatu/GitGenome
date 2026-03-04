"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { SketchAnalysisBoard } from "@/components/analysis/sketch-analysis-board";
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
        genome: {
            exploration: 50,
            discipline: 50,
            experimentation: 50,
            consistency: 50,
        },
        confidence: 100,
        dominantLanguage: null,
        traits: [],
        mutations: [],
        evidence: ["Forced via ?archetype= query param"],
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
        username,
        { limit: 50, topOnly: false }
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
            const timer = setTimeout(() => setShowScene(true), 3500); // Increased a bit to let the user see the match
            return () => clearTimeout(timer);
        }
    }, [loadingFinished, archetypeOverride]);

    if (!archetypeOverride && (userError || repoError)) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
                <DevSwitcher />
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-caveat text-red-600 mb-2 transform rotate-2">Genome Sequence Failed!</h1>
                    <p className="text-slate-600 font-patrick text-xl">
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
                    <GenomeExperience key="scene" analysis={finalAnalysis} user={user} repos={repos} username={username} />
                ) : (
                    <motion.main
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-8 bg-[#faf8f5] relative z-50 text-slate-800"
                    >
                        {/* Paper texture overlay & faint grid */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.4]"
                            style={{
                                backgroundImage: `
                                linear-gradient(to right, #94a3b8 1px, transparent 1px),
                                linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                            `,
                                backgroundSize: '40px 40px',
                            }}
                        />

                        <div className="text-center relative z-10 font-patrick">
                            <h1 className="text-4xl font-bold mb-2 text-slate-700 underline decoration-wavy decoration-slate-400 transform -rotate-1">Scanning Specimen</h1>
                            <p className="text-3xl font-caveat text-indigo-700 font-bold transform rotate-2">@{username}</p>
                        </div>

                        <div className="relative z-10 w-full max-w-lg px-4">
                            <SketchAnalysisBoard steps={steps} />

                            {loadingFinished && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 text-center transform rotate-2"
                                >
                                    <p className="text-2xl font-caveat text-emerald-600 font-bold mb-1 tracking-wider uppercase drop-shadow-sm">✓ Match Found</p>
                                    <p className="text-3xl font-patrick font-bold text-slate-800 underline decoration-red-400">
                                        {analysis?.archetype.name} Detected!
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
