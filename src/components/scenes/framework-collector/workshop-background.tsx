"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DustMote {
    x: number;
    startY: number;
    targetY: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

interface LED {
    x: number;
    y: number;
    color: string;
    duration: number;
    delay: number;
}

export function WorkshopBackground() {
    const [mounted, setMounted] = useState(false);
    const [dustMotes, setDustMotes] = useState<DustMote[]>([]);
    const [leds, setLEDs] = useState<LED[]>([]);

    useEffect(() => {
        const motes: DustMote[] = [...Array(10)].map(() => ({
            x: Math.random() * 100,
            startY: 40 + Math.random() * 60,
            targetY: 300 + Math.random() * 200,
            size: 1 + Math.random() * 2,
            duration: 18 + Math.random() * 14,
            delay: Math.random() * 10,
            drift: (Math.random() - 0.5) * 80,
        }));

        const ledColors = ["#22d3ee", "#4ade80", "#f87171", "#facc15", "#818cf8"];
        const ledData: LED[] = [...Array(7)].map((_, i) => ({
            x: 15 + Math.random() * 65,
            y: 18 + Math.random() * 40,
            color: ledColors[i % ledColors.length],
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
        }));

        setDustMotes(motes);
        setLEDs(ledData);
        setMounted(true);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base warm dark gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, #0f0a04 0%, #1a1208 30%, #231508 60%, #1c1007 100%)`,
                }}
            />

            {/* Pegboard wall - top half */}
            <div className="absolute inset-0 top-0" style={{ height: "55%" }}>
                <svg
                    className="w-full h-full opacity-20"
                    viewBox="0 0 1920 540"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Pegboard base panel */}
                    <rect width="1920" height="540" fill="#2d1f0e" />

                    {/* Pegboard holes grid */}
                    {Array.from({ length: 32 }, (_, col) =>
                        Array.from({ length: 9 }, (_, row) => (
                            <circle
                                key={`hole-${col}-${row}`}
                                cx={30 + col * 58}
                                cy={30 + row * 58}
                                r={5}
                                fill="#0f0a04"
                                opacity={0.8}
                            />
                        ))
                    )}

                    {/* Horizontal shelf planks */}
                    <rect x="0" y="310" width="1920" height="14" fill="#3d2a12" opacity={0.7} />
                    <rect x="0" y="310" width="1920" height="2" fill="#6b4a1e" opacity={0.5} />

                    {/* Hanging cable suggestion (left) */}
                    <path
                        d="M 200 0 Q 210 80, 195 160 Q 185 240, 200 310"
                        stroke="#4a3520"
                        strokeWidth="3"
                        fill="none"
                        opacity={0.5}
                    />
                    <path
                        d="M 220 0 Q 228 90, 215 170 Q 205 250, 220 310"
                        stroke="#3d2a12"
                        strokeWidth="2"
                        fill="none"
                        opacity={0.4}
                    />

                    {/* Hanging cable (right) */}
                    <path
                        d="M 1600 0 Q 1595 100, 1610 200 Q 1620 280, 1600 310"
                        stroke="#4a3520"
                        strokeWidth="3"
                        fill="none"
                        opacity={0.4}
                    />
                </svg>
            </div>

            {/* Overhead lamp warm glow — hero element */}
            <motion.div
                className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(251,146,60,0.22) 0%, rgba(245,158,11,0.10) 35%, transparent 70%)",
                }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Lamp fixture SVG */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
                <svg width="120" height="70" viewBox="0 0 120 70">
                    {/* Cord */}
                    <line x1="60" y1="0" x2="60" y2="20" stroke="#3d2a12" strokeWidth="3" />
                    {/* Shade */}
                    <path d="M 25 20 L 40 55 L 80 55 L 95 20 Z" fill="#2d1f0e" stroke="#4a3520" strokeWidth="1.5" />
                    {/* Bulb glow */}
                    <ellipse cx="60" cy="52" rx="10" ry="6" fill="#fef3c7" opacity={0.9} />
                    <ellipse cx="60" cy="52" rx="18" ry="10" fill="#fbbf24" opacity={0.3} style={{ filter: "blur(3px)" }} />
                </svg>
            </div>

            {/* Floor — dark wood boards */}
            <div
                className="absolute bottom-0 left-0 w-full h-[38%] pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, #1a1208 0%, #0f0a04 100%)",
                }}
            />

            {/* Floor wood grain lines */}
            <svg
                className="absolute bottom-0 left-0 w-full pointer-events-none opacity-20"
                style={{ height: "38%" }}
                viewBox="0 0 1920 360"
                preserveAspectRatio="none"
            >
                {[40, 90, 150, 220, 300].map((y, i) => (
                    <path
                        key={`grain-${i}`}
                        d={`M 0 ${y} Q 480 ${y + 6}, 960 ${y} Q 1440 ${y - 5}, 1920 ${y + 3}`}
                        stroke="#3d2a12"
                        strokeWidth="1.5"
                        fill="none"
                    />
                ))}
            </svg>

            {/* Dust motes floating upward */}
            {mounted &&
                dustMotes.map((mote, i) => (
                    <motion.div
                        key={`mote-${i}`}
                        className="absolute rounded-full bg-amber-100/30 pointer-events-none"
                        style={{
                            width: mote.size,
                            height: mote.size,
                            left: `${mote.x}%`,
                            bottom: `${mote.startY - 40}%`,
                        }}
                        animate={{
                            y: [0, -mote.targetY],
                            x: [0, mote.drift],
                            opacity: [0, 0.6, 0.4, 0],
                        }}
                        transition={{
                            duration: mote.duration,
                            delay: mote.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}

            {/* Blinking LEDs on the pegboard */}
            {mounted &&
                leds.map((led, i) => (
                    <motion.div
                        key={`led-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                        style={{
                            left: `${led.x}%`,
                            top: `${led.y}%`,
                            background: led.color,
                            boxShadow: `0 0 6px 2px ${led.color}`,
                        }}
                        animate={{ opacity: [1, 0.1, 1], scale: [1, 0.7, 1] }}
                        transition={{
                            duration: led.duration,
                            delay: led.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

            {/* Wall-to-floor transition shadow */}
            <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                    top: "55%",
                    height: "80px",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />

            {/* Subtle paper/grain texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
