"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchBackgroundProps {
    mouseX?: number;
    mouseY?: number;
}

export function GlitchBackground({ mouseX = 0.5, mouseY = 0.5 }: GlitchBackgroundProps) {
    const [glitchTrigger, setGlitchTrigger] = useState(0);
    const [rgbOffset, setRgbOffset] = useState({ x: 0, y: 0 });

    // Trigger glitches at random intervals (5-10 seconds)
    useEffect(() => {
        const scheduleGlitch = () => {
            const delay = 5000 + Math.random() * 5000;
            const timeout = setTimeout(() => {
                setGlitchTrigger(prev => prev + 1);
                // Random RGB offset for glitch effect
                setRgbOffset({
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 4
                });
                scheduleGlitch();
            }, delay);
            return timeout;
        };
        const timeout = scheduleGlitch();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden">
            {/* Main dark hacker lab background */}
            <div className="absolute inset-0 bg-[#0f0f1a]" />

            {/* Glossy black floor with slight gradient */}
            <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-black via-[#0a0a12] to-transparent" />

            {/* Main container for glitch effect */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: glitchTrigger > 0 ? [1, 0.95, 1] : 1,
                    filter: glitchTrigger > 0 ? [
                        "brightness(1) contrast(1)",
                        "brightness(1.1) contrast(1.2)",
                        "brightness(1) contrast(1)"
                    ] : "brightness(1) contrast(1)"
                }}
                transition={{
                    duration: 0.15,
                    ease: "easeInOut"
                }}
            >
                {/* Server Racks - Left side */}
                <div className="absolute left-12 top-20 w-24 h-96 border-2 border-[#00eaff] bg-[#1a1a2e] opacity-60 rounded-sm shadow-[0_0_20px_rgba(0,234,255,0.2)]">
                    <div className="p-3 space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-8 bg-gradient-to-r from-[#00eaff]/40 to-transparent rounded border border-[#00eaff]/50 flex items-center px-1">
                                <motion.div
                                    className="w-1 h-1 rounded-full bg-[#ff3366]"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Server Racks - Far left background */}
                <div className="absolute left-0 top-0 w-20 h-80 border border-[#8a2be2]/40 bg-[#0d0d15] opacity-40" />

                {/* Terminal Monitor - Upper middle */}
                <div className="absolute left-1/3 top-12 w-56 h-40 border-4 border-[#ff3366]/60 bg-[#0a0a12] shadow-[0_0_30px_rgba(255,51,102,0.3)] rounded-sm">
                    <div className="w-full h-full bg-gradient-to-br from-[#1a0a0a] to-[#0f0f1a] p-4 font-mono text-xs text-[#00eaff] overflow-hidden">
                        <motion.div
                            animate={{
                                textShadow: glitchTrigger > 0 ? [
                                    "0 0 10px rgba(255,51,102,0.5)",
                                    "0 0 20px rgba(255,51,102,0.8)",
                                    "0 0 10px rgba(255,51,102,0.5)"
                                ] : "0 0 5px rgba(0,234,255,0.3)"
                            }}
                            transition={{ duration: 0.15 }}
                        >
                            <div>TypeError: undefined is not</div>
                            <div>a function</div>
                            <div className="mt-2 text-[#ff3366]">
                                at Object.&lt;anonymous&gt;:1:12
                            </div>
                            <div className="text-[#8a2be2] mt-2 animate-pulse">_</div>
                        </motion.div>
                    </div>
                </div>

                {/* Terminal Monitor - Lower right */}
                <div className="absolute right-20 top-1/3 w-56 h-40 border-4 border-[#00eaff]/60 bg-[#0a0a12] shadow-[0_0_30px_rgba(0,234,255,0.3)] rounded-sm">
                    <div className="w-full h-full bg-gradient-to-br from-[#0a1a1a] to-[#0f0f1a] p-4 font-mono text-xs text-[#ff3366] overflow-hidden">
                        <motion.div
                            animate={{
                                textShadow: glitchTrigger > 0 ? [
                                    "0 0 10px rgba(0,234,255,0.5)",
                                    "0 0 20px rgba(0,234,255,0.8)",
                                    "0 0 10px rgba(0,234,255,0.5)"
                                ] : "0 0 5px rgba(138,43,226,0.3)"
                            }}
                            transition={{ duration: 0.15 }}
                        >
                            <div>build failed</div>
                            <div className="mt-2 text-[#00eaff]">Error: ENOENT</div>
                            <div className="text-xs text-[#8a2be2]">
                                src/index.js
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* FAIL Sign - Top Right */}
                <motion.div
                    className="absolute right-12 top-24 px-4 py-2 border-3 border-[#ff3366] bg-[#1a0a0a] rounded-sm"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="font-mono font-bold text-sm text-[#ff3366]">⚠ FAIL</div>
                </motion.div>

                {/* CRITICAL Error Panel - Right middle */}
                <div className="absolute right-8 top-1/2 w-48 h-32 border-3 border-[#ff3366] bg-[#2a0a0a] shadow-[0_0_20px_rgba(255,51,102,0.4)]">
                    <div className="w-full h-full bg-gradient-to-b from-[#3a1a1a] to-[#1a0a0a] p-3 font-mono text-[0.65rem]">
                        <motion.div
                            animate={{
                                textShadow: ["0 0 5px rgba(255,51,102,0.3)", "0 0 15px rgba(255,51,102,0.8)", "0 0 5px rgba(255,51,102,0.3)"]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-[#ff3366] font-bold tracking-widest mb-2"
                        >
                            ⚠ CRITICAL ⚠
                        </motion.div>
                        <div className="text-[#ff6699] space-y-1">
                            <div>SEGMENTATION FAULT</div>
                            <div>Memory: CORRUPTED</div>
                            <div>Stack: OVERFLOW</div>
                        </div>
                    </div>
                </div>

                {/* Broken Monitor (blown out) - Right side */}
                <div className="absolute right-40 top-24 w-44 h-36 border-4 border-[#ff3366]/40 bg-[#0a0a0a] shadow-[0_0_15px_rgba(255,51,102,0.2)] relative overflow-hidden">
                    <div className="w-full h-full bg-[#ffffff] opacity-10 flex items-center justify-center">
                        <div className="font-mono text-2xl text-[#ff3366]/20 font-bold">BLOWN</div>
                    </div>
                    {/* Diagonal cracks */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#ff3366" strokeWidth="1" opacity="0.4" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#ff3366" strokeWidth="1" opacity="0.3" />
                    </svg>
                </div>

                {/* 404 Digital Sign - Right bottom area */}
                <motion.div
                    className="absolute right-16 bottom-32 font-mono font-bold text-2xl text-[#00eaff] p-2 border-2 border-[#00eaff]/60"
                    animate={{
                        textShadow: ["0 0 10px rgba(0,234,255,0.4)", "0 0 20px rgba(0,234,255,0.8)", "0 0 10px rgba(0,234,255,0.4)"],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    404
                    <div className="text-xs text-[#ff3366] mt-1">NOT FOUND</div>
                </motion.div>

                {/* Red Alert Lamp - Far right */}
                <motion.div
                    className="absolute right-4 top-1/3 w-5 h-5 rounded-full border-2 border-[#ff3366] bg-[#ff3366]"
                    animate={{ boxShadow: ["0 0 8px rgba(255,51,102,0.5)", "0 0 20px rgba(255,51,102,1)", "0 0 8px rgba(255,51,102,0.5)"], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                />

                {/* Stack Trace Panel - Right side lower */}
                <div className="absolute right-24 bottom-16 w-52 h-40 border-2 border-[#8a2be2] bg-[#0d0a15] p-2 shadow-[0_0_15px_rgba(138,43,226,0.3)]">
                    <div className="font-mono text-[0.6rem] text-[#8a2be2] leading-tight space-y-1">
                        <div className="font-bold text-[#ff3366]">Stack Trace:</div>
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <div>at render() line 45</div>
                            <div>at module.js:234</div>
                            <div>at next() line 67</div>
                            <div>at execute() line 12</div>
                            <div className="text-[#ff3366]">at main() line 1</div>
                        </motion.div>
                    </div>
                </div>

                {/* "PROCESS TERMINATED" sign - Top right corner */}
                <motion.div
                    className="absolute right-8 top-8 px-3 py-1 border-2 border-[#ff3366] bg-[#0f0f1a]"
                    animate={{ rotate: [-1, 1, -1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="font-mono text-xs font-bold text-[#ff3366] whitespace-nowrap">
                        ⚠ TERMINATED
                    </div>
                </motion.div>

                {/* TOP AREA - Multiple FAIL Signs and Errors */}

                {/* System ERROR Panel - Top right area */}
                <motion.div
                    className="absolute right-32 top-8 px-3 py-2 border-2 border-[#ff3366] bg-[#1a0a0a] text-center"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                >
                    <div className="font-mono font-bold text-xs text-[#ff3366]">
                        SYSTEM ERROR
                    </div>
                </motion.div>

                {/* Cascading ERROR badges - Top right */}
                <motion.div
                    className="absolute right-56 top-6 px-2 py-1 border border-[#ff3366] bg-[#0f0f1a]"
                    animate={{ y: [0, -2, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="font-mono text-[0.7rem] font-bold text-[#ff3366]">ERROR</div>
                </motion.div>

                {/* "OUT OF MEMORY" Warning - Top center-right */}
                <motion.div
                    className="absolute right-40 top-4 px-3 py-1 border-2 border-[#ff6600] bg-[#2a1a0a]"
                    animate={{ textShadow: ["0 0 5px rgba(255,102,0,0.4)", "0 0 12px rgba(255,102,0,0.8)", "0 0 5px rgba(255,102,0,0.4)"] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <div className="font-mono text-xs font-bold text-[#ff6600] whitespace-nowrap">
                        OUT OF MEMORY
                    </div>
                </motion.div>

                {/* Small pulsing ERROR indicators - scattered top right */}
                <motion.div
                    className="absolute right-20 top-12 px-2 py-1 border border-[#ff3366]/60 bg-[#0a0a0a]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                >
                    <div className="font-mono text-[0.65rem] text-[#ff3366]">⚠ FAIL</div>
                </motion.div>

                {/* "EXCEPTION" panel - Top right area */}
                <motion.div
                    className="absolute right-12 top-4 px-2 py-1 border border-[#8a2be2] bg-[#1a0a2a]"
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                >
                    <div className="font-mono text-[0.7rem] font-bold text-[#8a2be2]">EXCEPTION</div>
                </motion.div>

                {/* Red danger zone panel - Top right */}
                <div className="absolute right-48 top-12 w-40 h-20 border-2 border-[#ff3366] bg-[#2a0a0a] p-2 shadow-[0_0_15px_rgba(255,51,102,0.3)]">
                    <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="font-mono text-[0.65rem] text-[#ff3366] space-y-1"
                    >
                        <div className="font-bold">⚠ SYSTEM FAILURE ⚠</div>
                        <div className="text-[0.6rem] text-[#ff6699]">Core dump initiated</div>
                    </motion.div>
                </div>

                {/* Blinking "RUNTIME PANIC" - Top area */}
                <motion.div
                    className="absolute right-64 top-8 px-3 py-1 border-2 border-[#ff3366] bg-[#0f0f1a]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <div className="font-mono text-xs font-bold text-[#ff3366] whitespace-nowrap">
                        PANIC
                    </div>
                </motion.div>

                {/* "HALTED" sign - Top right area */}
                <motion.div
                    className="absolute right-72 top-6 px-2 py-1 border border-[#00eaff] bg-[#0a1a1a]"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="font-mono text-[0.7rem] font-bold text-[#00eaff]">HALTED</div>
                </motion.div>

                {/* Cables hanging from top - right side */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="10%" y1="0" x2="12%" y2="40%" stroke="#666" strokeWidth="2" opacity="0.4" />
                    <line x1="25%" y1="0" x2="23%" y2="50%" stroke="#888" strokeWidth="2.5" opacity="0.3" />
                    <line x1="70%" y1="0" x2="68%" y2="45%" stroke="#666" strokeWidth="2" opacity="0.4" />
                    <line x1="85%" y1="0" x2="87%" y2="35%" stroke="#444" strokeWidth="2" opacity="0.3" />
                    <line x1="95%" y1="0" x2="92%" y2="50%" stroke="#555" strokeWidth="2" opacity="0.3" />

                    {/* Cable tangles */}
                    <path d="M 15% 45% Q 18% 55% 12% 65%" stroke="#555" strokeWidth="3" fill="none" opacity="0.5" />
                    <path d="M 70% 50% Q 75% 60% 68% 70%" stroke="#666" strokeWidth="2.5" fill="none" opacity="0.4" />
                    <path d="M 88% 40% Q 90% 55% 85% 70%" stroke="#444" strokeWidth="2" fill="none" opacity="0.3" />
                </svg>

                {/* Warning Lights - scattered around */}
                <motion.div className="absolute left-20 bottom-1/3 w-4 h-4 rounded-full bg-[#ff3366] border border-[#ff3366]" animate={{ boxShadow: ["0 0 10px rgba(255,51,102,0.5)", "0 0 20px rgba(255,51,102,0.8)", "0 0 10px rgba(255,51,102,0.5)"] }} transition={{ duration: 1, repeat: Infinity }} />

                <motion.div className="absolute right-32 top-1/4 w-3 h-3 rounded-full bg-[#00eaff] border border-[#00eaff]" animate={{ boxShadow: ["0 0 8px rgba(0,234,255,0.4)", "0 0 16px rgba(0,234,255,0.7)", "0 0 8px rgba(0,234,255,0.4)"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />

                <motion.div className="absolute left-1/3 top-20 w-3 h-3 rounded-full bg-[#8a2be2] border border-[#8a2be2]" animate={{ boxShadow: ["0 0 8px rgba(138,43,226,0.4)", "0 0 16px rgba(138,43,226,0.7)", "0 0 8px rgba(138,43,226,0.4)"] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1 }} />

                {/* RGB Chromatic Aberration for glitch */}
                {glitchTrigger > 0 && (
                    <>
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                mixBlendMode: "screen",
                                background: `linear-gradient(45deg, rgba(255,51,102,0.1) 0%, transparent 50%)`
                            }}
                        />
                    </>
                )}
            </motion.div>

            {/* Vignette effect - dark edges */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/30" style={{
                backgroundImage: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)"
            }} />
        </div>
    );
}
