"use client";

import { motion } from "framer-motion";

export function RiverBackground() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#E8D5BF] via-[#D4C5B0] to-[#C8B89F]">
            {/* Water waves - animated flowing effect */}
            <svg
                className="absolute bottom-0 left-0 w-full h-1/3"
                viewBox="0 0 1200 300"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7EBDC8" />
                        <stop offset="50%" stopColor="#6FB0BD" />
                        <stop offset="100%" stopColor="#5E9FA8" />
                    </linearGradient>
                    <pattern id="waterWaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M0,50 Q25,30 50,50 T100,50" stroke="#5E8C61" strokeWidth="1" fill="none" opacity="0.4" />
                        <path d="M0,60 Q25,45 50,60 T100,60" stroke="#5E8C61" strokeWidth="1" fill="none" opacity="0.3" />
                    </pattern>
                </defs>

                {/* Main water body */}
                <rect width="1200" height="300" fill="url(#waterGradient)" />

                {/* Wave patterns */}
                <use href="#waterWaves" x="0" y="0" />
                <motion.use
                    href="#waterWaves"
                    x="0"
                    y="30"
                    animate={{ x: [-100, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Water ripples */}
                <motion.circle
                    cx="200"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="#5E8C61"
                    strokeWidth="1"
                    opacity="0.2"
                    animate={{ r: [15, 50], opacity: [0.4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.circle
                    cx="900"
                    cy="120"
                    r="20"
                    fill="none"
                    stroke="#5E8C61"
                    strokeWidth="1"
                    opacity="0.2"
                    animate={{ r: [15, 45], opacity: [0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
            </svg>

            {/* Soft background trees/forest suggestion */}
            <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1200 800" className="w-full h-full">
                    {/* Tree silhouettes in distance */}
                    <ellipse cx="100" cy="400" rx="60" ry="120" fill="#5E8C61" opacity="0.3" />
                    <ellipse cx="250" cy="420" rx="70" ry="140" fill="#5E8C61" opacity="0.25" />
                    <ellipse cx="1100" cy="410" rx="80" ry="150" fill="#5E8C61" opacity="0.3" />
                    <ellipse cx="1050" cy="450" rx="65" ry="130" fill="#5E8C61" opacity="0.25" />
                </svg>
            </div>

            {/* Sunlight effect - warm glow from top right */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-yellow-100/30 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
