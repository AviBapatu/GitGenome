"use client";

import { DeveloperProfile } from "@/types/analysis";
import { sceneMap } from "@/components/scenes/scene-map";
import { MuteToggle } from "@/components/sound/mute-toggle";
import { ArchetypeReveal } from "@/components/experience/archetype-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GenomeExperience({ analysis }: { analysis: DeveloperProfile }) {
    const [revealComplete, setRevealComplete] = useState(false);

    // Scene orchestrator
    const renderScene = () => {
        const Scene = sceneMap[analysis.archetype.id] || sceneMap["night_owl"];
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
         We don't purely condition the motion.div wrapper on revealComplete being true yet,
         we want to utilize AnimatePresence for the entire Scene fading in as the reveal fades out
      */}
            <AnimatePresence mode="wait">
                {revealComplete && (
                    <motion.div
                        key="experience"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
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
