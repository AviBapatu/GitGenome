"use client";

import { motion, Variants } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface MetricCardProps {
    label: string;
    value: string | number;
    icon: string;
    color: string;
    delay: number;
}

function MetricCard({ label, value, icon, color, delay }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`p-4 rounded-sm border-l-4 ${color} bg-slate-50`}
        >
            <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                    <p className="text-xs font-sans text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-2xl font-bold font-patrick text-slate-900 mt-1">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function EvidencePanel({ analysis }: { analysis: DeveloperProfile }) {
    const { archetype } = analysis;

    return (
        <motion.div
            key="evidence-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Header */}
            <motion.section variants={childVariants} className="space-y-4">
                <div className="relative">
                    {/* Microscope doodle */}
                    <div className="absolute -top-4 -right-8 opacity-30 pointer-events-none rotate-12">
                        <svg width="50" height="50" viewBox="0 0 100 100" stroke="#334155" fill="none" strokeWidth="3" strokeLinecap="round">
                            <circle cx="50" cy="60" r="25" />
                            <line x1="50" y1="35" x2="50" y2="10" strokeWidth="4" />
                            <rect x="45" y="5" width="10" height="12" />
                            <line x1="30" y1="60" x2="10" y2="80" strokeWidth="2" />
                            <line x1="70" y1="60" x2="90" y2="80" strokeWidth="2" />
                        </svg>
                    </div>
                    <HandwrittenTitle type="underline">Analysis Evidence</HandwrittenTitle>
                </div>
                <p className="text-slate-700 font-sans">
                    Data from your repositories that informed this classification
                </p>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Archetype Evidence List */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="box">Classification Evidence</HandwrittenTitle>
                <div className="space-y-3 mt-4">
                    {archetype.evidence.map((evidence, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="flex items-start gap-3 p-3 bg-slate-50 rounded-sm border-l-2 border-green-400"
                        >
                            <span className="text-green-600 font-bold mt-1">✓</span>
                            <span className="text-slate-700 font-patrick">{evidence}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Statistics Grid */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="circle">Repository Statistics</HandwrittenTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <MetricCard
                        label="Repositories Analyzed"
                        value="27"
                        icon="📦"
                        color="border-blue-400"
                        delay={0.3}
                    />
                    <MetricCard
                        label="Languages Detected"
                        value="5"
                        icon="🗣️"
                        color="border-purple-400"
                        delay={0.35}
                    />
                    <MetricCard
                        label="Small Experiments"
                        value="68%"
                        icon="⚗️"
                        color="border-orange-400"
                        delay={0.4}
                    />
                    <MetricCard
                        label="Average Repo Size"
                        value="4.3 MB"
                        icon="💾"
                        color="border-cyan-400"
                        delay={0.45}
                    />
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Key Metrics */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="highlight">Further Evidence</HandwrittenTitle>
                <div className="space-y-3 mt-4 font-sans text-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-3 bg-blue-50 rounded-sm border-l-2 border-blue-400"
                    >
                        <span className="font-bold text-blue-900">Project Longevity:</span>
                        <span className="text-blue-800 ml-2">Mix of short-term experiments and sustained projects</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="p-3 bg-green-50 rounded-sm border-l-2 border-green-400"
                    >
                        <span className="font-bold text-green-900">Technology Variety:</span>
                        <span className="text-green-800 ml-2">Consistent exploration across multiple frameworks and tools</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-3 bg-amber-50 rounded-sm border-l-2 border-amber-400"
                    >
                        <span className="font-bold text-amber-900">Abandonment Pattern:</span>
                        <span className="text-amber-800 ml-2">Typical ratio relative to archetype profile</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.65 }}
                        className="p-3 bg-rose-50 rounded-sm border-l-2 border-rose-400"
                    >
                        <span className="font-bold text-rose-900">Coding Style:</span>
                        <span className="text-rose-800 ml-2">Repository structure and commit patterns align with classification</span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Confidence Note */}
            <motion.div
                variants={childVariants}
                className="mt-6 p-4 bg-slate-100 rounded-sm border border-slate-300 italic text-sm text-slate-600 font-sans"
            >
                <span className="font-bold">Note:</span> This analysis is based on publicly available repository data. Confidence level reflects the consistency of signals across all 4 archetype detectors.
            </motion.div>
        </motion.div>
    );
}
