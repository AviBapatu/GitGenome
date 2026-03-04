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

interface Props {
    /** 0–1 normalised mouse X position for parallax */
    mouseX?: number;
    /** 0–1 normalised mouse Y position for parallax */
    mouseY?: number;
}

export function WorkshopBackground({ mouseX = 0.5, mouseY = 0.5 }: Props) {
    const [dustMotes] = useState<DustMote[]>(() =>
        [...Array(14)].map(() => ({
            x: Math.random() * 100,
            startY: 40 + Math.random() * 60,
            targetY: 300 + Math.random() * 200,
            size: 1 + Math.random() * 2,
            duration: 18 + Math.random() * 14,
            delay: Math.random() * 10,
            drift: (Math.random() - 0.5) * 80,
        }))
    );
    const [leds] = useState<LED[]>(() => {
        const ledColors = ["#22d3ee", "#4ade80", "#f87171", "#facc15", "#818cf8"];
        return [...Array(9)].map((_, i) => ({
            x: 15 + Math.random() * 65,
            y: 18 + Math.random() * 40,
            color: ledColors[i % ledColors.length],
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
        }));
    });
    const [lampOn, setLampOn] = useState(false);
    const [monitorsOn, setMonitorsOn] = useState(false);

    useEffect(() => {
        // Entrance sequence: lamp on first, then monitors
        const lampTimer = setTimeout(() => setLampOn(true), 300);
        const monitorTimer = setTimeout(() => setMonitorsOn(true), 900);

        return () => {
            clearTimeout(lampTimer);
            clearTimeout(monitorTimer);
        };
    }, []);

    // Parallax offsets — wall moves slow, monitors medium
    const wallX = (mouseX - 0.5) * -12;
    const wallY = (mouseY - 0.5) * -6;
    const monitorX = (mouseX - 0.5) * -22;
    const monitorY = (mouseY - 0.5) * -10;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* ─── Base warm dark gradient ─── */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, #0f0a04 0%, #1a1208 30%, #231508 60%, #1c1007 100%)`,
                }}
            />

            {/* ─── LAYER 1: Pegboard wall (slowest parallax) ─── */}
            <motion.div
                className="absolute inset-0 top-0"
                style={{ height: "58%", translateX: wallX, translateY: wallY }}
            >
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1920 560"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Pegboard base panel */}
                    <rect width="1920" height="560" fill="#2d1f0e" opacity={0.9} />

                    {/* Pegboard holes grid */}
                    {Array.from({ length: 34 }, (_, col) =>
                        Array.from({ length: 10 }, (_, row) => (
                            <circle
                                key={`hole-${col}-${row}`}
                                cx={28 + col * 56}
                                cy={28 + row * 56}
                                r={5}
                                fill="#0f0a04"
                                opacity={0.85}
                            />
                        ))
                    )}

                    {/* Horizontal shelf plank */}
                    <rect x="0" y="340" width="1920" height="16" fill="#3d2a12" opacity={0.8} />
                    <rect x="0" y="340" width="1920" height="2" fill="#6b4a1e" opacity={0.5} />

                    {/* ── Hanging cables ── */}
                    <path d="M 190 0 Q 200 90, 186 180 Q 175 265, 192 340" stroke="#4a3520" strokeWidth="3.5" fill="none" opacity={0.55} />
                    <path d="M 210 0 Q 218 100, 206 190 Q 197 270, 212 340" stroke="#3d2a12" strokeWidth="2.5" fill="none" opacity={0.4} />
                    <path d="M 1590 0 Q 1585 110, 1600 210 Q 1610 285, 1590 340" stroke="#4a3520" strokeWidth="3.5" fill="none" opacity={0.5} />
                    <path d="M 1610 0 Q 1604 95, 1615 185 Q 1622 265, 1608 340" stroke="#5a4030" strokeWidth="2" fill="none" opacity={0.35} />
                    {/* USB cable hanging */}
                    <path d="M 900 0 Q 907 70, 898 140 Q 890 200, 902 260" stroke="#3a2a18" strokeWidth="2" fill="none" opacity={0.3} />

                    {/* ── WHITEBOARD (left wall section) ── */}
                    <g transform="translate(60, 40)">
                        <rect x="0" y="0" width="320" height="200" rx="4" fill="#e8e4d8" opacity={0.92} />
                        {/* Board frame */}
                        <rect x="0" y="0" width="320" height="200" rx="4" fill="none" stroke="#5a3a18" strokeWidth="4" />
                        {/* Eraser marks / smudge */}
                        <rect x="10" y="10" width="300" height="180" rx="3" fill="#f0ece0" opacity={0.4} />
                        {/* Title */}
                        <text x="30" y="34" fontSize="13" fill="#444" fontFamily="monospace" fontWeight="bold" opacity={0.85}>Framework Journey:</text>
                        {/* Main scribble diagram */}
                        <text x="25" y="68" fontSize="11" fill="#666" fontFamily="monospace" opacity={0.9}>React → Vue → Svelte → ????</text>
                        {/* Arrow decorations */}
                        <path d="M 25 80 Q 80 100, 60 120" stroke="#888" strokeWidth="1.5" fill="none" strokeDasharray="4,3" opacity={0.7} />
                        <path d="M 150 80 L 180 110 L 120 115" stroke="#e57" strokeWidth="1.5" fill="none" opacity={0.6} />
                        {/* Scribble text */}
                        <text x="25" y="102" fontSize="9" fill="#888" fontFamily="monospace" opacity={0.8}>microservices?</text>
                        <text x="140" y="130" fontSize="9" fill="#e57" fontFamily="monospace" opacity={0.75}>too much?</text>
                        <text x="50" y="148" fontSize="9" fill="#5a8" fontFamily="monospace" opacity={0.8}>just use Rails</text>
                        {/* Random arrows */}
                        <path d="M 200 50 L 240 90 M 240 90 L 235 80 M 240 90 L 230 87" stroke="#888" strokeWidth="1.5" fill="none" opacity={0.5} />
                        <path d="M 220 140 Q 260 120, 280 155" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity={0.6} />
                        <text x="210" y="170" fontSize="9" fill="#a78bfa" fontFamily="monospace" opacity={0.75}>always learning</text>
                        {/* Circle around something */}
                        <ellipse cx="178" cy="105" rx="28" ry="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.6} />
                    </g>

                    {/* ── PEGBOARD STICKERS (right wall, above shelf) ── */}
                    {/* React sticker */}
                    <g transform="translate(1380, 55)">
                        <rect x="0" y="0" width="70" height="52" rx="6" fill="#0e7490" opacity={0.85} />
                        <rect x="2" y="2" width="66" height="48" rx="5" fill="#0891b2" opacity={0.3} />
                        {/* React logo mini */}
                        <circle cx="35" cy="26" r="5" fill="#67e8f9" />
                        <ellipse cx="35" cy="26" rx="20" ry="8" fill="none" stroke="#67e8f9" strokeWidth="2" />
                        <ellipse cx="35" cy="26" rx="20" ry="8" fill="none" stroke="#67e8f9" strokeWidth="2" transform="rotate(60 35 26)" />
                        <ellipse cx="35" cy="26" rx="20" ry="8" fill="none" stroke="#67e8f9" strokeWidth="2" transform="rotate(120 35 26)" />
                        <text x="35" y="48" textAnchor="middle" fontSize="8" fill="#67e8f9" fontFamily="monospace" opacity={0.9}>React</text>
                    </g>
                    {/* Vue sticker */}
                    <g transform="translate(1470, 48)">
                        <rect x="0" y="0" width="64" height="52" rx="6" fill="#14532d" opacity={0.85} />
                        <path d="M 8 10 L 32 44 L 56 10 L 46 10 L 32 34 L 18 10 Z" fill="#4ade80" opacity={0.9} />
                        <text x="32" y="50" textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="monospace" opacity={0.9}>Vue</text>
                    </g>
                    {/* Angular sticker */}
                    <g transform="translate(1555, 55)">
                        <rect x="0" y="0" width="68" height="52" rx="6" fill="#7f1d1d" opacity={0.85} />
                        <path d="M 34 8 L 56 16 L 52 42 L 34 50 L 16 42 L 12 16 Z" fill="#f87171" opacity={0.85} />
                        <path d="M 22 40 L 34 16 L 46 40" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M 25 33 H 43" stroke="#7f1d1d" strokeWidth="2.5" />
                        <text x="34" y="52" textAnchor="middle" fontSize="7" fill="#f87171" fontFamily="monospace">Angular</text>
                    </g>
                    {/* Git sticker */}
                    <g transform="translate(1640, 52)">
                        <rect x="0" y="0" width="60" height="52" rx="6" fill="#7c2d12" opacity={0.85} />
                        <circle cx="30" cy="22" r="18" fill="none" stroke="#fb923c" strokeWidth="2.5" />
                        <path d="M 22 14 L 30 22 L 22 30 M 30 22 L 42 22" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <circle cx="22" cy="14" r="3" fill="#fb923c" />
                        <circle cx="22" cy="30" r="3" fill="#fb923c" />
                        <circle cx="38" cy="22" r="3" fill="#fb923c" />
                        <text x="30" y="48" textAnchor="middle" fontSize="8" fill="#fb923c" fontFamily="monospace">Git</text>
                    </g>

                    {/* ── Tool shelf items (right pegboard area) ── */}
                    <g transform="translate(1720, 50)">
                        {/* Shelf plank */}
                        <rect x="0" y="90" width="180" height="10" rx="2" fill="#3d2a12" opacity={0.9} />
                        {/* Screwdriver */}
                        <rect x="20" y="30" width="8" height="60" rx="3" fill="#8a8a8a" opacity={0.85} />
                        <rect x="19" y="30" width="10" height="18" rx="1" fill="#c8a060" opacity={0.9} />
                        <rect x="22" y="85" width="4" height="6" rx="0.5" fill="#6a6a6a" />
                        {/* Pliers */}
                        <path d="M 60 85 L 55 40 L 65 40 L 70 60 Z" fill="#7a7a7a" opacity={0.85} />
                        <path d="M 70 85 L 65 45 L 75 45 L 80 60 Z" fill="#6a6a6a" opacity={0.85} />
                        {/* Raspberry Pi silhouette */}
                        <rect x="100" y="30" width="65" height="52" rx="4" fill="#148c6e" opacity={0.85} />
                        <rect x="104" y="34" width="57" height="44" rx="3" fill="#0d6b52" opacity={0.3} />
                        {/* GPIO pins */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <rect key={`pin-${i}`} x={106 + i * 10} y={36} width={4} height={8} rx={1} fill="#c8a060" opacity={0.8} />
                        ))}
                        {/* HDMI port */}
                        <rect x="104" y="56" width="12" height="7" rx="1" fill="#1e1e2e" stroke="#888" strokeWidth="0.5" />
                        {/* USB ports */}
                        <rect x="150" y="46" width="14" height="9" rx="1" fill="#1e1e2e" stroke="#888" strokeWidth="0.5" />
                        <rect x="150" y="58" width="14" height="9" rx="1" fill="#1e1e2e" stroke="#888" strokeWidth="0.5" />
                        {/* LED */}
                        <circle cx="156" cy="73" r="3" fill="#4ade80" opacity={0.9} />
                    </g>

                    {/* Large post-it on pegboard */}
                    <g transform="translate(860, 60) rotate(-3)">
                        <rect x="0" y="0" width="110" height="80" rx="2" fill="#fef08a" opacity={0.92} />
                        <rect x="0" y="0" width="110" height="12" rx="2" fill="#facc15" opacity={0.95} />
                        <text x="10" y="28" fontSize="8.5" fill="#713f12" fontFamily="monospace" fontWeight="bold">npm install hope</text>
                        <text x="10" y="40" fontSize="7.5" fill="#713f12" fontFamily="monospace" opacity={0.8}>--save-sanity</text>
                        <text x="10" y="55" fontSize="7.5" fill="#92400e" fontFamily="monospace" opacity={0.7}>{"// TODO: read docs"}</text>
                        <text x="10" y="68" fontSize="7" fill="#92400e" fontFamily="monospace" opacity={0.6}>before installing</text>
                    </g>

                    {/* Smaller post-it */}
                    <g transform="translate(1000, 72) rotate(5)">
                        <rect x="0" y="0" width="85" height="60" rx="2" fill="#bbf7d0" opacity={0.88} />
                        <rect x="0" y="0" width="85" height="10" rx="2" fill="#86efac" opacity={0.95} />
                        <text x="8" y="25" fontSize="7.5" fill="#14532d" fontFamily="monospace">try Bun.js</text>
                        <text x="8" y="36" fontSize="7" fill="#14532d" fontFamily="monospace" opacity={0.8}>⚡ much faster</text>
                        <text x="8" y="50" fontSize="6.5" fill="#14532d" fontFamily="monospace" opacity={0.6}>(probably)</text>
                    </g>
                </svg>
            </motion.div>

            {/* ─── LAYER 2: Three Monitors (medium parallax) ─── */}
            <motion.div
                className="absolute pointer-events-none aspect-[680/380] max-w-full"
                style={{
                    right: "max(64px, 8vw)",
                    top: "12%",
                    width: "min(680px, 52vw)",
                    translateX: monitorX,
                    translateY: monitorY,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: monitorsOn ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <svg viewBox="0 0 680 380" className="w-full h-full">
                    <defs>
                        <filter id="monitorGlow" x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <clipPath id="screen1">
                            <rect x="8" y="8" width="174" height="120" rx="2" />
                        </clipPath>
                        <clipPath id="screen2">
                            <rect x="8" y="8" width="194" height="130" rx="2" />
                        </clipPath>
                        <clipPath id="screen3">
                            <rect x="8" y="8" width="174" height="120" rx="2" />
                        </clipPath>
                    </defs>

                    {/* ── Monitor 1: Terminal (left, further back) ── */}
                    <g transform="translate(30, 60)" opacity={0.82}>
                        {/* Stand */}
                        <rect x="78" y="138" width="18" height="30" rx="2" fill="#2a2a3a" />
                        <rect x="58" y="165" width="58" height="8" rx="3" fill="#222230" />
                        {/* Bezel */}
                        <rect x="0" y="0" width="190" height="140" rx="8" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="2" />
                        {/* Screen */}
                        <rect x="8" y="8" width="174" height="120" rx="2" fill="#0a0a14" />
                        {/* Terminal content */}
                        <g clipPath="url(#screen1)">
                            {/* Green text lines scrolling */}
                            {[
                                { y: 20, text: "$ npm install everything", color: "#4ade80" },
                                { y: 30, text: "⠙ fetching dependencies...", color: "#fbbf24" },
                                { y: 40, text: "✓ react@19.0.0", color: "#4ade80" },
                                { y: 50, text: "✓ next@15.2.0", color: "#4ade80" },
                                { y: 60, text: "✓ svelte@5.6.0", color: "#4ade80" },
                                { y: 70, text: "✓ astro@4.1.0", color: "#4ade80" },
                                { y: 80, text: "⚠ 847 vulnerabilities", color: "#f87171" },
                                { y: 90, text: "$ ", color: "#22d3ee" },
                                { y: 100, text: "[ run again? y/n ]", color: "#a78bfa" },
                            ].map(({ y, text, color }, i) => (
                                <text key={i} x="12" y={y} fontSize="6.5" fill={color} fontFamily="monospace" opacity={0.9}>{text}</text>
                            ))}
                            {/* Blinking cursor */}
                            <motion.rect
                                x="22" y="83" width="5" height="7"
                                fill="#22d3ee"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </g>
                        {/* Screen glow */}
                        <rect x="8" y="8" width="174" height="120" rx="2" fill="rgba(74,222,128,0.04)" />
                        {/* CRT flicker */}
                        <motion.rect
                            x="8" y="8" width="174" height="120" rx="2"
                            fill="rgba(74,222,128,0.06)"
                            animate={{ opacity: [0, 0.3, 0, 0.1, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 8 }}
                        />
                    </g>

                    {/* ── Monitor 2: React dev server (center, largest) ── */}
                    <g transform="translate(250, 41)">
                        {/* Stand */}
                        <rect x="93" y="150" width="22" height="36" rx="2" fill="#2a2a3a" />
                        <rect x="70" y="183" width="66" height="9" rx="3" fill="#222230" />
                        {/* Bezel */}
                        <rect x="0" y="0" width="210" height="150" rx="8" fill="#1e1e2e" stroke="#4a4a5a" strokeWidth="2.5" />
                        {/* Power button */}
                        <circle cx="200" cy="146" r="4" fill="#3a3a4a" />
                        {/* Screen */}
                        <rect x="8" y="8" width="194" height="130" rx="2" fill="#1a102a" />
                        {/* Dev server content */}
                        <g clipPath="url(#screen2)">
                            {/* Browser tab bar */}
                            <rect x="8" y="8" width="194" height="16" fill="#2a1040" />
                            <rect x="12" y="11" width="60" height="10" rx="3" fill="#3a1860" />
                            <text x="15" y="19" fontSize="5.5" fill="#a78bfa" fontFamily="monospace">localhost:3000</text>
                            {/* Nav bar */}
                            <rect x="8" y="28" width="194" height="8" fill="#150d28" />
                            <rect x="12" y="30" width="30" height="4" rx="1" fill="#a78bfa" opacity={0.6} />
                            <rect x="148" y="30" width="18" height="4" rx="1" fill="#818cf8" opacity={0.4} />
                            <rect x="170" y="30" width="22" height="4" rx="1" fill="#818cf8" opacity={0.4} />
                            {/* Content area */}
                            {[38, 46, 54, 62, 70, 78].map((y, i) => (
                                <rect key={i} x={12} y={y} width={60 + (i % 3) * 30} height={5} rx={1} fill="#4a3060" opacity={0.5 + i * 0.05} />
                            ))}
                            {/* Hot reload indicator */}
                            <motion.circle
                                cx="190" cy="14" r="4"
                                fill="#4ade80"
                                animate={{ opacity: [1, 0.3, 1], r: [4, 3, 4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            {/* Console area */}
                            <rect x="8" y="90" width="194" height="48" fill="#0e0a1e" />
                            <rect x="8" y="90" width="194" height="6" fill="#1a1430" />
                            <text x="12" y="94" fontSize="5" fill="#818cf8" fontFamily="monospace">Console  Network  Elements</text>
                            {[102, 109, 116, 123, 130, 137].map((y, i) => (
                                <text key={i} x="12" y={y} fontSize="5.5" fill={["#4ade80", "#fbbf24", "#f87171", "#4ade80", "#22d3ee", "#a78bfa"][i]} fontFamily="monospace" opacity={0.8}>
                                    {["▶ Component mounted", "⚠ prop-types warning", "✕ fetch failed 404", "▶ Hot reload done", "▶ State updated", "ℹ 3 items rendered"][i]}
                                </text>
                            ))}
                        </g>
                        {/* Screen glow — blue/purple tint */}
                        <rect x="8" y="8" width="194" height="130" rx="2" fill="rgba(167,139,250,0.04)" />
                    </g>

                    {/* ── Monitor 3: Console / logs (right, tilted) ── */}
                    <g transform="translate(490, 60)" opacity={0.82}>
                        {/* Stand */}
                        <rect x="78" y="138" width="18" height="30" rx="2" fill="#2a2a3a" />
                        <rect x="58" y="165" width="58" height="8" rx="3" fill="#222230" />
                        {/* Bezel */}
                        <rect x="0" y="0" width="190" height="140" rx="8" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="2" />
                        {/* Screen */}
                        <rect x="8" y="8" width="174" height="120" rx="2" fill="#0e0e18" />
                        <g clipPath="url(#screen3)">
                            {[
                                { y: 18, text: "[vite]  server ready", color: "#a78bfa" },
                                { y: 27, text: "[build] 0.34s", color: "#4ade80" },
                                { y: 36, text: "[warn]  unused import", color: "#fbbf24" },
                                { y: 45, text: "[error] ENOENT fonts", color: "#f87171" },
                                { y: 54, text: "[info]  HMR updated", color: "#22d3ee" },
                                { y: 63, text: "[build] 0.41s", color: "#4ade80" },
                                { y: 72, text: "[warn]  peer dep issue", color: "#fbbf24" },
                                { y: 81, text: "[info]  routes cached", color: "#22d3ee" },
                                { y: 90, text: "$ █", color: "#4ade80" },
                            ].map(({ y, text, color }, i) => (
                                <text key={i} x="12" y={y} fontSize="6" fill={color} fontFamily="monospace" opacity={0.85}>{text}</text>
                            ))}
                        </g>
                        <rect x="8" y="8" width="174" height="120" rx="2" fill="rgba(167,139,250,0.03)" />
                    </g>

                    {/* Desk surface connecting monitors */}
                    <rect x="0" y="340" width="680" height="40" fill="#2d1f0e" opacity={0.6} rx="2" />
                    <rect x="0" y="340" width="680" height="3" fill="#6b4a1e" opacity={0.4} />

                    {/* Connecting cables between monitors */}
                    <path d="M 230 190 Q 250 220, 260 210" stroke="#2a2a3a" strokeWidth="3" fill="none" opacity={0.6} strokeLinecap="round" />
                    <path d="M 460 195 Q 480 215, 500 205" stroke="#2a2a3a" strokeWidth="3" fill="none" opacity={0.5} strokeLinecap="round" />
                </svg>
            </motion.div>

            {/* ─── Overhead lamp warm glow ─── */}
            <motion.div
                className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 65% at 50% 0%, rgba(251,146,60,0.25) 0%, rgba(245,158,11,0.12) 35%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: lampOn ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "inherit",
                    }}
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Lamp fixture */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: lampOn ? 1 : 0, y: lampOn ? 0 : -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <svg width="130" height="80" viewBox="0 0 130 80">
                    {/* Cord */}
                    <line x1="65" y1="0" x2="65" y2="22" stroke="#3d2a12" strokeWidth="3.5" />
                    {/* Shade */}
                    <path d="M 28 22 L 42 60 L 88 60 L 102 22 Z" fill="#2d1f0e" stroke="#4a3520" strokeWidth="2" />
                    {/* Inner shade highlight */}
                    <path d="M 32 28 L 44 58 L 86 58 L 98 28 Z" fill="#3d2a12" opacity={0.6} />
                    {/* Bulb glow */}
                    <ellipse cx="65" cy="57" rx="12" ry="7" fill="#fef3c7" opacity={0.95} />
                    <motion.ellipse
                        cx="65" cy="57" rx="22" ry="12"
                        fill="#fbbf24"
                        opacity={0.4}
                        style={{ filter: "blur(3px)" }}
                        animate={{ rx: [22, 26, 22], opacity: [0.4, 0.55, 0.4] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>

            {/* ─── Floor — dark wood boards ─── */}
            <div
                className="absolute bottom-0 left-0 w-full h-[36%] pointer-events-none"
                style={{ background: "linear-gradient(180deg, #1a1208 0%, #0f0a04 100%)" }}
            />
            <svg
                className="absolute bottom-0 left-0 w-full pointer-events-none opacity-25"
                style={{ height: "36%" }}
                viewBox="0 0 1920 360"
                preserveAspectRatio="none"
            >
                {[30, 80, 140, 210, 290, 380].map((y, i) => (
                    <path
                        key={`grain-${i}`}
                        d={`M 0 ${y} Q 480 ${y + 6}, 960 ${y} Q 1440 ${y - 5}, 1920 ${y + 3}`}
                        stroke="#3d2a12"
                        strokeWidth="1.5"
                        fill="none"
                    />
                ))}
            </svg>

            {/* ─── Dust motes ─── */}
            {dustMotes.map((mote, i) => (
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

            {/* ─── Blinking LEDs ─── */}
            {leds.map((led, i) => (
                <motion.div
                    key={`led-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                    style={{
                        left: `${led.x}%`,
                        top: `${led.y}%`,
                        background: led.color,
                        boxShadow: `0 0 6px 3px ${led.color}`,
                    }}
                    animate={{ opacity: [1, 0.1, 1], scale: [1, 0.6, 1] }}
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
                    top: "57%",
                    height: "90px",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)",
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

            {/* Subtle grain texture */}
            <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
