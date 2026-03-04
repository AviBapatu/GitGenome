"use client";

import { Trait } from "@/types/analysis";
import { motion } from "framer-motion";

const traitIcons: Record<string, string> = {
    "Night Owl": "🦉",
    "Weekend Hacker": "🏕️",
    "Serial Project Starter": "🚀",
    "TypeScript Purist": "🔷",
    "Framework Collector": "🧩",
    "Chaos Coder": "🌪️",
    "Bug Hunter": "🐛",
    "The Overengineer": "⚙️",
    "Refactor Addict": "🔧",
};

export function TraitCard({ traits }: { traits: Trait[] }) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={item}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white"
        >
            <h2 className="text-lg font-medium opacity-90 font-poppins mb-4">🧠 Developer DNA Traits</h2>
            <div className="space-y-3">
                {traits.map((trait, i) => (
                    <div key={i} className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                        <span className="text-2xl">{traitIcons[trait.name] || "🧪"}</span>
                        <div>
                            <p className="font-semibold">{trait.name}</p>
                            <p className="text-sm opacity-80">{trait.explanation}</p>
                        </div>
                    </div>
                ))}
                {traits.length === 0 && (
                    <p className="opacity-80 italic">No significant genome markers found.</p>
                )}
            </div>
        </motion.div>
    );
}
