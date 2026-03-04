"use client";

import { motion } from "framer-motion";

export function WoodConstruction() {
    return (
        <div className="absolute bottom-0 right-0 w-1/2 h-2/3 pointer-events-none">
            <svg viewBox="0 0 600 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="woodLog1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B6F47" />
                        <stop offset="50%" stopColor="#A0826D" />
                        <stop offset="100%" stopColor="#7A5C3E" />
                    </linearGradient>
                    <linearGradient id="woodLog2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9B7D57" />
                        <stop offset="50%" stopColor="#B0927D" />
                        <stop offset="100%" stopColor="#8A6C4E" />
                    </linearGradient>
                </defs>

                {/* Dam structure - layered logs */}

                {/* Bottom foundation logs */}
                <motion.rect
                    x="50" y="600" width="280" height="28"
                    rx="14"
                    fill="url(#woodLog1)"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />

                {/* Second layer logs */}
                <motion.rect
                    x="80" y="560" width="250" height="26"
                    rx="13"
                    fill="url(#woodLog2)"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />

                {/* Third layer logs */}
                <motion.rect
                    x="110" y="520" width="220" height="25"
                    rx="12"
                    fill="url(#woodLog1)"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />

                {/* Fourth layer logs */}
                <motion.rect
                    x="130" y="480" width="190" height="24"
                    rx="12"
                    fill="url(#woodLog2)"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />

                {/* Top logs */}
                <motion.rect
                    x="150" y="440" width="160" height="23"
                    rx="11"
                    fill="url(#woodLog1)"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />

                {/* Construction tools scattered around */}

                {/* Hammer */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <rect x="350" y="600" width="6" height="50" fill="#7A5C3E" rx="3" />
                    <rect x="338" y="585" width="30" height="20" fill="#C8A97E" rx="2" />
                </motion.g>

                {/* Rope coil */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <circle cx="420" cy="620" r="15" fill="none" stroke="#8B6F47" strokeWidth="3" />
                    <circle cx="420" cy="620" r="10" fill="none" stroke="#8B6F47" strokeWidth="2" opacity="0.6" />
                </motion.g>

                {/* Logs leaning against dam */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <line x1="380" y1="450" x2="420" y2="600" stroke="url(#woodLog1)" strokeWidth="18" strokeLinecap="round" opacity="0.8" />
                    <line x1="450" y1="460" x2="480" y2="600" stroke="url(#woodLog2)" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
                </motion.g>

                {/* Water in progress - partially filling */}
                <motion.ellipse
                    cx="200" cy="650"
                    rx="180"
                    ry="60"
                    fill="#7EBDC8"
                    opacity="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Subtle water ripples */}
                <motion.path
                    d="M 50 650 Q 100 640 200 650 T 350 650"
                    stroke="#5E8C61"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
            </svg>
        </div>
    );
}
