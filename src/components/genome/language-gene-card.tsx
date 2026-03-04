"use client";

import { motion } from "framer-motion";

export function LanguageGeneCard({ language }: { language: string | null }) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={item}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-sky-400 to-blue-500 text-white flex flex-col justify-center"
        >
            <h2 className="text-lg font-medium opacity-90 font-poppins mb-2">🧬 Dominant Coding Gene</h2>
            <p className="text-3xl font-bold">{language ?? "Unknown Element"}</p>
            <p className="opacity-80 mt-2 text-sm">
                Your repositories are heavily infected with this dialect.
            </p>
        </motion.div>
    );
}
