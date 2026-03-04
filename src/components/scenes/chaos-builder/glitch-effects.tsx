"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchEffectsProps {
    children: React.ReactNode;
}

export function GlitchEffects({ children }: GlitchEffectsProps) {
    const [glitchActive, setGlitchActive] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(0);

    useEffect(() => {
        const scheduleGlitch = () => {
            const delay = 15000 + Math.random() * 10000; // 15-25 seconds between glitches
            const timeout = setTimeout(() => {
                setGlitchActive(true);
                setGlitchIntensity(Math.random() * 0.04 + 0.01); // Reduced intensity

                // Duration of glitch: 80-150ms (shorter)
                setTimeout(() => {
                    setGlitchActive(false);
                }, 80 + Math.random() * 70);

                scheduleGlitch();
            }, delay);
            return timeout;
        };

        const timeout = scheduleGlitch();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <motion.div
            animate={{
                // Screen flicker - subtle
                opacity: glitchActive ? [1, 0.98, 1, 0.99, 1] : 1,
                // Brightness shift - reduced
                filter: glitchActive
                    ? [
                        "brightness(1) contrast(1) hue-rotate(0deg)",
                        "brightness(1.08) contrast(1.1) hue-rotate(1deg)",
                        "brightness(0.95) contrast(0.98) hue-rotate(-1deg)",
                        "brightness(1) contrast(1) hue-rotate(0deg)"
                    ]
                    : "brightness(1) contrast(1) hue-rotate(0deg)",
                // Horizontal distortion (skew) - subtle
                skewX: glitchActive ? [0, glitchIntensity * 3, -glitchIntensity * 2, 0] : 0,
                // Slight scale for screen tear effect
                scaleY: glitchActive ? [1, 0.99, 1.01, 1] : 1
            }}
            transition={{
                duration: glitchActive ? 0.15 : 0.3,
                ease: "easeInOut"
            }}
            className="w-full h-full"
        >
            {children}

            {/* RGB Split Effect Layer */}
            {glitchActive && (
                <>
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            mixBlendMode: "screen",
                            opacity: 0.15
                        }}
                        animate={{
                            x: [
                                glitchIntensity * 4,
                                -glitchIntensity * 4,
                                glitchIntensity * 2,
                                0
                            ]
                        }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366]/20 via-transparent to-transparent" />
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.1
                        }}
                        animate={{
                            x: [
                                -glitchIntensity * 3,
                                glitchIntensity * 3,
                                -glitchIntensity * 2,
                                0
                            ]
                        }}
                        transition={{ duration: 0.12 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-l from-[#00eaff]/20 via-transparent to-transparent" />
                    </motion.div>
                </>
            )}

            {/* Scan lines effect during glitch */}
            {glitchActive && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        backgroundPosition: ["0 0", "0 2px"]
                    }}
                    transition={{
                        duration: 0.05,
                        repeat: Infinity
                    }}
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.1) 0px, rgba(0,0,0,.1) 1px, transparent 1px, transparent 2px)",
                        opacity: 0.3
                    }}
                />
            )}
        </motion.div>
    );
}
