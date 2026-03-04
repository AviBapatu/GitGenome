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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf8f5] text-slate-800"
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
            {/* Paper grid background */}
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

            <div className="text-center relative z-10 w-full px-4 flex flex-col items-center">
                {/* Handwritten sticky note / stamp effect for classification */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-8 p-3 border-4 border-red-600 rounded-lg text-red-600 font-patrick text-2xl uppercase tracking-widest bg-red-50/50 transform -rotate-2"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                >
                    Classification Detected
                </motion.div>

                {/* Main Archetype Name */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    onAnimationComplete={() => {
                        // Let the title hang for 2.5 seconds, then trigger the unmount (exit animation)
                        setTimeout(onComplete, 2500);
                    }}
                    className="text-6xl md:text-8xl font-bold font-caveat text-slate-800 transform rotate-1 underline decoration-wavy decoration-slate-400"
                >
                    {archetype.name}
                </motion.h1>

                {/* Small drawn arrows pointing to it */}
                <motion.svg
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.6, pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    width="120" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className="absolute -right-4 md:right-1/4 top-0 text-slate-600 transform scale-75 md:scale-100"
                >
                    <path d="M10 10 Q 50 20, 80 80" />
                    <path d="M60 70 L80 80 L80 60" />
                </motion.svg>

                <motion.svg
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.6, pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    width="120" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className="absolute -left-4 md:left-1/4 bottom-0 text-slate-600 transform scale-75 md:scale-100"
                >
                    <path d="M90 90 Q 50 80, 20 20" />
                    <path d="M40 30 L20 20 L20 40" />
                </motion.svg>
            </div>
        </motion.div>
    );
}
