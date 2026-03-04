"use client";

import { motion } from "framer-motion";

export function TechWorkbench() {
    return (
        <motion.div
            className="fixed bottom-0 right-0 z-10 pointer-events-none"
            style={{ width: "520px", height: "340px" }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <svg
                viewBox="0 0 520 340"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 -8px 30px rgba(245,158,11,0.15))" }}
            >
                <defs>
                    {/* Warm workshop light from above */}
                    <radialGradient id="benchLight" cx="45%" cy="0%" r="80%">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0f0a04" stopOpacity="0" />
                    </radialGradient>
                    {/* Wood grain gradient */}
                    <linearGradient id="woodGrain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5c3d1e" />
                        <stop offset="40%" stopColor="#4a2e12" />
                        <stop offset="100%" stopColor="#3a2410" />
                    </linearGradient>
                    {/* Bench top surface */}
                    <linearGradient id="benchTop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6b4a1e" />
                        <stop offset="100%" stopColor="#4a3010" />
                    </linearGradient>
                    {/* Sketch filter for hand-drawn effect */}
                    <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>

                {/* Workbench main surface */}
                <rect x="0" y="155" width="520" height="18" fill="url(#benchTop)" rx="2" filter="url(#sketch)" />
                <rect x="0" y="170" width="520" height="170" fill="url(#woodGrain)" />

                {/* Wood grain lines */}
                <path d="M 0 180 Q 130 178, 260 181 Q 390 183, 520 180" stroke="#5a3a18" strokeWidth="1" fill="none" opacity={0.4} />
                <path d="M 0 205 Q 150 202, 310 204 Q 420 206, 520 203" stroke="#3a2410" strokeWidth="1" fill="none" opacity={0.3} />
                <path d="M 0 230 Q 100 228, 260 231 Q 410 233, 520 229" stroke="#5a3a18" strokeWidth="1" fill="none" opacity={0.35} />

                {/* Warm light overlay on bench */}
                <rect x="0" y="155" width="520" height="185" fill="url(#benchLight)" opacity={0.5} />

                {/* ─── SCATTERED OBJECTS ─── */}

                {/* Laptop (closed, tilted slightly) */}
                <g transform="translate(30, 80) rotate(-5)">
                    {/* Screen back */}
                    <rect x="0" y="0" width="90" height="60" rx="4" fill="#1e1e2e" stroke="#4a4a5a" strokeWidth="1.5" />
                    {/* Screen face */}
                    <rect x="3" y="3" width="84" height="54" rx="3" fill="#2d2d3f" />
                    {/* Screen glow – tiny terminal text */}
                    <rect x="10" y="10" width="40" height="3" rx="1" fill="#22d3ee" opacity={0.6} />
                    <rect x="10" y="16" width="60" height="3" rx="1" fill="#4ade80" opacity={0.5} />
                    <rect x="10" y="22" width="50" height="3" rx="1" fill="#f9a8d4" opacity={0.5} />
                    {/* Hinge */}
                    <rect x="0" y="58" width="90" height="5" rx="2" fill="#3a3a4a" />
                    {/* Base */}
                    <rect x="-3" y="63" width="96" height="8" rx="3" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1" />
                    {/* Apple sticker area */}
                    <circle cx="45" cy="30" r="8" fill="#1a1a2a" opacity={0.5} />
                </g>

                {/* Keyboard */}
                <g transform="translate(155, 128) rotate(3)">
                    <rect x="0" y="0" width="140" height="42" rx="5" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1.5" filter="url(#sketch)" />
                    {/* Key rows */}
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
                    {/* Space bar */}
                    <rect x="35" y="31" width="70" height="7" rx="1.5" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth={0.5} />
                </g>

                {/* Coffee mug */}
                <g transform="translate(320, 100)">
                    {/* Mug body */}
                    <path d="M 0 10 Q 0 0, 8 0 L 38 0 Q 46 0, 46 10 L 44 55 Q 44 60, 40 60 L 6 60 Q 2 60, 2 55 Z" fill="#8B4513" stroke="#6b3410" strokeWidth="1.5" />
                    {/* Mug handle */}
                    <path d="M 44 15 Q 62 15, 62 32 Q 62 50, 44 50" stroke="#6b3410" strokeWidth="3" fill="none" strokeLinecap="round" />
                    {/* Coffee surface */}
                    <ellipse cx="23" cy="3" rx="20" ry="5" fill="#3d1e00" />
                    {/* Steam lines */}
                    <motion.g
                        animate={{ y: [-4, -14], opacity: [0.6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    >
                        <path d="M 12 -2 Q 14 -8, 12 -14" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                        <path d="M 22 -2 Q 25 -9, 22 -16" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
                        <path d="M 32 -2 Q 30 -8, 32 -13" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                    </motion.g>
                    {/* GitGenome text on mug */}
                    <text x="23" y="38" textAnchor="middle" fontSize="7" fill="#f9a8d4" fontFamily="monospace" opacity={0.7}>&lt;/&gt;</text>
                </g>

                {/* Circuit board */}
                <g transform="translate(395, 112) rotate(-8)">
                    <rect x="0" y="0" width="80" height="50" rx="3" fill="#0d4d2a" stroke="#1a6b38" strokeWidth="1.5" />
                    {/* Traces */}
                    <path d="M 10 10 H 30 V 25 H 50" stroke="#22d3ee" strokeWidth="1" fill="none" opacity={0.7} />
                    <path d="M 10 35 H 25 V 20 H 70" stroke="#4ade80" strokeWidth="1" fill="none" opacity={0.6} />
                    <path d="M 60 10 V 40" stroke="#f59e0b" strokeWidth="1" fill="none" opacity={0.5} />
                    {/* Components */}
                    <rect x="30" y="20" width="12" height="8" rx="1" fill="#1a6b38" stroke="#22d3ee" strokeWidth="0.5" />
                    <circle cx="55" cy="35" r="5" fill="#0d4d2a" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="12" y="8" width="8" height="5" rx="0.5" fill="#333" stroke="#22d3ee" strokeWidth="0.5" />
                    {/* Solder points */}
                    {[[10, 10], [30, 10], [50, 25], [70, 20], [10, 35]].map(([x, y], i) => (
                        <circle key={`solder-${i}`} cx={x} cy={y} r={2} fill="#c0a060" opacity={0.8} />
                    ))}
                </g>

                {/* Framework sticker blobs on bench surface */}
                {/* React sticker */}
                <g transform="translate(80, 160)">
                    <ellipse cx="18" cy="10" rx="18" ry="10" fill="#0e7490" opacity={0.6} />
                    <text x="18" y="14" textAnchor="middle" fontSize="8" fill="#22d3ee" fontFamily="monospace" opacity={0.9}>React</text>
                </g>
                {/* Vue sticker */}
                <g transform="translate(245, 162)">
                    <ellipse cx="15" cy="9" rx="15" ry="8" fill="#166534" opacity={0.6} />
                    <text x="15" y="13" textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="monospace" opacity={0.9}>Vue</text>
                </g>
                {/* Svelte sticker */}
                <g transform="translate(350, 165)">
                    <ellipse cx="18" cy="9" rx="18" ry="8" fill="#7c2d12" opacity={0.6} />
                    <text x="18" y="13" textAnchor="middle" fontSize="8" fill="#fb923c" fontFamily="monospace" opacity={0.9}>Svelte</text>
                </g>

                {/* USB hub */}
                <g transform="translate(460, 148)">
                    <rect x="0" y="0" width="45" height="22" rx="4" fill="#1e1e2e" stroke="#4a4a5a" strokeWidth="1.5" />
                    {[6, 19, 32].map((x, i) => (
                        <rect key={`usb-${i}`} x={x} y={5} width={9} height={12} rx="1" fill="#0f0f1e" stroke="#3a3a4a" strokeWidth="0.5" />
                    ))}
                    {/* Activity LED */}
                    <circle cx="41" cy="5" r="2" fill="#22d3ee" opacity={0.9} />
                </g>

                {/* Scattered small items: resistors, screws */}
                <circle cx="140" cy="165" r="2" fill="#9a8060" opacity={0.7} />
                <circle cx="280" cy="168" r="1.5" fill="#9a8060" opacity={0.6} />
                <circle cx="460" cy="170" r="2" fill="#9a8060" opacity={0.7} />

                {/* Post-it note */}
                <g transform="translate(200, 90) rotate(-12)">
                    <rect x="0" y="0" width="55" height="45" rx="2" fill="#fef08a" opacity={0.9} />
                    <rect x="0" y="0" width="55" height="8" rx="2" fill="#facc15" opacity={0.9} />
                    <text x="6" y="22" fontSize="5.5" fill="#713f12" fontFamily="monospace">TODO:</text>
                    <text x="6" y="30" fontSize="5" fill="#713f12" fontFamily="monospace" opacity={0.8}>try Astro</text>
                    <text x="6" y="38" fontSize="5" fill="#713f12" fontFamily="monospace" opacity={0.8}>again?</text>
                </g>
            </svg>
        </motion.div>
    );
}
