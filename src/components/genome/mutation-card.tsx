"use client";

import { Mutation } from "@/types/analysis";
import { motion } from "framer-motion";

export function MutationCard({ mutations }: { mutations: Mutation[] }) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={item}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-pink-400 to-red-400 text-white col-span-1 md:col-span-2"
        >
            <h2 className="text-lg font-medium opacity-90 font-poppins mb-4">🧪 Detected Weirdness</h2>
            {mutations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mutations.map((mutation, i) => (
                        <div key={i} className="bg-white/20 p-4 rounded-xl">
                            <p className="font-bold text-lg mb-1">{mutation.name}</p>
                            <p className="text-sm opacity-90">{mutation.explanation}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white/20 p-4 rounded-xl text-center">
                    <p className="text-lg font-medium">Clear Bill of Health</p>
                    <p className="opacity-90 mt-1">Specimen lacks entertaining mutations.</p>
                </div>
            )}
        </motion.div>
    );
}
