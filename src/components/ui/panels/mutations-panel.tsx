"use client";

import { motion, Variants } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function MutationsPanel({ analysis }: { analysis: DeveloperProfile }) {
    const { mutations } = analysis;

    return (
        <motion.div
            key="mutations-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Header */}
            <motion.section variants={childVariants} className="space-y-4">
                <div className="relative">
                    {/* Biohazard doodle */}
                    <div className="absolute -top-4 -right-8 opacity-30 pointer-events-none rotate-12">
                        <svg width="50" height="50" viewBox="0 0 100 100" stroke="#334155" fill="none" strokeWidth="2.5" strokeLinecap="round">
                            <circle cx="50" cy="50" r="40" />
                            <circle cx="50" cy="35" r="12" fill="#334155" />
                            <circle cx="35" cy="65" r="12" fill="#334155" />
                            <circle cx="65" cy="65" r="12" fill="#334155" />
                            <circle cx="50" cy="50" r="8" fill="#334155" />
                            <path d="M 35 35 L 65 65 M 35 65 L 65 35" strokeWidth="2" />
                        </svg>
                    </div>
                    <HandwrittenTitle type="underline">Detected Mutations</HandwrittenTitle>
                </div>
                <p className="text-slate-700 font-sans">
                    Developer quirks & coding habits that make you unique
                </p>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Mutations List */}
            {mutations.length > 0 ? (
                <motion.section variants={childVariants} className="space-y-4">
                    <div className="space-y-4">
                        {mutations.map((mutation, i) => (
                            <MutationCard
                                key={i}
                                name={mutation.name}
                                explanation={mutation.explanation}
                                delay={0.2 + i * 0.1}
                            />
                        ))}
                    </div>
                </motion.section>
            ) : (
                <motion.section variants={childVariants} className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-sm border-2 border-dashed border-amber-300 text-center">
                        <p className="text-lg font-patrick text-amber-900 mb-2">✨</p>
                        <p className="text-slate-700 font-patrick">
                            Specimen shows remarkable resilience to standard mutations.
                        </p>
                        <p className="text-sm text-slate-500 font-sans mt-3">
                            Your coding patterns are exceptionally clean and well-balanced.
                        </p>
                    </div>
                </motion.section>
            )}

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Shareability Section */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="circle">Share Your Mutations</HandwrittenTitle>
                <div className="mt-4 p-4 bg-slate-50 rounded-sm border border-slate-300">
                    <p className="text-sm font-sans text-slate-600 mb-4">
                        These quirky traits make great conversation starters. Copy your mutations or create a shareable report:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <button className="px-4 py-2 bg-slate-800 text-white font-patrick text-sm rounded-sm hover:bg-slate-900 transition-colors">
                            📋 Copy List
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white font-patrick text-sm rounded-sm hover:bg-blue-700 transition-colors">
                            🔗 Share Link
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white font-patrick text-sm rounded-sm hover:bg-indigo-700 transition-colors">
                            📸 Screenshot
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Fun Note */}
            <motion.div
                variants={childVariants}
                className="mt-6 p-4 bg-red-50 rounded-sm border border-red-300 italic text-sm text-red-700 font-sans"
            >
                <span className="font-bold">☢ Mutation Notice:</span> These are humorous observations based on repository patterns. They're meant to be fun, not prescriptive!
            </motion.div>
        </motion.div>
    );
}

interface MutationCardProps {
    name: string;
    explanation: string;
    delay: number;
}

function MutationCard({ name, explanation, delay }: MutationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, type: "spring", stiffness: 100 }}
            className="relative p-4 rounded-sm border-l-4 border-red-500 bg-red-50 hover:bg-red-100/50 transition-colors"
        >
            {/* Mutation glyph */}
            <div className="absolute -left-3 -top-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ☢
            </div>

            <div className="ml-2">
                <h4 className="font-patrick font-bold text-red-900 text-lg">
                    {name}
                </h4>
                <p className="text-sm font-sans text-red-800 mt-2">
                    {explanation}
                </p>
            </div>

            {/* Hover effect - subtle glow */}
            <motion.div
                className="absolute inset-0 rounded-sm border border-red-400/50 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}
