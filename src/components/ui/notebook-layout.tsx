"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DeveloperProfile } from "@/types/analysis";
import { NotebookBookmarks, BookmarkTab } from "@/components/ui/notebook-bookmarks";
import { SummaryPanel } from "@/components/ui/panels/summary-panel";
import { GenomePanel } from "@/components/ui/panels/genome-panel";
import { EvidencePanel } from "@/components/ui/panels/evidence-panel";
import { MutationsPanel } from "@/components/ui/panels/mutations-panel";

export function NotebookLayout({ analysis }: { analysis: DeveloperProfile }) {
    const [activeTab, setActiveTab] = useState<BookmarkTab>("summary");
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-4xl mx-auto z-40 my-12"
        >
            {/* Notebook Paper Container */}
            <div className="bg-[#fdfbf7] shadow-2xl rounded-sm relative overflow-hidden border border-[#e5e5e5]">
                
                {/* Binder Holes (Left Edge) */}
                <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-evenly opacity-40 py-12 z-0">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-slate-900 shadow-inner" />
                    ))}
                </div>

                {/* Notebook Bookmarks */}
                <NotebookBookmarks activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Notebook Page Content */}
                <div className="relative z-10 min-h-[600px] px-8 md:px-12 py-12">
                    {/* Red Margin Line */}
                    <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-red-400 opacity-40 mix-blend-multiply pointer-events-none" />

                    {/* Notebook Lines Background */}
                    <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 2rem' }}
                    />

                    {/* Content Area */}
                    <div className="relative z-10 pl-12 font-patrick text-xl leading-[2rem] text-slate-800">
                        {/* Page Header */}
                        <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-2">
                            <h1 className="text-4xl font-bold font-patrick tracking-wide">🧬 Genome Analysis</h1>
                            <div className="text-right">
                                <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Subject Profile</p>
                                <p className="text-2xl font-bold text-indigo-700">@{analysis.archetype.name.replace(/\s+/g, "")}</p>
                            </div>
                        </div>

                        {/* Content Panels with Tab Switching */}
                        <motion.div
                            key={`panel-${activeTab}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-12"
                        >
                            {activeTab === "summary" && <SummaryPanel analysis={analysis} />}
                            {activeTab === "genome" && <GenomePanel analysis={analysis} />}
                            {activeTab === "evidence" && <EvidencePanel analysis={analysis} />}
                            {activeTab === "mutations" && <MutationsPanel analysis={analysis} />}
                        </motion.div>

                        {/* Footer spacer */}
                        <div className="mt-12" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
