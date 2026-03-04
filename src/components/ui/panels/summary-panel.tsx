"use client";

import { motion, Variants } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";
import { getArchetypeEmoji } from "@/lib/utils/emoji";

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function SummaryPanel({ analysis }: { analysis: DeveloperProfile }) {
    return (
        <motion.div
            key="summary-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Classification Section */}
            <motion.section variants={childVariants} className="space-y-4 relative">
                {/* Tiny Sketch Doodle */}
                <div className="absolute -top-6 -right-6 md:right-12 opacity-40 -rotate-12 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 100 100" stroke="#334155" fill="none" strokeWidth="3" strokeLinecap="round">
                        <ellipse cx="50" cy="55" rx="30" ry="35" />
                        <circle cx="50" cy="35" r="22" />
                        <circle cx="40" cy="35" r="5" fill="#334155" />
                        <circle cx="60" cy="35" r="5" fill="#334155" />
                        <path d="M 45 42 L 55 42 L 50 48 Z" fill="#334155" />
                    </svg>
                </div>
                <HandwrittenTitle type="underline">Classification</HandwrittenTitle>
                <div className="space-y-2">
                    <p className="text-3xl font-bold font-patrick">
                        {analysis.archetype.name} {getArchetypeEmoji(analysis.archetype.name)}
                    </p>
                    <p className="text-lg text-slate-700">
                        {analysis.archetype.description}
                    </p>
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Confidence Section */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="highlight">Analysis Confidence</HandwrittenTitle>
                <div className="flex items-center space-x-4">
                    <div className="relative w-full max-w-xs">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-patrick font-bold">Certainty</span>
                            <span className="text-2xl font-bold font-patrick text-indigo-700">
                                {analysis.confidence}%
                            </span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${analysis.confidence}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Dominant Language Section */}
            <motion.section variants={childVariants} className="space-y-4 relative">
                <HandwrittenTitle type="box">Dominant Coding Gene</HandwrittenTitle>
                <div className="flex items-center space-x-4 mt-4">
                    <p className="text-3xl font-bold bg-indigo-100/50 outline outline-2 outline-indigo-300 outline-offset-4 px-4 py-2 transform -rotate-2 font-patrick">
                        {analysis.dominantLanguage || "Unknown"}
                    </p>
                    <div className="opacity-60 text-slate-500 font-patrick text-sm whitespace-nowrap ml-4 flex items-center mt-2">
                        <svg width="60" height="30" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="mr-2">
                            <path d="M 90 25 Q 60 10, 10 25" />
                            <path d="M 25 10 L 10 25 L 20 40" />
                        </svg>
                        Highly Expressed
                    </div>
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Quick Traits */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="circle">Key Traits</HandwrittenTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {analysis.traits.length > 0 ? (
                        analysis.traits.slice(0, 4).map((trait, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.4 }}
                                className="bg-slate-50 p-3 rounded-sm border-l-4 border-indigo-400"
                            >
                                <p className="font-bold font-patrick text-slate-800">{trait.name}</p>
                                <p className="text-xs font-sans text-slate-600 mt-1">{trait.explanation}</p>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-50 p-3 rounded-sm border-l-4 border-slate-300 col-span-1 md:col-span-2"
                        >
                            <p className="font-bold font-patrick text-slate-500 italic">No specific traits uncovered yet.</p>
                            <p className="text-xs font-sans text-slate-400 mt-1">
                                The genome analyzer needs more diverse activity to confidently map specific key traits.
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.section>
        </motion.div>
    );
}
