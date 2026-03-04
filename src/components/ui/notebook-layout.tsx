"use client";

import { motion, Variants } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";

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

export function NotebookLayout({ analysis }: { analysis: DeveloperProfile }) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-4xl mx-auto z-40 my-12"
        >
            {/* Notebook Paper Base */}
            <div className="bg-[#fdfbf7] shadow-2xl rounded-sm p-8 md:p-12 relative overflow-hidden border border-[#e5e5e5] min-h-[600px]">

                {/* Binder Holes (Left Edge) */}
                <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-evenly opacity-40 py-12">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-slate-900 shadow-inner" />
                    ))}
                </div>

                {/* Notebook Lines */}
                <div className="absolute left-0 right-0 bottom-0 top-[130px] pointer-events-none opacity-20"
                    style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 2rem' }}
                />

                {/* Red Margin Line */}
                <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-red-400 opacity-40 mix-blend-multiply pointer-events-none" />

                {/* Content Area */}
                <div className="relative z-10 pl-12 font-patrick text-xl leading-[2rem] text-slate-800">
                    <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-2">
                        <h1 className="text-4xl font-bold font-patrick tracking-wide">🧬 Genome Analysis</h1>
                        <div className="text-right">
                            <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Subject Profile</p>
                            <p className="text-2xl font-bold text-indigo-700">@{analysis.archetype.name.replace(" ", "")}</p>
                        </div>
                    </div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-8 space-y-12 pb-12">

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
                            <HandwrittenTitle type="underline">Classification: {analysis.archetype.name}</HandwrittenTitle>
                            <p className="text-xl">
                                {analysis.archetype.description}
                            </p>
                        </motion.section>

                        <motion.div variants={childVariants}><ScribbleDivider /></motion.div>

                        <motion.section variants={childVariants} className="space-y-6">
                            <HandwrittenTitle type="highlight">Dominant Coding Gene</HandwrittenTitle>
                            <div className="flex items-center space-x-4 relative">
                                <p className="text-2xl font-bold bg-indigo-100/50 outline outline-2 outline-indigo-300 outline-offset-4 w-max px-3 py-1 transform -rotate-2">
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

                        <motion.div variants={childVariants}><ScribbleDivider /></motion.div>

                        <motion.section variants={childVariants} className="space-y-6">
                            <HandwrittenTitle type="box">Evidence Data</HandwrittenTitle>
                            <div className="space-y-2 mt-4 ml-6">
                                <ul className="list-disc pl-5 opacity-80 text-lg font-sans">
                                    {analysis.archetype.evidence.map((evidenceItem, i) => (
                                        <li key={i}>{evidenceItem}</li>
                                    ))}
                                </ul>
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
                                    <HandwrittenTitle type="circle">Behavioral Notes</HandwrittenTitle>
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
                </div>
            </div>
        </motion.div>
    );
}
