"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function TechWorkbench() {
    const toolboxControls = useAnimation();

    // Periodic toolbox shake every ~12s
    useEffect(() => {
        const shake = async () => {
            await toolboxControls.start({
                x: [-2, 3, -3, 2, -1, 0],
                rotate: [-1, 1.5, -1.5, 1, 0],
                transition: { duration: 0.45, ease: "easeInOut" },
            });
        };
        const interval = setInterval(shake, 12000 + Math.random() * 4000);
        // First shake after 5 seconds
        const initial = setTimeout(shake, 5000);
        return () => {
            clearInterval(interval);
            clearTimeout(initial);
        };
    }, [toolboxControls]);

    return (
        <motion.div
            className="fixed bottom-0 right-0 z-10 pointer-events-none translate-x-4 sm:translate-x-6 w-[min(840px,98vw)] aspect-[720/440]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <svg
                viewBox="0 0 720 440"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 -8px 30px rgba(245,158,11,0.18))" }}
            >
                <defs>
                    <radialGradient id="benchLight" cx="45%" cy="0%" r="80%">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#0f0a04" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="woodGrain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5c3d1e" />
                        <stop offset="40%" stopColor="#4a2e12" />
                        <stop offset="100%" stopColor="#3a2410" />
                    </linearGradient>
                    <linearGradient id="benchTop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6b4a1e" />
                        <stop offset="100%" stopColor="#4a3010" />
                    </linearGradient>
                    <linearGradient id="metalBox" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7a7a8a" />
                        <stop offset="100%" stopColor="#4a4a5a" />
                    </linearGradient>
                    <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>

                {/* Workbench main surface */}
                <rect x="0" y="168" width="580" height="18" fill="url(#benchTop)" rx="2" filter="url(#sketch)" />
                <rect x="0" y="183" width="580" height="177" fill="url(#woodGrain)" />

                {/* Wood grain lines */}
                <path d="M 0 192 Q 145 190, 290 193 Q 435 195, 580 191" stroke="#5a3a18" strokeWidth="1" fill="none" opacity={0.4} />
                <path d="M 0 218 Q 165 215, 325 217 Q 460 219, 580 216" stroke="#3a2410" strokeWidth="1" fill="none" opacity={0.3} />
                <path d="M 0 244 Q 110 242, 290 245 Q 450 247, 580 243" stroke="#5a3a18" strokeWidth="1" fill="none" opacity={0.35} />

                {/* Warm light overlay */}
                <rect x="0" y="168" width="580" height="192" fill="url(#benchLight)" opacity={0.5} />

                {/* ─── OBJECTS ─── */}

                {/* Laptop (closed, tilted) */}
                <g transform="translate(28, 90) rotate(-5)">
                    <rect x="0" y="0" width="95" height="65" rx="4" fill="#1e1e2e" stroke="#4a4a5a" strokeWidth="1.5" />
                    <rect x="3" y="3" width="89" height="59" rx="3" fill="#2d2d3f" />
                    {/* Screen content */}
                    <rect x="10" y="10" width="44" height="3" rx="1" fill="#22d3ee" opacity={0.65} />
                    <rect x="10" y="16" width="64" height="3" rx="1" fill="#4ade80" opacity={0.55} />
                    <rect x="10" y="22" width="52" height="3" rx="1" fill="#f9a8d4" opacity={0.5} />
                    <rect x="10" y="28" width="38" height="3" rx="1" fill="#a78bfa" opacity={0.5} />
                    <rect x="10" y="34" width="58" height="3" rx="1" fill="#22d3ee" opacity={0.4} />
                    <rect x="10" y="40" width="48" height="3" rx="1" fill="#fbbf24" opacity={0.4} />
                    {/* Screen glow */}
                    <rect x="3" y="3" width="89" height="59" rx="3" fill="rgba(34,211,238,0.04)" />
                    {/* Hinge */}
                    <rect x="0" y="62" width="95" height="5" rx="2" fill="#3a3a4a" />
                    {/* Base */}
                    <rect x="-4" y="67" width="103" height="9" rx="3" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1" />
                    {/* Logo sticker area */}
                    <circle cx="48" cy="32" r="9" fill="#1a1a2a" opacity={0.4} />
                </g>

                {/* Keyboard */}
                <g transform="translate(162, 138) rotate(3)">
                    <rect x="0" y="0" width="148" height="44" rx="5" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1.5" filter="url(#sketch)" />
                    {[0, 1, 2, 3].map((row) =>
                        [...Array(12 + (row === 0 ? 2 : 0) - row)].map((_, col) => (
                            <rect
                                key={`key-${row}-${col}`}
                                x={5 + col * 11 + row * 2}
                                y={5 + row * 9}
                                width={9}
                                height={7}
                                rx={1.5}
                                fill="#1e1e2e"
                                stroke="#3a3a4a"
                                strokeWidth={0.5}
                            />
                        ))
                    )}
                    <rect x="34" y="31" width="80" height="8" rx="1.5" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth={0.5} />
                </g>

                {/* Coffee mug */}
                <g transform="translate(338, 106)">
                    <path d="M 0 10 Q 0 0, 8 0 L 42 0 Q 50 0, 50 10 L 48 58 Q 48 63, 44 63 L 6 63 Q 2 63, 2 58 Z" fill="#8B4513" stroke="#6b3410" strokeWidth="1.5" />
                    <path d="M 48 16 Q 68 16, 68 34 Q 68 52, 48 52" stroke="#6b3410" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <ellipse cx="25" cy="3" rx="22" ry="5.5" fill="#3d1e00" />
                    <motion.g
                        animate={{ y: [-4, -16], opacity: [0.6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    >
                        <path d="M 12 -2 Q 14 -9, 12 -16" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                        <path d="M 23 -2 Q 26 -10, 23 -18" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
                        <path d="M 34 -2 Q 32 -9, 34 -15" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                    </motion.g>
                    <text x="25" y="40" textAnchor="middle" fontSize="7.5" fill="#f9a8d4" fontFamily="monospace" opacity={0.75}>{"</>"}</text>
                </g>

                {/* Book stack — "New JS Framework of the Week" */}
                <g transform="translate(408, 112)">
                    {/* Bottom book */}
                    <rect x="0" y="52" width="72" height="18" rx="2" fill="#4a1942" stroke="#6b2a5e" strokeWidth="1" />
                    <text x="36" y="64" textAnchor="middle" fontSize="5.5" fill="#f0abfc" fontFamily="monospace" opacity={0.8}>Clean Code</text>
                    {/* Middle book */}
                    <rect x="2" y="34" width="70" height="19" rx="2" fill="#1e3a5f" stroke="#2a5080" strokeWidth="1" />
                    <text x="37" y="47" textAnchor="middle" fontSize="5" fill="#7dd3fc" fontFamily="monospace" opacity={0.85}>You Don&apos;t Know JS</text>
                    {/* Top book — the funny one */}
                    <rect x="0" y="10" width="72" height="25" rx="2" fill="#14532d" stroke="#16a34a" strokeWidth="1" />
                    <text x="36" y="22" textAnchor="middle" fontSize="5" fill="#86efac" fontFamily="monospace" opacity={0.9}>New JS Framework</text>
                    <text x="36" y="30" textAnchor="middle" fontSize="5" fill="#86efac" fontFamily="monospace" opacity={0.9}>of the Week</text>
                    {/* Leaning slightly */}
                    <rect x="72" y="12" width="6" height="66" rx="1" fill="#2d1f0e" opacity={0.6} />
                </g>

                {/* Circuit board */}
                <g transform="translate(498, 120) rotate(-6)">
                    <rect x="0" y="0" width="72" height="48" rx="3" fill="#0d4d2a" stroke="#1a6b38" strokeWidth="1.5" />
                    <path d="M 10 10 H 30 V 25 H 50" stroke="#22d3ee" strokeWidth="1" fill="none" opacity={0.7} />
                    <path d="M 10 36 H 25 V 20 H 68" stroke="#4ade80" strokeWidth="1" fill="none" opacity={0.6} />
                    <path d="M 56 10 V 40" stroke="#f59e0b" strokeWidth="1" fill="none" opacity={0.55} />
                    <rect x="28" y="19" width="14" height="9" rx="1" fill="#1a6b38" stroke="#22d3ee" strokeWidth="0.5" />
                    <circle cx="50" cy="34" r="5" fill="#0d4d2a" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="12" y="8" width="8" height="5" rx="0.5" fill="#333" stroke="#22d3ee" strokeWidth="0.5" />
                    {[[10, 10], [30, 10], [50, 25], [68, 20], [10, 36]].map(([x, y], i) => (
                        <circle key={`solder-${i}`} cx={x} cy={y} r={2} fill="#c0a060" opacity={0.8} />
                    ))}
                    {/* Arduino-style label */}
                    <text x="36" y="47" textAnchor="middle" fontSize="5" fill="#4ade80" fontFamily="monospace" opacity={0.7}>ARDUINO</text>
                </g>

                {/* Hard drive stack */}
                <g transform="translate(500, 168)">
                    {[0, 1, 2].map((i) => (
                        <g key={`hd-${i}`} transform={`translate(0, ${i * 18})`}>
                            <rect x="0" y="0" width="68" height="16" rx="3" fill={i % 2 === 0 ? "#1e1e2e" : "#2a2a3a"} stroke="#4a4a5a" strokeWidth="1" />
                            <rect x="4" y="4" width="48" height="8" rx="1.5" fill="#0f0f1e" />
                            <circle cx="60" cy="8" r="3" fill={i === 0 ? "#22d3ee" : "#4a4a5a"} opacity={i === 0 ? 0.9 : 0.5} />
                            <text x="28" y="11" textAnchor="middle" fontSize="5" fill="#6a6a8a" fontFamily="monospace" opacity={0.7}>{`HDD-0${i + 1}`}</text>
                        </g>
                    ))}
                </g>

                {/* Toolbox — bottom right */}
                <motion.g transform="translate(498, 230)" animate={toolboxControls}>
                    {/* Box body */}
                    <rect x="0" y="12" width="70" height="50" rx="4" fill="url(#metalBox)" stroke="#6a6a7a" strokeWidth="1.5" />
                    {/* Lid */}
                    <rect x="0" y="0" width="70" height="16" rx="4" fill="#8a8a9a" stroke="#aaaaaa" strokeWidth="1" />
                    {/* Handle */}
                    <path d="M 22 0 Q 22 -8, 35 -8 Q 48 -8, 48 0" stroke="#aaaaaa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    {/* Latch */}
                    <rect x="30" y="13" width="10" height="6" rx="2" fill="#c8a060" stroke="#a08040" strokeWidth="0.5" />
                    {/* Stripes */}
                    <rect x="0" y="30" width="70" height="3" fill="#5a5a6a" opacity={0.5} />
                    <rect x="0" y="48" width="70" height="3" fill="#5a5a6a" opacity={0.4} />
                    {/* Shadow */}
                    <ellipse cx="35" cy="65" rx="32" ry="5" fill="black" opacity={0.3} style={{ filter: "blur(4px)" }} />
                </motion.g>

                {/* Framework stickers on bench */}
                <g transform="translate(82, 173)">
                    <ellipse cx="20" cy="10" rx="20" ry="10" fill="#0e7490" opacity={0.65} />
                    <text x="20" y="14" textAnchor="middle" fontSize="8" fill="#22d3ee" fontFamily="monospace" opacity={0.95}>React</text>
                </g>
                <g transform="translate(262, 176)">
                    <ellipse cx="15" cy="9" rx="15" ry="9" fill="#166534" opacity={0.65} />
                    <text x="15" y="13" textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="monospace" opacity={0.95}>Vue</text>
                </g>
                <g transform="translate(368, 178)">
                    <ellipse cx="20" cy="9" rx="20" ry="9" fill="#7c2d12" opacity={0.65} />
                    <text x="20" y="13" textAnchor="middle" fontSize="8" fill="#fb923c" fontFamily="monospace" opacity={0.95}>Svelte</text>
                </g>

                {/* USB hub */}
                <g transform="translate(488, 162)">
                    <rect x="0" y="0" width="48" height="22" rx="4" fill="#1e1e2e" stroke="#4a4a5a" strokeWidth="1.5" />
                    {[6, 19, 32].map((x, i) => (
                        <rect key={`usb-${i}`} x={x} y={5} width={9} height={12} rx="1" fill="#0f0f1e" stroke="#3a3a4a" strokeWidth="0.5" />
                    ))}
                    <motion.circle
                        cx="44" cy="5" r="2.5"
                        fill="#22d3ee"
                        animate={{ opacity: [0.9, 0.2, 0.9] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                    />
                </g>

                {/* Small scattered items */}
                <circle cx="148" cy="178" r="2" fill="#9a8060" opacity={0.7} />
                <circle cx="295" cy="180" r="1.5" fill="#9a8060" opacity={0.6} />
                <circle cx="465" cy="182" r="2" fill="#9a8060" opacity={0.7} />
                <rect x="220" y="174" width="8" height="3" rx="0.5" fill="#c8a060" opacity={0.5} />

                {/* Post-it note */}
                <g transform="translate(200, 98) rotate(-10)">
                    <rect x="0" y="0" width="58" height="48" rx="2" fill="#fef08a" opacity={0.92} />
                    <rect x="0" y="0" width="58" height="9" rx="2" fill="#facc15" opacity={0.95} />
                    <text x="6" y="22" fontSize="5.5" fill="#713f12" fontFamily="monospace">TODO:</text>
                    <text x="6" y="31" fontSize="5" fill="#713f12" fontFamily="monospace" opacity={0.8}>try Astro</text>
                    <text x="6" y="40" fontSize="5" fill="#713f12" fontFamily="monospace" opacity={0.8}>again? 😅</text>
                </g>
            </svg>
        </motion.div>
    );
}
