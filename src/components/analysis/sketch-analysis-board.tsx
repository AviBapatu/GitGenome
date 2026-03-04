"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PipelineStep {
    label: string;
    done: boolean;
}

interface SketchAnalysisBoardProps {
    steps: PipelineStep[];
}

const FUNNY_MESSAGES = [
    "Analyzing commit chaos...",
    "Counting console.log statements...",
    "Measuring caffeine levels...",
    "Scanning late night commits...",
    "Checking for stackoverflow copy-pastes...",
    "Decrypting variable names...",
    "Looking for TODOs that will never be done...",
    "Judging indentation choices...",
];

export function SketchAnalysisBoard({ steps }: SketchAnalysisBoardProps) {
    const [messageIndex, setMessageIndex] = useState(0);

    // Rotate messages every 2.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Calculate progress for the sketchy progress bar (total steps / completed steps)
    const completedStepsCount = steps.filter((s) => s.done).length;
    const totalStepsCount = steps.length;

    // Convert to a 10-block bar, e.g. "████░░░░░░"
    const totalBlocks = 10;
    const filledBlocks = Math.round((completedStepsCount / totalStepsCount) * totalBlocks);

    // We'll build the sketchy bar using unicode blocks and slight rotation for a hand-drawn feel
    const blockCharFilled = "█";
    const blockCharEmpty = "░";

    return (
        <div className="bg-[#fffdf8] p-8 md:p-12 w-full max-w-lg relative"
            style={{
                boxShadow: '2px 4px 15px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.02)',
                backgroundImage: 'linear-gradient(transparent 95%, #e2e8f0 100%)',
                backgroundSize: '100% 30px',
                border: '2px solid #334155',
                borderRadius: '2px 10px 3px 15px / 12px 3px 15px 5px'
            }}
        >
            {/* Taped corners */}
            <div className="absolute -top-3 -left-4 w-12 h-6 bg-red-200/50 transform -rotate-45" />
            <div className="absolute -top-3 -right-4 w-12 h-6 bg-yellow-200/50 transform rotate-45" />

            <div className="text-center mb-8 relative">
                <h2 className="text-3xl font-caveat font-bold text-slate-800 transform -rotate-2">
                    Analyzing Developer...
                </h2>
                <div className="absolute -right-6 top-0 hidden sm:block">
                    <motion.svg
                        width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#64748b" strokeWidth="3"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
                        <path d="M50 20 L50 40 M50 60 L50 80 M20 50 L40 50 M60 50 L80 50" />
                    </motion.svg>
                </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4 mb-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 font-patrick text-xl"
                    >
                        <div className="mt-1 flex-shrink-0">
                            {step.done ? (
                                <span className="text-emerald-600 font-bold">✓</span>
                            ) : (
                                <motion.span
                                    className="text-slate-400 inline-block origin-center"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                >
                                    ↻
                                </motion.span>
                            )}
                        </div>
                        <span className={step.done ? "text-slate-800 line-through decoration-slate-400" : "text-slate-600"}>
                            {step.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Sketchy Progress Bar */}
            <div className="mb-6">
                <div className="font-mono text-xl text-slate-700 tracking-[0.2em] transform rotate-1 text-center bg-slate-100/50 p-2 border border-slate-300 rounded" style={{ borderRadius: '10px 2px 8px 3px' }}>
                    {Array.from({ length: totalBlocks }).map((_, i) => (
                        <span key={i} className={i < filledBlocks ? "text-slate-800" : "text-slate-300 opacity-50"}>
                            {i < filledBlocks ? blockCharFilled : blockCharEmpty}
                        </span>
                    ))}
                </div>
            </div>

            {/* Funny Message Rotator */}
            <div className="h-8 relative overflow-hidden text-center text-slate-500 font-caveat text-xl">
                <AnimatePresence mode="popLayout">
                    <motion.p
                        key={messageIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {FUNNY_MESSAGES[messageIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Bottom Doodle */}
            <div className="absolute bottom-4 right-4 opacity-30 transform rotate-12">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
                    <path d="M20 80 Q 50 20, 80 80 Q 50 60, 20 80 Z" />
                    <circle cx="40" cy="50" r="5" fill="currentColor" />
                    <circle cx="60" cy="50" r="5" fill="currentColor" />
                </svg>
            </div>

            <div className="absolute bottom-6 left-6 opacity-40 transform -rotate-12">
                <motion.svg
                    width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-slate-700"
                >
                    <path d="M10 50 L30 30 L50 50 L70 30 L90 50" />
                    <path d="M10 70 L30 50 L50 70 L70 50 L90 70" />
                </motion.svg>
            </div>
        </div>
    );
}
