"use client";

import { DeveloperProfile } from "@/types/analysis";
import { sceneMap } from "@/components/scenes/scene-map";
import { MuteToggle } from "@/components/sound/mute-toggle";
import { ArchetypeReveal } from "@/components/experience/archetype-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GenomeExperience({ analysis }: { analysis: DeveloperProfile }) {
    const [revealComplete, setRevealComplete] = useState(false);

    const archetypeId = analysis.archetype.id;

    // Scene orchestrator
    const renderScene = () => {
        const Scene = sceneMap[archetypeId] || sceneMap["night_owl"];
        return <Scene analysis={analysis} />;
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {!revealComplete && (
                    <ArchetypeReveal
                        key="reveal"
                        archetype={analysis.archetype}
                        onComplete={() => setRevealComplete(true)}
                    />
                )}
            </AnimatePresence>

            {/*
             * When the archetype changes (e.g. via DevSwitcher), the key on this
             * motion.div changes → React unmounts the old scene (firing cleanup
             * effects) then mounts the new one → no sound/timer leaks.
             *
             * Transition: 0.6s fade-out → 0.6s fade-in.
             */}
            <AnimatePresence mode="wait">
                {revealComplete && (
                    <motion.div
                        key={`experience-${archetypeId}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="fixed inset-0 overflow-hidden bg-slate-900"
                    >
                        {renderScene()}
                        <MuteToggle />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
