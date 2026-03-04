"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { soundManager } from "@/components/sound/sound-manager";

export function GremlinCreature() {
    const [isHovered, setIsHovered] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const tailControls = useAnimation();
    const headControls = useAnimation();

    useEffect(() => {
        let isMounted = true;

        // Rapid tail flick animation
        const startTailFlick = async () => {
            if (!isMounted) return;
            while (isMounted) {
                await tailControls.start({
                    rotate: [0, 15, -15, 0],
                    transition: { duration: 0.6, ease: "easeInOut" }
                });
                await new Promise(res => setTimeout(res, 2000 + Math.random() * 2000));
            }
        };

        // Head looking around
        const startHeadLook = async () => {
            if (!isMounted) return;
            while (isMounted) {
                await headControls.start({
                    x: [0, -5, 5, 0],
                    y: [0, -3, 2, 0],
                    transition: { duration: 1.5, ease: "easeInOut" }
                });
                await new Promise(res => setTimeout(res, 3000 + Math.random() * 2000));
            }
        };

        startTailFlick();
        startHeadLook();

        // Occasional typing frenzy
        const typingInterval = setInterval(() => {
            if (isMounted && !isHovered) {
                setIsTyping(true);
                setTimeout(() => {
                    if (isMounted) setIsTyping(false);
                }, 1500 + Math.random() * 1000);
            }
        }, 5000 + Math.random() * 4000);

        return () => {
            isMounted = false;
            clearInterval(typingInterval);
        };
    }, [tailControls, headControls, isHovered]);

    const handleClick = () => {
        soundManager.playEffect("/assets/sounds/gremlin_giggle.mp3", 0.6);
    };

    // Rapid eye blink when typing
    const eyeAnimation = isTyping ? { scaleY: [1, 0.3, 1] } : { scaleY: 1 };
    const eyeTransition = isTyping ? { duration: 2.5, repeat: Infinity } : {};

    return (
        <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative z-20 cursor-grab active:cursor-grabbing"
            style={{ width: "140px", height: "160px" }}
        >
            {/* Intro Label */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                className="absolute -top-12 -left-48 w-64 text-right pointer-events-none"
            >
                <p className="text-[#ff3366] font-patrick text-xl leading-tight opacity-90">⚡ Chaos Builder</p>
                <p className="text-slate-400 text-xs font-sans mt-1">Rapid experimentation, constant iteration.</p>
            </motion.div>

            {/* Shadow */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.3 : [1, 0.9, 1],
                    opacity: isHovered ? 0.9 : [0.6, 0.4, 0.6],
                }}
                transition={{ duration: isHovered ? 0.3 : 3, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/60 rounded-[100%]"
            />

            {/* Idle bounce */}
            <motion.div
                animate={{
                    y: [-2, 3, -2],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-full h-full relative"
            >
                {/* SVG Gremlin */}
                <svg viewBox="0 0 160 180" className="w-full h-full drop-shadow-[0_8px_12px_rgba(255,51,102,0.3)]">
                    <defs>
                        <linearGradient id="gremlinBody" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4a5568" />
                            <stop offset="100%" stopColor="#2d3748" />
                        </linearGradient>
                        <filter id="gremlinGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Body - small and compact */}
                    <ellipse cx="80" cy="110" rx="35" ry="48" fill="url(#gremlinBody)" />

                    {/* Chest highlight */}
                    <ellipse cx="80" cy="120" rx="20" ry="30" fill="#5a6b7c" opacity="0.6" />

                    {/* Head */}
                    <motion.g animate={headControls}>
                        <circle cx="80" cy="60" r="28" fill="url(#gremlinBody)" />

                        {/* Big mischievous eyes */}
                        <circle cx="70" cy="55" r="6" fill="#ff3366" />
                        <circle cx="90" cy="55" r="6" fill="#ff3366" />

                        {/* Eye shine - adds playful look */}
                        <motion.circle cx="71" cy="54" r="2" fill="#ffffff" animate={eyeAnimation} transition={eyeTransition} />
                        <motion.circle cx="91" cy="54" r="2" fill="#ffffff" animate={eyeAnimation} transition={eyeTransition} />

                        {/* Wide grin - sharp and chaotic */}
                        <path
                            d="M 68 65 Q 80 73 92 65"
                            stroke="#ffffff"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Teeth - sharp and pointy */}
                        <line x1="71" y1="65" x2="71" y2="70" stroke="#ff3366" strokeWidth="1.5" />
                        <line x1="76" y1="65" x2="76" y2="70" stroke="#ff3366" strokeWidth="1.5" />
                        <line x1="80" y1="67" x2="80" y2="72" stroke="#ff3366" strokeWidth="1.5" />
                        <line x1="84" y1="65" x2="84" y2="70" stroke="#ff3366" strokeWidth="1.5" />
                        <line x1="89" y1="65" x2="89" y2="70" stroke="#ff3366" strokeWidth="1.5" />

                        {/* Sharp ears */}
                        <motion.path
                            d="M 55 35 L 50 15 L 58 35 Z"
                            fill="#ff3366"
                            animate={{ scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.path
                            d="M 105 35 L 110 15 L 102 35 Z"
                            fill="#ff3366"
                            animate={{ scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.g>

                    {/* Rapid typing arms - always moving */}
                    <motion.g
                        animate={{
                            y: isTyping ? [0, -3, 0, -3, 0] : [0, -2, 0],
                        }}
                        transition={{
                            duration: isTyping ? 0.4 : 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Left arm - reaching out */}
                        <rect x="50" y="100" width="8" height="35" rx="4" fill="#4a5568" />
                        <circle cx="52" cy="138" r="5" fill="#5a6b7c" />

                        {/* Right arm - reaching out */}
                        <rect x="102" y="100" width="8" height="35" rx="4" fill="#4a5568" />
                        <circle cx="106" cy="138" r="5" fill="#5a6b7c" />
                    </motion.g>

                    {/* Legs - small and fidgety */}
                    <rect x="65" y="155" width="8" height="20" rx="4" fill="#4a5568" />
                    <rect x="87" y="155" width="8" height="20" rx="4" fill="#4a5568" />

                    {/* Tiny feet */}
                    <ellipse cx="69" cy="180" rx="6" ry="4" fill="#5a6b7c" />
                    <ellipse cx="91" cy="180" rx="6" ry="4" fill="#5a6b7c" />

                    {/* Tail - constantly flicking */}
                    <motion.path
                        d="M 115 110 Q 135 105 140 120"
                        stroke="#4a5568"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        animate={tailControls}
                        style={{ transformOrigin: "115px 110px" }}
                    />

                    {/* Chaotic energy sparks around gremlin */}
                    <motion.circle cx="35" cy="60" r="2" fill="#00eaff" opacity="0.4" animate={{ scale: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
                    <motion.circle cx="125" cy="90" r="2" fill="#8a2be2" opacity="0.4" animate={{ scale: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }} />
                    <motion.circle cx="40" cy="140" r="1.5" fill="#ff3366" opacity="0.3" animate={{ scale: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </svg>
            </motion.div>
        </motion.div>
    );
}
