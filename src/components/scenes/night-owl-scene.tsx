"use client";

import { useEffect } from "react";
import { DeveloperProfile } from "@/types/analysis";
import { motion } from "framer-motion";
import { soundManager } from "@/components/sound/sound-manager";
import { OwlCreature } from "@/components/creatures/owl";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";
// Import previously separated genome cards for use inside notebook


export function NightOwlScene({ analysis }: { analysis: DeveloperProfile }) {
    // Load background ambient noises
    useEffect(() => {
        // You would load real sounds here, but to avoid browser crash/errors 
        // without real files, we only instruct the sound manager if the files exist.
        // For now we mock the ambient execution.
        // soundManager.playAmbience("/assets/sounds/night_ambience.mp3");

        return () => {
            soundManager.stopAmbience();
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-slate-900 overflow-y-auto overflow-x-hidden">

            {/* Dynamic Starry Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-black" />
                {/* Twinkling Stars generated via CSS/Motion */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: Math.random() }}
                        animate={{ opacity: [0.1, 1, 0.1] }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 3 + "px",
                            height: Math.random() * 3 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                    />
                ))}
                {/* Giant Moon */}
                <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-yellow-100/90 shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
            </div>

            {/* Floating Creature */}
            <div className="fixed top-1/4 left-1/4 z-20 pointer-events-auto">
                <OwlCreature />
            </div>

            {/* Notebook Report Overlay */}
            <div className="relative z-30 pt-48 px-4 pb-20 pointer-events-none">
                <div className="pointer-events-auto">
                    <NotebookLayout subject="user">

                        <section className="space-y-4">
                            <HandwrittenTitle type="underline">Classification: Night Owl</HandwrittenTitle>
                            <p className="text-xl">
                                This developer does their best work when the world is asleep. Commits frequently occur in the darkest hours.
                                They process code via moonlight.
                            </p>
                        </section>

                        <ScribbleDivider />

                        <section className="space-y-4">
                            <HandwrittenTitle type="highlight">Dominant Coding Gene</HandwrittenTitle>
                            <p className="text-xl font-bold bg-indigo-100 w-max px-2 py-1 transform -rotate-2">
                                {analysis.dominantLanguage || "Unknown"}
                            </p>
                        </section>

                        <ScribbleDivider />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section className="space-y-4">
                                <HandwrittenTitle type="box">Developer Behavior</HandwrittenTitle>
                                <div className="space-y-4 mt-4">
                                    {analysis.traits.map((t, i) => (
                                        <div key={i}>
                                            <p className="text-xl font-bold font-patrick">{t.name}</p>
                                            <p className="text-base font-sans opacity-80">{t.explanation}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <HandwrittenTitle type="circle">Detected Mutations</HandwrittenTitle>
                                <div className="space-y-4 mt-4">
                                    {analysis.mutations.map((m, i) => (
                                        <div key={i} className="text-red-900">
                                            <p className="text-xl font-bold font-patrick">{m.name}</p>
                                            <p className="text-base font-sans opacity-80">{m.explanation}</p>
                                        </div>
                                    ))}
                                    {analysis.mutations.length === 0 && (
                                        <p className="opacity-80 font-sans italic">No mutations detected... yet.</p>
                                    )}
                                </div>
                            </section>
                        </div>

                    </NotebookLayout>
                </div>
            </div>
        </div>
    );
}
