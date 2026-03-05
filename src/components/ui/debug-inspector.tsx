"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { GithubRepo } from "@/types/github";
import { extractMetrics } from "@/lib/analysis/metricsEngine";
import { calculateGenome } from "@/lib/analysis/genomeEngine";
import { detectNightOwl, detectFrameworkCollector, detectChaosBuilder, detectBuilderBeaver } from "@/lib/analysis/archetypes/detectors/index";

interface DebugInspectorProps {
    repos: GithubRepo[] | null;
    profile: DeveloperProfile | null;
}

export function DebugInspector({ repos, profile }: DebugInspectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const debugData = useMemo(() => {
        if (!repos || !profile) return null;
        const metrics = extractMetrics(repos);
        const genome = calculateGenome(metrics);
        return {
            metrics,
            genome,
            scores: {
                "Night Owl": detectNightOwl(metrics, genome).score,
                "Framework Collector": detectFrameworkCollector(metrics, genome).score,
                "Chaos Builder": detectChaosBuilder(metrics, genome).score,
                "Builder Beaver": detectBuilderBeaver(metrics, genome).score,
            }
        };
    }, [repos, profile]);

    if (!debugData || !profile) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-[9999] bg-slate-800 text-white font-patrick px-4 py-2 rounded-lg shadow-lg hover:bg-slate-700 transition-colors transform hover:-translate-y-1 hover:rotate-1"
                style={{ borderRadius: '15px 5px 25px 10px / 10px 25px 5px 15px' }}
            >
                [ Debug Inspector ]
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-0 right-0 w-80 h-full bg-[#faf8f5] shadow-[-10px_0_20px_rgba(0,0,0,0.1)] z-[10000] border-l-4 border-slate-300 font-patrick overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold font-caveat text-red-600 underline decoration-wavy">Inspector</h2>
                                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-red-500 font-bold text-xl">X</button>
                            </div>

                            <div className="space-y-6 text-sm text-slate-700">
                                <section>
                                    <h3 className="font-bold text-lg mb-2 text-indigo-700">Raw Metrics</h3>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>Repo Count:</div><div className="font-bold text-right">{debugData.metrics.repoCount}</div>
                                        <div>Lang Count:</div><div className="font-bold text-right">{debugData.metrics.languageCount}</div>
                                        <div>Lang Diversity:</div><div className="font-bold text-right">{debugData.metrics.languageDiversity.toFixed(2)}</div>
                                        <div>Small Ratio:</div><div className="font-bold text-right">{(debugData.metrics.smallRepoRatio * 100).toFixed(0)}%</div>
                                        <div>Repo Creation:</div><div className="font-bold text-right">{debugData.metrics.repoCreationRate.toFixed(1)}/yr</div>
                                        <div>Avg Repo Size:</div><div className="font-bold text-right">{(debugData.metrics.avgRepoSize / 1024).toFixed(0)}KB</div>
                                        <div>Longevity:</div><div className="font-bold text-right">{debugData.metrics.avgProjectLongevity.toFixed(0)}d</div>
                                        <div>Commit Freq:</div><div className="font-bold text-right">{debugData.metrics.commitFrequency.toFixed(1)}/mo</div>
                                        <div>Night Ratio:</div><div className="font-bold text-right">{(debugData.metrics.nightCommitRatio * 100).toFixed(0)}%</div>
                                        <div>Concentration:</div><div className="font-bold text-right">{(debugData.metrics.activityConcentration * 100).toFixed(0)}%</div>
                                    </div>
                                </section>

                                <div className="border-t-2 border-slate-200 border-dashed" />

                                <section>
                                    <h3 className="font-bold text-lg mb-2 text-emerald-700">Genome Scores</h3>
                                    <div className="space-y-1">
                                        <div className="flex justify-between"><span>Exploration</span><span className="font-bold">{debugData.genome.exploration}</span></div>
                                        <div className="flex justify-between"><span>Experimentation</span><span className="font-bold">{debugData.genome.experimentation}</span></div>
                                        <div className="flex justify-between"><span>Discipline</span><span className="font-bold">{debugData.genome.discipline}</span></div>
                                        <div className="flex justify-between"><span>Consistency</span><span className="font-bold">{debugData.genome.consistency}</span></div>
                                    </div>
                                </section>

                                <div className="border-t-2 border-slate-200 border-dashed" />

                                <section>
                                    <h3 className="font-bold text-lg mb-2 text-rose-700">Archetype Scores</h3>
                                    <div className="space-y-1">
                                        {Object.entries(debugData.scores).map(([name, score]) => (
                                            <div key={name} className="flex justify-between">
                                                <span className={profile.archetype.name === name ? "font-bold underline text-rose-800" : ""}>{name}</span>
                                                <span className="font-bold">{score}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 opacity-80 text-xs italic">
                                        Confidence: {(profile.confidence * 100).toFixed(1)}%
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
