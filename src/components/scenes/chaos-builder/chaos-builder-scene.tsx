"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { soundManager } from "@/components/sound/sound-manager";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { GlitchBackground } from "./glitch-background";
import { GremlinCreature } from "@/components/creatures/gremlin";
import { ErrorParticles } from "./error-particles";
import { ChaosDesk } from "./chaos-desk";
import { GlitchEffects } from "./glitch-effects";

export function ChaosBuilderScene({ analysis }: { analysis: DeveloperProfile }) {
    const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });
    const [isMuted, setIsMuted] = useState(false);
    const gremlinWrapperRef = useRef<HTMLDivElement>(null);
    const [showEntrance, setShowEntrance] = useState(true);

    // ── Sound lifecycle ────────────────────────────────────────────────────────
    useEffect(() => {
        // Play ambient hacker lab sound
        soundManager.playAmbience("/assets/sounds/chaos_ambience_loop.mp3");

        return () => {
            soundManager.stopAmbience();
        };
    }, []);

    // ── Entrance animation sequence ────────────────────────────────────────────
    useEffect(() => {
        let isMounted = true;

        const entranceSequence = async () => {
            // Lights flicker
            await new Promise(res => setTimeout(res, 500));

            // Monitors boot
            await new Promise(res => setTimeout(res, 1000));

            // Error messages appear (handled by background component)
            await new Promise(res => setTimeout(res, 500));

            // Gremlin appears - already animated in component
            if (isMounted) {
                // Play entrance effect sound
                soundManager.playEffect("/assets/sounds/glitch_boot.mp3", 0.4);
            }

            // Hide entrance screen
            await new Promise(res => setTimeout(res, 2000));
            if (isMounted) {
                setShowEntrance(false);
            }
        };

        entranceSequence();

        return () => {
            isMounted = false;
        };
    }, []);

    // ── Mouse tracking for potential parallax ────────────────────────────────
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const nx = e.clientX / window.innerWidth;
        const ny = e.clientY / window.innerHeight;
        setMouseNorm({ x: nx, y: ny });
    }, []);

    // ── Mute toggle ────────────────────────────────────────────────────────────
    const toggleMute = () => {
        const isNowMuted = soundManager.toggleMute();
        setIsMuted(isNowMuted);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-screen bg-[#0f0f1a]"
        >
            {/* Background Layer - Fixed fullscreen */}
            <div className="fixed inset-0 z-0">
                <GlitchEffects>
                    {/* Layer 0: Hacker Lab Atmosphere */}
                    <GlitchBackground mouseX={mouseNorm.x} mouseY={mouseNorm.y} />

                    {/* Layer 1: Desk with broken props */}
                    <ChaosDesk />
                </GlitchEffects>
            </div>

            {/* Gremlin creature */}
            <motion.div
                ref={gremlinWrapperRef}
                className="fixed z-20 pointer-events-auto bottom-[160px] right-[280px] md:bottom-[200px] md:right-[380px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.8, ease: "backOut" }}
            >
                <GremlinCreature />
            </motion.div>

            {/* Error Particles */}
            <ErrorParticles />

            {/* Audio Toggle Button */}
            <button
                onClick={toggleMute}
                className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-[#1a1a2e]/50 backdrop-blur-md border border-[#ff3366] flex items-center justify-center text-[#ff3366] hover:text-white hover:bg-[#ff3366]/20 transition-colors"
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

            {/* Notebook Report - scrollable content layer */}
            <motion.div
                initial={{ y: 200, rotate: -2, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-40 pt-16 px-4 pb-20 pointer-events-none md:w-3/5"
            >
                <div className="pointer-events-auto">
                    <NotebookLayout analysis={analysis} />
                </div>
            </motion.div>

            {/* Entrance overlay */}
            <motion.div
                animate={{ opacity: showEntrance ? 1 : 0, pointerEvents: showEntrance ? "auto" : "none" }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-30 bg-[#0f0f1a] flex items-center justify-center"
            >
                <motion.div
                    animate={{
                        textShadow: [
                            "0 0 10px rgba(255,51,102,0.5)",
                            "0 0 20px rgba(255,51,102,0.8)",
                            "0 0 10px rgba(255,51,102,0.5)",
                            "0 0 30px rgba(0,234,255,0.6)",
                            "0 0 10px rgba(255,51,102,0.5)"
                        ]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                    className="font-mono text-[#ff3366] text-2xl font-bold"
                >
                    SYSTEM BOOT...
                </motion.div>
            </motion.div>
        </div>
    );
}
