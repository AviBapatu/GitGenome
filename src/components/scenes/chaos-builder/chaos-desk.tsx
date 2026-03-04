"use client";

import { motion } from "framer-motion";

export function ChaosDesk() {
    return (
        <div className="fixed bottom-0 right-0 z-15 pointer-events-none">
            {/* Main desk surface */}
            <div className="relative w-96 h-64">
                {/* Desk wood texture */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-t border-[#444]" />

                {/* Desk edge glow */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]" />

                {/* Broken Keyboard - left side, tilted */}
                <motion.div
                    className="absolute left-8 bottom-20 w-40 h-16 bg-gradient-to-b from-[#333] to-[#1a1a1a] border border-[#555] rounded-sm"
                    animate={{ rotate: -5 }}
                    style={{
                        boxShadow: "0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                    }}
                >
                    {/* Keys scattered */}
                    <div className="p-2 grid grid-cols-6 gap-1 h-full">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="bg-[#444] border border-[#666] rounded text-[0.6rem] flex items-center justify-center text-[#999]"
                                animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 0.3 + i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                            >
                                {i < 10 ? i : ["*", "#"][i - 10]}
                            </motion.div>
                        ))}
                    </div>
                    {/* Missing keys indicator */}
                    <div className="absolute bottom-2 right-2 text-[0.5rem] text-[#666]">MISSING: Q,W</div>
                </motion.div>

                {/* Spilled Coffee Cup */}
                <motion.div
                    className="absolute right-32 bottom-16 w-12 h-16 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-b-lg opacity-70"
                    animate={{ rotate: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    {/* Cup lip */}
                    <div className="absolute -top-1 inset-x-1 h-2 bg-gradient-to-b from-[#A0522D] to-transparent rounded-full" />
                    {/* Coffee spill */}
                    <motion.div
                        className="absolute bottom-0 right-0 w-24 h-8 bg-[#654321] opacity-40 rounded-full blur-md"
                        animate={{ width: [20, 28, 20] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </motion.div>

                {/* Debug Notebook - "Debugging at 3AM" */}
                <motion.div
                    className="absolute right-8 bottom-28 w-24 h-32 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] border-2 border-[#cc8800] rounded-sm p-2 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    animate={{ rotate: [2, -1, 2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <div className="font-patrick text-[0.7rem] text-[#333] font-bold mb-2">DEBUG</div>
                    <div className="font-mono text-[0.5rem] text-[#333] leading-tight">
                        <div>03:45 AM</div>
                        <div>✓ Array shift</div>
                        <div>✗ Pointer?</div>
                        <div>?? Refs</div>
                        <div className="text-[#cc0000] mt-2">WHY????</div>
                    </div>
                </motion.div>

                {/* Sticky Note: "It works on my machine" */}
                <motion.div
                    className="absolute left-20 bottom-44 w-20 h-20 bg-[#ffff99] border-2 border-[#cccc66] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-2 rounded-sm"
                    animate={{ rotate: [-3, 2, -3] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                >
                    <div className="font-patrick text-[0.65rem] text-[#333] text-center h-full flex flex-col items-center justify-center">
                        <div className="mb-1">🚀</div>
                        <div className="leading-tight font-bold">it works on</div>
                        <div className="leading-tight">my</div>
                        <div className="leading-tight">machine</div>
                    </div>
                </motion.div>

                {/* Tangled Cables - decorative */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                        d="M 50 200 Q 60 150 80 140 Q 100 135 120 160"
                        stroke="#666"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.4"
                    />
                    <path
                        d="M 300 180 Q 280 120 260 100 Q 240 90 220 140"
                        stroke="#555"
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.3"
                    />
                </svg>
            </div>
        </div>
    );
}
