"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface NightBackgroundProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function NightBackground({ mouseX, mouseY }: NightBackgroundProps) {
    const [mounted, setMounted] = useState(false);
    const [currentHoverXY, setCurrentHoverXY] = useState<{ x: number, y: number }>({ x: -1000, y: -1000 });

    // 3 Tiers of Stars
    const [farStars, setFarStars] = useState<{ x: number; y: number }[]>([]);
    const [midStars, setMidStars] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);
    const [brightStars, setBrightStars] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);

    // Constellation points (static positions for drawing lines)
    // Roughly mapping an outline of an Owl
    const constellationPoints = [
        { x: 30, y: 30 }, { x: 35, y: 25 }, { x: 40, y: 30 }, // Ears / top head
        { x: 32, y: 35 }, { x: 38, y: 35 }, // Eyes area
        { x: 30, y: 45 }, { x: 40, y: 45 }, // Body
        { x: 35, y: 50 }, // Tail
    ];

    // Constellation lines (indices connecting the points above)
    const constellationLines = [
        [0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [5, 7], [6, 7]
    ];

    useEffect(() => {
        // Generate static stars
        const farData = [...Array(65)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
        }));

        const midData = [...Array(25)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 3, // 4-7s twinkle
        }));

        const brightData = [...Array(8)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 80, // keep bright stars mostly out of the very bottom tree line
            delay: Math.random() * 6,
            duration: 6 + Math.random() * 2, // 6-8s pulse
        }));

        setFarStars(farData);
        setMidStars(midData);
        setBrightStars(brightData);
        setMounted(true);
    }, []);

    // Interactive mouse tracking for constellation reveal
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCurrentHoverXY({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cinematic Parallax mappings
    // Mouse relative to center of screen (0 to internalWidth/Height goes to small px offsets)
    const farStarsX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [0, -1]);
    const farStarsY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [0, -1]);

    const midStarsX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [2, -2]);
    const midStarsY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [2, -2]);

    const brightStarsX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [4, -4]);
    const brightStarsY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [4, -4]);

    const moonX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [8, -8]);
    const moonY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [8, -8]);

    const cloudsX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);

    if (!mounted) return <div className="fixed inset-0 bg-[#0B1D3A]" />;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Pixar Sky Stack - Base Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, #0B1D3A 0%, #132A4A 40%, #1C3D6B 100%)`
                }}
            />

            {/* Pixar Sky Stack - Moon Atmospheric Wash (800px outer layer) */}
            <motion.div
                className="absolute top-[-200px] right-[-200px] w-[1200px] h-[1200px] rounded-full mix-blend-screen opacity-40 pointer-events-none"
                style={{
                    background: "radial-gradient(circle 50% 50%, rgba(138,171,255,0.4) 0%, rgba(138,171,255,0) 70%)",
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.45, 0.35] }}
                transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Pixar Sky Stack - Horizon Glow (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#2a4f8a]/40 to-transparent pointer-events-none" />

            {/* Subtle Noise Texture overlay (prevent banding) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

            {/* ENTIRE SKY DRIFT LAYER (Subtle Camera Drift) */}
            <motion.div
                className="absolute inset-0"
                animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }}
                transition={{
                    x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 30, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                {/* Far Stars (Tiny, Static, 1px) */}
                <motion.div className="absolute inset-0" style={{ x: farStarsX, y: farStarsY }}>
                    {farStars.map((star, i) => (
                        <div
                            key={`far-${i}`}
                            className="absolute w-[1px] h-[1px] bg-[#DCE7FF] opacity-40 rounded-full"
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        />
                    ))}
                </motion.div>

                {/* Mid Stars (2px, slow twinkle, cool tint with glow) */}
                <motion.div className="absolute inset-0" style={{ x: midStarsX, y: midStarsY }}>
                    {midStars.map((star, i) => (
                        <motion.div
                            key={`mid-${i}`}
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[2px] h-[2px] bg-[#DCE7FF] rounded-full shadow-[0_0_4px_rgba(220,231,255,0.8)]"
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        />
                    ))}
                </motion.div>

                {/* Bright Stars (3px, pulsing soft glow, cool tint) */}
                <motion.div className="absolute inset-0" style={{ x: brightStarsX, y: brightStarsY }}>
                    {brightStars.map((star, i) => (
                        <motion.div
                            key={`bright-${i}`}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.3, 1] }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[3px] h-[3px] bg-[#fff] rounded-full shadow-[0_0_8px_3px_rgba(220,231,255,0.7)]"
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        />
                    ))}
                </motion.div>

                {/* CONSTELLATION EASTER EGG */}
                <motion.div className="absolute inset-0" style={{ x: brightStarsX, y: brightStarsY }}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {constellationLines.map((line, i) => {
                            const p1 = constellationPoints[line[0]];
                            const p2 = constellationPoints[line[1]];

                            // Calculate distance to mouse for reveal (roughly estimating % to px)
                            // This is a rough estimation trick: we only really care if mouse is vaguely around top left quadrant
                            const isNear = currentHoverXY.x < (typeof window !== 'undefined' ? window.innerWidth * 0.45 : 400) &&
                                currentHoverXY.y < (typeof window !== 'undefined' ? window.innerHeight * 0.45 : 400);

                            return (
                                <motion.line
                                    key={`cline-${i}`}
                                    x1={`${p1.x}%`} y1={`${p1.y}%`}
                                    x2={`${p2.x}%`} y2={`${p2.y}%`}
                                    stroke="rgba(220,231,255,0.6)"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                    animate={{ opacity: isNear ? 0.6 : 0, strokeDashoffset: isNear ? [0, 20] : 0 }}
                                    transition={{
                                        opacity: { duration: 1.5, ease: "easeInOut" },
                                        strokeDashoffset: { duration: 10, repeat: Infinity, ease: "linear" }
                                    }}
                                />
                            );
                        })}
                        {constellationPoints.map((p, i) => {
                            const isNear = currentHoverXY.x < (typeof window !== 'undefined' ? window.innerWidth * 0.45 : 400) &&
                                currentHoverXY.y < (typeof window !== 'undefined' ? window.innerHeight * 0.45 : 400);

                            return (
                                <motion.circle
                                    key={`cpt-${i}`}
                                    cx={`${p.x}%`} cy={`${p.y}%`} r="3"
                                    fill="#fff"
                                    animate={{ opacity: isNear ? 1 : 0.2, scale: isNear ? [1, 1.5, 1] : 1 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                />
                            );
                        })}
                    </svg>
                </motion.div>

                {/* Clouds Layer - Very Slow & Blurred */}
                <motion.div
                    className="absolute inset-0 opacity-15 mix-blend-screen"
                    style={{ x: cloudsX }}
                >
                    <motion.div
                        animate={{ x: ["-20%", "120%"] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[15%] w-[900px] h-[400px] rounded-full blur-[100px] bg-[#6185c7]"
                        style={{ left: "-40%" }}
                    />
                    <motion.div
                        animate={{ x: ["-30%", "130%"] }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 10 }}
                        className="absolute top-[35%] w-[1100px] h-[500px] rounded-full blur-[120px] bg-[#4372ba]"
                        style={{ left: "-60%" }}
                    />
                </motion.div>

                {/* Moon Layer & Atmospheric Lighting */}
                <motion.div
                    className="absolute top-[10%] right-[15%]"
                    style={{ x: moonX, y: moonY }}
                >
                    {/* Outer Blue Halo (400px) */}
                    <motion.div
                        className="absolute inset-[-200px] rounded-full bg-[#8AABFF] blur-[100px] mix-blend-screen opacity-30 pointer-events-none"
                        animate={{ opacity: [0.25, 0.35, 0.25] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Inner White Glow (150px) */}
                    <div className="absolute inset-[-75px] rounded-full bg-white blur-[40px] mix-blend-screen opacity-50 pointer-events-none" />

                    {/* The Moon body (Warm E8E6D3, soft edge blur to mimic light scattering) */}
                    <div className="relative w-32 h-32 rounded-full shadow-[0_0_80px_rgba(232,230,211,0.6)] mix-blend-lighten blur-[1px]">
                        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, #ffffff, #E8E6D3 50%, #dcdac5)" }} />
                    </div>
                </motion.div>

                {/* Fireflies / Ambient Particles (Warm, Slow drifting) */}
                <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`firefly-${i}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.5, 0],
                                scale: [0.5, 1, 0.5],
                                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight * 0.5],
                                x: [
                                    Math.random() * window.innerWidth,
                                    Math.random() * window.innerWidth + (Math.random() - 0.5) * 300
                                ]
                            }}
                            transition={{
                                duration: 20 + Math.random() * 20,
                                repeat: Infinity,
                                delay: Math.random() * 15,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[2px] h-[2px] rounded-full bg-[#fbbf24] shadow-[0_0_8px_3px_rgba(251,191,36,0.6)] mix-blend-screen"
                        />
                    ))}
                </div>
            </motion.div> {/* End Camera Drift Wrap */}

            {/* Pixar Light Falloff under the Tree (Bottom Right) */}
            <div
                className="absolute bottom-0 right-0 w-[800px] h-[800px] pointer-events-none mix-blend-multiply"
                style={{ background: 'radial-gradient(circle at 100% 100%, #0a1526 0%, rgba(21,46,80,0.4) 50%, transparent 70%)' }}
            />

            {/* Vignette Effect Layer */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(4,10,21,0.8)] mix-blend-multiply" />
        </div>
    );
}
