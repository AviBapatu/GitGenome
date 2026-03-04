"use client";

import { motion, Variants } from "framer-motion";
import { NormalizedUser } from "@/lib/github/githubNormalizer";
import { NormalizedRepo } from "@/types/github";
import { HandwrittenTitle } from "@/components/ui/handwritten-title";
import { ScribbleDivider } from "@/components/ui/scribble-divider";
import { useMemo } from "react";

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ProfilePanelProps {
    user?: NormalizedUser;
    repos?: NormalizedRepo[];
    username: string;
}

/** Compute language distribution from repos */
function computeLanguageStats(repos: NormalizedRepo[]): { language: string; count: number; percent: number }[] {
    const langMap: Record<string, number> = {};
    for (const repo of repos) {
        if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }
    }
    const total = Object.values(langMap).reduce((a, b) => a + b, 0);
    return Object.entries(langMap)
        .sort(([, a], [, b]) => b - a)
        .map(([language, count]) => ({
            language,
            count,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
        }));
}

/** Hand-drawn color palette for language bars */
const LANG_COLORS = [
    "bg-indigo-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-orange-500",
    "bg-violet-500",
    "bg-teal-500",
];

export function ProfilePanel({ user, repos, username }: ProfilePanelProps) {
    const languageStats = useMemo(() => computeLanguageStats(repos || []), [repos]);

    /* ── Error / empty state ─────────────────────────────── */
    if (!user) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-2xl font-patrick text-slate-500 italic">Unable to fetch GitHub profile</p>
                <svg className="mx-auto mt-4 opacity-30" width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round">
                    <circle cx="50" cy="50" r="40" />
                    <path d="M35 40 L45 50 L35 60" />
                    <path d="M65 40 L55 50 L65 60" />
                    <path d="M35 70 Q50 60 65 70" />
                </svg>
            </motion.div>
        );
    }

    const joinYear = user.createdAt instanceof Date
        ? user.createdAt.getFullYear()
        : new Date(user.createdAt).getFullYear();

    return (
        <motion.div
            key="profile-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* ── Specimen Header ─────────────────────────────── */}
            <motion.section variants={childVariants} className="space-y-6 relative">
                {/* Paper-clip doodle */}
                <div className="absolute -top-8 -right-4 md:right-6 opacity-30 rotate-12 pointer-events-none">
                    <svg width="36" height="72" viewBox="0 0 36 72" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2 C28 2, 34 10, 34 20 L34 52 C34 62, 28 70, 18 70 C8 70, 2 62, 2 52 L2 24 C2 14, 8 6, 18 6 L18 48 C18 56, 14 60, 10 60 C6 60, 4 56, 4 48 L4 20" />
                    </svg>
                </div>

                <HandwrittenTitle type="underline">Profile Snapshot</HandwrittenTitle>

                <p className="text-sm italic text-slate-500 font-patrick -mt-4">
                    GitHub specimen under observation 🔍
                </p>

                {/* ── Avatar + Info Card ────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* ── Hand-drawn Avatar Frame ──────────────── */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative flex-shrink-0"
                    >
                        {/* Sketchy outer frame */}
                        <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none" viewBox="0 0 140 140" fill="none">
                            <rect x="4" y="4" width="132" height="132" rx="12" stroke="#475569" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round"
                                style={{ filter: "url(#sketch)" }} />
                            <defs>
                                <filter id="sketch">
                                    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="turbulence" />
                                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                            </defs>
                        </svg>

                        {/* Actual avatar */}
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 border-slate-300 shadow-md bg-slate-100 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={user.avatarUrl}
                                alt={`${user.login}'s avatar`}
                                className="w-full h-full object-cover"
                                style={{ filter: "contrast(1.1) saturate(0.85)" }}
                            />
                            {/* Subtle sketch overlay */}
                            <div className="absolute inset-0 mix-blend-multiply opacity-10"
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M5 0h1L0 5V4zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")" }}
                            />
                        </div>

                        {/* Doodle arrow pointing to avatar */}
                        <svg className="absolute -bottom-6 -left-6 opacity-40" width="40" height="30" viewBox="0 0 80 60" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M70 50 Q40 30, 15 15" />
                            <path d="M25 5 L15 15 L5 10" />
                        </svg>
                    </motion.div>

                    {/* ── Info Fields ───────────────────────────── */}
                    <div className="space-y-2 flex-1">
                        <motion.div initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                            <p className="text-3xl font-bold font-patrick text-slate-800">
                                {user.name || user.login}
                            </p>
                            <p className="text-lg text-indigo-600 font-patrick font-bold">@{user.login}</p>
                        </motion.div>

                        <motion.div
                            initial={{ x: -15, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-patrick text-slate-600 mt-2"
                        >
                            <span>👥 <strong>{user.followers}</strong> followers</span>
                            <span>👤 <strong>{user.following}</strong> following</span>
                            <span>📦 <strong>{user.publicRepos}</strong> public repos</span>
                            <span>📅 Joined <strong>{joinYear}</strong></span>
                        </motion.div>

                        <motion.div initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                            {/* Bio sticky-note */}
                            <div className="mt-3 bg-amber-50/80 border border-amber-200 rounded-sm px-4 py-3 transform rotate-[0.5deg] shadow-sm max-w-md">
                                <p className="text-sm font-patrick text-slate-700 italic leading-relaxed">
                                    &ldquo;{user.bio || "No bio provided"}&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* ── Languages Detected ──────────────────────────── */}
            <motion.section variants={childVariants} className="space-y-4 relative">
                {/* Coffee stain doodle */}
                <div className="absolute -top-4 -right-2 md:right-8 opacity-[0.06] pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="#8B4513">
                        <ellipse cx="50" cy="50" rx="45" ry="42" />
                        <ellipse cx="50" cy="50" rx="35" ry="32" fill="#fdfbf7" />
                    </svg>
                </div>

                <HandwrittenTitle type="highlight">Languages Detected</HandwrittenTitle>

                {languageStats.length === 0 ? (
                    <p className="text-slate-500 italic font-patrick">No languages detected</p>
                ) : (
                    <div className="space-y-3 mt-2">
                        {languageStats.slice(0, 8).map((lang, i) => (
                            <motion.div
                                key={lang.language}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.3 }}
                                className="flex items-center gap-3"
                            >
                                <span className="w-24 text-sm font-patrick font-bold text-slate-700 text-right truncate">
                                    {lang.language}
                                </span>
                                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.max(lang.percent, 6)}%` }}
                                        transition={{ duration: 0.8, delay: 0.1 * i }}
                                        className={`h-full rounded-full ${LANG_COLORS[i % LANG_COLORS.length]}`}
                                        style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)" }}
                                    />
                                </div>
                                <span className="w-10 text-xs font-patrick text-slate-500 font-bold">
                                    {lang.percent}%
                                </span>
                            </motion.div>
                        ))}

                        <p className="text-xs text-slate-400 font-patrick mt-2 flex items-center gap-1">
                            <svg width="40" height="16" viewBox="0 0 80 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-50">
                                <path d="M70 16 Q50 6, 10 16" />
                                <path d="M20 8 L10 16 L18 24" />
                            </svg>
                            {languageStats.length} language{languageStats.length !== 1 ? "s" : ""} across {repos?.length ?? 0} repos
                        </p>
                    </div>
                )}
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* ── Repositories Analyzed ───────────────────────── */}
            <motion.section variants={childVariants} className="space-y-4">
                <HandwrittenTitle type="box">Repositories Analyzed</HandwrittenTitle>

                {!repos || repos.length === 0 ? (
                    <p className="text-slate-500 italic font-patrick">No repositories available for analysis</p>
                ) : (
                    <>
                        <p className="font-patrick text-lg text-slate-700">
                            Analyzed <strong className="text-indigo-700 text-2xl">{repos.length}</strong> repositories
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {repos.slice(0, 6).map((repo, i) => (
                                <motion.div
                                    key={repo.name}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                                    className="bg-slate-50 px-3 py-2 rounded-sm border-l-4 border-indigo-400 flex items-center justify-between"
                                >
                                    <span className="font-patrick font-bold text-slate-800 truncate">{repo.name}</span>
                                    {repo.language && (
                                        <span className="text-xs font-sans text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                                            {repo.language}
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {repos.length > 6 && (
                            <p className="text-xs text-slate-400 font-patrick italic">
                                …and {repos.length - 6} more
                            </p>
                        )}
                    </>
                )}
            </motion.section>

            <motion.div variants={childVariants}>
                <ScribbleDivider />
            </motion.div>

            {/* ── Verification Stamp ─────────────────────────── */}
            <motion.section
                variants={childVariants}
                className="flex flex-col items-center py-6 space-y-4"
            >
                {/* Red ink stamp */}
                <motion.div
                    initial={{ scale: 1.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                    className="relative"
                >
                    <div className="border-4 border-red-500/70 rounded-lg px-8 py-4 transform -rotate-3"
                        style={{ boxShadow: "inset 0 0 0 2px rgba(239,68,68,0.3)" }}
                    >
                        <p className="text-xl md:text-2xl font-bold font-patrick text-red-600/80 tracking-wider uppercase flex items-center gap-2">
                            ✔ GitHub Profile Confirmed
                        </p>
                    </div>
                    {/* Ink splatter effect */}
                    <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-red-400/20 rounded-full" />
                    <div className="absolute -top-1 -left-2 w-2 h-2 bg-red-400/15 rounded-full" />
                </motion.div>

                {/* Confirmation message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm font-patrick text-slate-500 italic text-center"
                >
                    Profile verified. Analyzing developer genome…
                </motion.p>
            </motion.section>
        </motion.div>
    );
}
