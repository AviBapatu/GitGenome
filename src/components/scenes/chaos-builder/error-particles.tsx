"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: string;
    x: number;
    y: number;
    text: string;
    duration: number;
    delay: number;
}

const errorTexts = ["undefined", "NaN", "null", "404", "⚠", "Error", "null ptr"];

export function ErrorParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate initial particles
        const initialParticles: Particle[] = [...Array(8)].map((_, i) => ({
            id: `particle-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            text: errorTexts[Math.floor(Math.random() * errorTexts.length)],
            duration: 8 + Math.random() * 6,
            delay: i * 0.5
        }));

        setParticles(initialParticles);

        // Add new particles occasionally
        const interval = setInterval(() => {
            const newParticle: Particle = {
                id: `particle-${Date.now()}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
                text: errorTexts[Math.floor(Math.random() * errorTexts.length)],
                duration: 10 + Math.random() * 8,
                delay: 0
            };
            setParticles(prev => [...prev.slice(-15), newParticle]); // Keep max 16 particles
        }, 3000 + Math.random() * 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none">
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute text-xs font-mono font-bold"
                    initial={{
                        x: `${particle.x}%`,
                        y: `${particle.y}%`,
                        opacity: 0,
                        scale: 0.5,
                        rotate: 0
                    }}
                    animate={{
                        x: `${particle.x + (Math.random() - 0.5) * 30}%`,
                        y: `${particle.y - 40}%`,
                        opacity: [0, 0.6, 0.4, 0],
                        scale: [0.5, 1, 0.8],
                        rotate: [0, Math.random() * 360]
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        color: ["undefined", "NaN", "null"].includes(particle.text)
                            ? "#00eaff"
                            : particle.text === "404"
                            ? "#ff3366"
                            : "#8a2be2",
                        textShadow: `0 0 8px ${
                            ["undefined", "NaN", "null"].includes(particle.text)
                                ? "rgba(0,234,255,0.6)"
                                : particle.text === "404"
                                ? "rgba(255,51,102,0.6)"
                                : "rgba(138,43,226,0.6)"
                        }`
                    }}
                >
                    {particle.text}
                </motion.div>
            ))}
        </div>
    );
}
