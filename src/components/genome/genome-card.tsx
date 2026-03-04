"use client";

import { motion } from "framer-motion";

export function GenomeCard({ archetype, confidence }: { archetype: string, confidence: number }) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={item}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white col-span-1 md:col-span-2 flex flex-col items-center text-center"
        >
            <span className="text-4xl mb-4">🧬</span>
            <h2 className="text-xl font-medium opacity-90 font-poppins mb-1">Developer Genome</h2>
            <p className="text-4xl font-bold font-poppins">{archetype}</p>
            <div className="mt-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
                <p className="text-sm font-medium">Analysis Confidence:</p>
                <p className="text-sm font-bold">{Math.round((confidence || 0) * 100)}%</p>
            </div>
            <p className="opacity-80 mt-4 text-sm max-w-md mx-auto">
                Our highly questionable AI believes this describes your foundational coding personality.
            </p>
        </motion.div>
    );
}
