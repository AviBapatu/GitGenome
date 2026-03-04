"use client";

import { motion } from "framer-motion";

import { Archetype } from "@/lib/analysis/archetypes/types";

interface ArchetypeRevealProps {
    archetype: Archetype;
    onComplete: () => void;
}

export function ArchetypeReveal({ archetype, onComplete }: ArchetypeRevealProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            onAnimationComplete={(definition) => {
                // Wait for the exit animation to finish before signalling complete
                if (definition === "exit" || (definition as any)?.opacity === 0) {
                    onComplete();
                }
            }}
        >
            <div className="text-center relative">
                <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: [0, 1, 0], y: [10, 0, -10], filter: ["blur(4px)", "blur(0px)", "blur(4px)"] }}
                    transition={{ duration: 2, times: [0, 0.5, 1] }}
                    className="text-emerald-500 font-mono tracking-[0.3em] text-sm uppercase mb-4"
                >
                    Analyzing Developer DNA
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: [0, 1, 0], y: [10, 0, -10], filter: ["blur(4px)", "blur(0px)", "blur(4px)"] }}
                    transition={{ duration: 2, delay: 1.5, times: [0, 0.5, 1] }}
                    className="text-emerald-500 font-mono tracking-[0.3em] text-sm uppercase mb-4 absolute top-0 w-full"
                >
                    Classification Detected
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, delay: 3, ease: "easeOut" }}
                    onAnimationComplete={() => {
                        // Let the title hang for 2 seconds, then trigger the unmount (exit animation)
                        setTimeout(onComplete, 2500);
                    }}
                    className="text-5xl md:text-7xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                >
                    {archetype.name}
                </motion.h1>

                {/* Scanning line effect */}
                <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 3, delay: 1, ease: "linear", repeat: 1 }}
                    className="absolute left-0 right-0 h-1 bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10 hidden md:block"
                    style={{ width: "150%", left: "-25%" }}
                />
            </div>
        </motion.div>
    );
}
