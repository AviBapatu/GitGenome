import { DeveloperProfile } from "@/types/analysis";
import { motion } from "framer-motion";

export function OverviewTab({ analysis }: { analysis: DeveloperProfile }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

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

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pb-20"
        >
            {/* Genome Summary Card */}
            <motion.div variants={item} className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white col-span-1 md:col-span-2 flex flex-col items-center text-center">
                <span className="text-4xl mb-4">🧬</span>
                <h3 className="text-xl font-medium opacity-90 font-poppins mb-1">Developer Genome</h3>
                <p className="text-4xl font-bold font-poppins">{analysis.archetype}</p>
                <div className="mt-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
                    <p className="text-sm font-medium">Analysis Confidence:</p>
                    <p className="text-sm font-bold">{Math.round((analysis.confidence || 0) * 100)}%</p>
                </div>
            </motion.div>

            {/* Language DNA */}
            <motion.div variants={item} className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-sky-400 to-blue-500 text-white">
                <h3 className="text-lg font-medium opacity-90 font-poppins mb-2">Dominant Coding Gene</h3>
                <p className="text-3xl font-bold">{analysis.dominantLanguage || "Unknown Element"}</p>
                <div className="mt-4 opacity-75 text-sm">
                    <p>Specimen shows high affinity for {analysis.dominantLanguage} syntax.</p>
                </div>
            </motion.div>

            {/* Developer DNA (Traits) */}
            <motion.div variants={item} className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-teal-400 to-emerald-500 text-white">
                <h3 className="text-lg font-medium opacity-90 font-poppins mb-4">Developer DNA</h3>
                <div className="space-y-3">
                    {analysis.traits.map((trait, i) => (
                        <div key={i} className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                            <span className="text-2xl">{traitIcons[trait.name] || "🧪"}</span>
                            <div>
                                <p className="font-semibold">{trait.name}</p>
                                <p className="text-sm opacity-80">{trait.explanation}</p>
                            </div>
                        </div>
                    ))}
                    {analysis.traits.length === 0 && (
                        <p className="opacity-80 italic">No significant genome markers found.</p>
                    )}
                </div>
            </motion.div>

            {/* Detected Weirdness (Mutations) */}
            <motion.div variants={item} className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-pink-400 to-red-400 text-white col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium opacity-90 font-poppins mb-4">Detected Weirdness</h3>
                {analysis.mutations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis.mutations.map((mutation, i) => (
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
        </motion.div>
    );
}
