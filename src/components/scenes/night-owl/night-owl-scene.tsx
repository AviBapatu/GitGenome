"use client";

import { useEffect, useState } from "react";
import { DeveloperProfile } from "@/types/analysis";
import { motion, useMotionValue, Variants } from "framer-motion";
import { soundManager } from "@/components/sound/sound-manager";
import { OwlCreature } from "@/components/creatures/owl";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";
import { NightBackground } from "./night-background";
import { TreePerch } from "./tree-perch";

// Animation Variants for staggering notebook contents
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 3.5 }
    }
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function NightOwlScene({ analysis }: { analysis: DeveloperProfile }) {
    // Parallax motion tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMuted, setIsMuted] = useState(false); // Track sound state

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    // Load background ambient noises
    useEffect(() => {
        // We start the ambient loop. SoundManager will handle the Howl audio context
        soundManager.playAmbience("/assets/sounds/night_ambience_loop.mp3");

        return () => {
            soundManager.stopAmbience();
        };
    }, []);

    const toggleMute = () => {
        const isNowMuted = soundManager.toggleMute();
        setIsMuted(isNowMuted);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-screen bg-slate-900 overflow-y-auto overflow-x-hidden"
        >
            {/* Audio Toggle Button in top corner */}
            <button
                onClick={toggleMute}
                className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                title={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
            >
                {isMuted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            {/* Dynamic Parallax Starry Background */}
            <NightBackground mouseX={mouseX} mouseY={mouseY} />

            {/* Tree Perch Layer */}
            <div className="fixed bottom-0 right-0 md:right-10 z-10 pointer-events-auto">
                <TreePerch />
            </div>

            {/* Floating Creature Layer */}
            {/* The Owl is now positioned so its default state is 'perched' on the tree */}
            <div className="fixed bottom-[180px] right-[100px] md:bottom-[230px] md:right-[150px] z-20 pointer-events-auto">
                <OwlCreature />
            </div>

            {/* Cinematic Entrance for the Notebook Report Overlay */}
            <motion.div
                initial={{ y: 200, rotate: -2, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                // Reduced top padding dramatically (from pt-64/32) to shift notebook higher, giving owl more breathing space
                className="relative z-30 pt-16 px-4 pb-20 pointer-events-none md:w-3/5"
            >
                <div className="pointer-events-auto">
                    <NotebookLayout subject={analysis.archetype}>

                        {/* Staggered Content Container */}
                        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">

                            <motion.section variants={childVariants} className="space-y-4 relative">
                                {/* Tiny Owl Sketch Doodle inside Notebook */}
                                <div className="absolute -top-6 -right-6 md:right-12 opacity-40 -rotate-12 pointer-events-none">
                                    <svg width="40" height="40" viewBox="0 0 100 100" stroke="#334155" fill="none" strokeWidth="3" strokeLinecap="round">
                                        <ellipse cx="50" cy="55" rx="30" ry="35" />
                                        <circle cx="50" cy="35" r="22" />
                                        <circle cx="40" cy="35" r="5" fill="#334155" />
                                        <circle cx="60" cy="35" r="5" fill="#334155" />
                                        <path d="M 45 42 L 55 42 L 50 48 Z" fill="#334155" />
                                    </svg>
                                </div>
                                <HandwrittenTitle type="underline">Classification: Night Owl</HandwrittenTitle>
                                <p className="text-xl">
                                    This developer does their best work when the world is asleep. Commits frequently occur in the darkest hours.
                                    They process code via moonlight.
                                </p>
                            </motion.section>

                            <motion.div variants={childVariants}><ScribbleDivider /></motion.div>

                            <motion.section variants={childVariants} className="space-y-6">
                                <HandwrittenTitle type="highlight">Dominant Coding Gene</HandwrittenTitle>
                                <div className="flex items-center space-x-4 relative">
                                    <p className="text-2xl font-bold bg-indigo-100/50 outline outline-2 outline-indigo-300 outline-offset-4 w-max px-3 py-1 transform -rotate-2">
                                        {analysis.dominantLanguage || "Unknown"}
                                    </p>

                                    {/* Scribble Arrow Doodle pointing to the Gene */}
                                    <div className="opacity-60 text-slate-500 font-patrick text-sm whitespace-nowrap ml-4 flex items-center mt-2">
                                        <svg width="60" height="30" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="mr-2">
                                            <path d="M 90 25 Q 60 10, 10 25" />
                                            <path d="M 25 10 L 10 25 L 20 40" />
                                        </svg>
                                        Highly Expressed
                                    </div>
                                </div>
                            </motion.section>

                            <motion.div variants={childVariants}><ScribbleDivider /></motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.section variants={childVariants} className="space-y-6">
                                    <div className="relative">
                                        {/* DNA small sketch doodle */}
                                        <div className="absolute -top-3 -left-10 opacity-30 pointer-events-none rotate-12">
                                            <svg width="24" height="40" viewBox="0 0 50 100" stroke="#334155" strokeWidth="3" fill="none">
                                                <path d="M 10 10 Q 50 50, 10 90 M 40 10 Q 0 50, 40 90" />
                                                <line x1="15" y1="20" x2="35" y2="20" />
                                                <line x1="20" y1="35" x2="30" y2="35" />
                                                <line x1="25" y1="50" x2="25" y2="50" />
                                                <line x1="20" y1="65" x2="30" y2="65" />
                                                <line x1="15" y1="80" x2="35" y2="80" />
                                            </svg>
                                        </div>
                                        <HandwrittenTitle type="box">Behavioral Notes</HandwrittenTitle>
                                    </div>
                                    <div className="space-y-4 mt-4">
                                        {analysis.traits.map((t, i) => (
                                            <div key={i}>
                                                <ul className="list-disc pl-5">
                                                    <li className="text-xl font-bold font-patrick">{t.name}</li>
                                                </ul>
                                                <p className="text-base font-sans opacity-80 mt-1">{t.explanation}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>

                                <motion.section variants={childVariants} className="space-y-6">
                                    <HandwrittenTitle type="circle">Detected Mutations</HandwrittenTitle>
                                    <div className="space-y-4 mt-4">
                                        {analysis.mutations.map((m, i) => (
                                            <div key={i} className="text-red-900">
                                                <ul className="list-disc pl-5 text-red-500">
                                                    <li className="text-xl font-bold font-patrick text-red-900">{m.name}</li>
                                                </ul>
                                                <p className="text-base font-sans opacity-80 mt-1">{m.explanation}</p>
                                            </div>
                                        ))}
                                        {analysis.mutations.length === 0 && (
                                            <p className="opacity-80 font-sans italic">Specimen shows remarkable resilience to standard mutations.</p>
                                        )}
                                    </div>
                                </motion.section>
                            </div>

                        </motion.div>
                    </NotebookLayout>
                </div>
            </motion.div>
        </div>
    );
}
