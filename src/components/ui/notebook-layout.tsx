"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeveloperProfile } from "@/types/analysis";
import { NormalizedUser } from "@/lib/github/githubNormalizer";
import { NormalizedRepo } from "@/types/github";
import { NotebookBookmarks, BookmarkTab } from "@/components/ui/notebook-bookmarks";
import { ProfilePanel } from "@/components/ui/panels/profile-panel";
import { SummaryPanel } from "@/components/ui/panels/summary-panel";
import { GenomePanel } from "@/components/ui/panels/genome-panel";
import { EvidencePanel } from "@/components/ui/panels/evidence-panel";
import { MutationsPanel } from "@/components/ui/panels/mutations-panel";

interface NotebookLayoutProps {
    analysis: DeveloperProfile;
    user?: NormalizedUser;
    repos?: NormalizedRepo[];
    username: string;
}

export function NotebookLayout({ analysis, user, repos, username }: NotebookLayoutProps) {
    const [activeTab, setActiveTab] = useState<BookmarkTab>("profile");
    const router = useRouter();

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

                {/* Analyze Another Developer Button */}
                <div className="relative z-20 flex justify-end px-8 md:px-12 pt-4 pb-0">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-dashed border-slate-400 rounded-md font-patrick text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer shadow-sm"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                        Analyze Another Developer
                    </motion.button>
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
                            <h1 className="text-4xl font-bold font-patrick tracking-wide">
                                {activeTab === "profile" ? "📋 Developer Genome Report" : "🧬 Genome Analysis"}
                            </h1>
                            <div className="text-right">
                                <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Subject Profile</p>
                                <p className="text-2xl font-bold text-indigo-700">@{username}</p>
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
                            {activeTab === "profile" && <ProfilePanel user={user} repos={repos} username={username} />}
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
