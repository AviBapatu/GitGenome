"use client";

import { motion, Variants } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface GenomeBarProps {
    label: string;
    value: number;
    color: string;
    delay: number;
}

function GenomeBar({ label, value, color, delay }: GenomeBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className="space-y-2"
        >
            <div className="flex justify-between items-baseline gap-4">
                <span className="font-patrick font-bold text-slate-700 min-w-[140px]">
                    {label}
                </span>
                <span className="font-patrick text-2xl font-bold text-slate-900 min-w-[50px] text-right">
                    {value}
                </span>
            </div>
            <div className="h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300 relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                    className={`h-full ${color} rounded-full`}
                    style={{
                        boxShadow: `inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.1)`
                    }}
                />
                {/* Tick marks */}
                {[25, 50, 75].map(tick => (
                    <div
                        key={tick}
                        className="absolute top-0 bottom-0 w-px bg-slate-300 opacity-40"
                        style={{ left: `${tick}%` }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function GenomePanel({ analysis }: { analysis: DeveloperProfile }) {
    const { genome } = analysis;

    const dimensions = [
        { label: "Exploration", value: genome.exploration, color: "bg-gradient-to-r from-amber-400 to-orange-500" },
        { label: "Experimentation", value: genome.experimentation, color: "bg-gradient-to-r from-pink-400 to-rose-500" },
        { label: "Discipline", value: genome.discipline, color: "bg-gradient-to-r from-blue-400 to-indigo-500" },
        { label: "Consistency", value: genome.consistency, color: "bg-gradient-to-r from-green-400 to-emerald-500" },
    ];

    return (
        <motion.div
            key="genome-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Header */}
            <motion.section variants={childVariants} className="space-y-4">
                <div className="relative">
                    {/* DNA doodle */}
                    <div className="absolute -top-4 -right-8 opacity-30 pointer-events-none rotate-12">
                        <svg width="50" height="60" viewBox="0 0 50 100" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round">
                            <path d="M 10 10 Q 50 50, 10 90" />
                            <path d="M 40 10 Q 0 50, 40 90" />
                            <line x1="15" y1="20" x2="35" y2="20" strokeWidth="2" />
                            <line x1="18" y1="35" x2="32" y2="35" strokeWidth="2" />
                            <line x1="20" y1="50" x2="30" y2="50" strokeWidth="2" />
                            <line x1="18" y1="65" x2="32" y2="65" strokeWidth="2" />
                            <line x1="15" y1="80" x2="35" y2="80" strokeWidth="2" />
                        </svg>
                    </div>
                    <HandwrittenTitle type="underline">Behavioral Dimensions</HandwrittenTitle>
                </div>
                <p className="text-slate-700 font-sans">
                    Your developer genome mapped across four behavioral axes (0-100 scale)
                </p>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Genome Bars */}
            <motion.section
                variants={childVariants}
                className="space-y-8 mt-6"
            >
                {dimensions.map((dim, i) => (
                    <GenomeBar
                        key={dim.label}
                        label={dim.label}
                        value={dim.value}
                        color={dim.color}
                        delay={0.2 + i * 0.15}
                    />
                ))}
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* Interpretation */}
            <motion.section variants={childVariants} className="space-y-4 bg-slate-50 p-6 rounded-sm border-l-4 border-blue-400">
                <HandwrittenTitle type="circle">What This Means</HandwrittenTitle>
                <div className="space-y-3 mt-4 font-sans text-sm text-slate-700">
                    <div className="flex gap-4">
                        <span className="font-patrick font-bold text-amber-700">🔍 Exploration:</span>
                        <span>How much you explore different technologies and languages</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-patrick font-bold text-pink-700">⚡ Experimentation:</span>
                        <span>How often you try new ideas and create experimental projects</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-patrick font-bold text-blue-700">📋 Discipline:</span>
                        <span>How structured and long-term your projects tend to be</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-patrick font-bold text-green-700">📊 Consistency:</span>
                        <span>How steady and regular your development activity is</span>
                    </div>
                </div>
            </motion.section>

            {/* Balance Overview */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="box">Balance Profile</HandwrittenTitle>
                <BalanceVisualization genome={genome} />
            </motion.section>
        </motion.div>
    );
}

interface BalanceProps {
    genome: {
        exploration: number;
        discipline: number;
        experimentation: number;
        consistency: number;
    };
}

function BalanceVisualization({ genome }: BalanceProps) {
    const avg = (genome.exploration + genome.discipline + genome.experimentation + genome.consistency) / 4;

    const profile =
        genome.exploration > 70 && genome.experimentation > 70 ? "Innovator" :
        genome.discipline > 70 && genome.consistency > 70 ? "Strategist" :
        genome.exploration > 60 && genome.discipline > 60 ? "Versatile" :
        "Balanced";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-sm border border-slate-300"
        >
            <div className="flex items-center justify-between mb-3">
                <span className="font-patrick font-bold text-slate-700">Overall Balance</span>
                <span className="text-lg font-patrick font-bold text-indigo-700">{Math.round(avg)}/100</span>
            </div>
            <div className="space-y-2 font-sans text-sm">
                <div className="flex gap-2">
                    <span className="font-bold text-slate-600 min-w-fit">Profile Type:</span>
                    <span className="text-slate-700">{profile}</span>
                </div>
                <p className="text-xs text-slate-500 italic mt-2">
                    Your genome shows a unique blend of developer characteristics shaped by your project history.
                </p>
            </div>
        </motion.div>
    );
}
