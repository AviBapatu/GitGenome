"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { soundManager } from "@/components/sound/sound-manager";
import { OwlCreature } from "@/components/creatures/owl";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { NightBackground } from "./night-background";
import { TreePerch } from "./tree-perch";
import type { SceneProps } from "@/components/scenes/scene-map";

export function NightOwlScene({ analysis, user, repos, username }: SceneProps) {
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
            className="relative w-full h-screen bg-slate-900 overflow-y-auto overflow-x-hidden"
        >
            {/* Audio Toggle Button in bottom right corner */}
            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
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
                className="relative z-40 pt-16 px-4 pb-20 pointer-events-none md:w-3/5"
            >
                <div className="pointer-events-auto">
                    <NotebookLayout analysis={analysis} user={user} repos={repos} username={username} />
                </div>
            </motion.div>
        </div>
    );
}
