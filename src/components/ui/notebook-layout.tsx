"use client";

import { motion } from "framer-motion";

export function NotebookLayout({ children, subject }: { children: React.ReactNode, subject: string }) {
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
                            <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Subject Identifier</p>
                            <p className="text-2xl font-bold text-indigo-700">@{subject}</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-12 pb-12">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
