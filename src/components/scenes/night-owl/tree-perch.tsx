"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TreePerch() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.div
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
        >
            {/* Tree Base Shadow Sway */}
            <motion.div
                className="absolute -bottom-8 right-12 w-64 h-12 bg-black/50 blur-[12px] rounded-[100%] pointer-events-none"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.6, 0.4],
                    rotate: [-1, 2, -1]
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtly Falling Feather (Occasional micro interaction) */}
            {mounted && (
                <motion.div
                    className="absolute top-[30%] left-[20%] w-4 h-4 pointer-events-none z-10 opacity-60"
                    animate={{
                        y: ["0px", "400px"],
                        x: ["0px", "-40px", "20px", "-30px", "10px", "-20px"],
                        rotate: [0, 45, -45, 60, -30, 90],
                        opacity: [0, 0, 0, 0.6, 0.6, 0, 0] // Mostly hidden during the long wait loop
                    }}
                    transition={{
                        duration: 25, // very slow falling loop, mostly invisible until it drops
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.5, 0.8, 0.82, 0.95, 0.98, 1] // The active drop happens at the end of the loop
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C12 2 8 8 8 13C8 16.5 12 22 12 22C12 22 16 16.5 16 13C16 8 12 2 12 2Z" fill="#94a3b8" />
                        <path d="M12 2C12 2 8 8 8 13" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </motion.div>
            )}

            {/* The main branch the owl lands on */}
            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_15px_25px_rgba(4,10,21,0.6)] opacity-90 relative z-20">
                {/* Main trunk */}
                <path
                    d="M 400 500 L 350 500 C 340 350, 360 200, 380 0 L 400 0 Z"
                    fill="#0f172a"
                    stroke="#1e293b"
                    strokeWidth="2"
                />

                {/* Sub-branch that goes to the left for the owl */}
                <path
                    d="M 370 250 Q 250 280, 50 240 Q 200 300, 360 300 Z"
                    fill="#0f172a"
                    stroke="#1e293b"
                    strokeWidth="2"
                />

                {/* Secondary smaller branches */}
                <path d="M 220 260 Q 180 180, 100 150 Q 180 200, 200 270" fill="#0f172a" />
                <path d="M 360 150 Q 280 120, 250 50 Q 290 100, 370 120" fill="#0f172a" />

                {/* Leaves grouping - Top Branch */}
                {/* Cinematic subtle sway (ambient wind) */}
                <motion.g
                    animate={{ rotate: [-0.5, 1, -0.5] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="origin-[250px_50px]"
                >
                    <path d="M 250 50 Q 220 20, 260 0 Q 280 30, 250 50" fill="#1e293b" />
                    <path d="M 250 50 Q 200 60, 220 20 Q 260 40, 250 50" fill="#0f172a" />
                    <path d="M 250 50 Q 230 80, 200 50 Q 240 30, 250 50" fill="#1e293b" />
                </motion.g>

                {/* Leaves grouping - Mid Branch */}
                <motion.g
                    animate={{ rotate: [-1, 0.5, -1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="origin-[100px_150px]"
                >
                    <path d="M 100 150 Q 60 120, 110 90 Q 130 130, 100 150" fill="#1e293b" />
                    <path d="M 100 150 Q 50 160, 70 110 Q 120 130, 100 150" fill="#0f172a" />
                    <path d="M 100 150 Q 80 190, 40 160 Q 90 130, 100 150" fill="#1e293b" />
                </motion.g>

                {/* Leaves grouping - End of Main Branch */}
                <motion.g
                    animate={{ rotate: [1, -1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="origin-[50px_240px]"
                >
                    <path d="M 50 240 Q 10 210, 60 180 Q 80 220, 50 240" fill="#1e293b" />
                    <path d="M 50 240 Q 0 250, 20 200 Q 70 220, 50 240" fill="#0f172a" />
                    <path d="M 50 240 Q 30 280, -10 250 Q 40 220, 50 240" fill="#1e293b" />
                </motion.g>
            </svg>
        </motion.div>
    );
}
