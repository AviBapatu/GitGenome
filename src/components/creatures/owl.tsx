"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { soundManager } from "@/components/sound/sound-manager";

export function OwlCreature() {
    const [isHovered, setIsHovered] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [headTilt, setHeadTilt] = useState(0);
    const [showIntroText, setShowIntroText] = useState(true);
    const flightControls = useAnimation();

    useEffect(() => {
        let isMounted = true;

        // Fade out UX text after 3 seconds
        const introTimeout = setTimeout(() => {
            if (isMounted) setShowIntroText(false);
        }, 5000); // 2s entrance delay + 3s hold

        const runFlightSequence = async () => {
            if (!isMounted) return;
            setIsFlying(true);

            // Wait slightly before takeoff
            await new Promise(res => setTimeout(res, 500));

            // Flight Path: tree -> arc up/left towards moon area -> tree
            await flightControls.start({
                x: [0, -150, -300, -150, 0],
                y: [0, -150, -200, -100, 0],
                rotate: [0, -15, -5, 10, 0], // leans into the turn and tilts back on landing
                scale: [1, 0.8, 0.7, 0.9, 1], // feels like it goes further away into the background
                transition: {
                    duration: 6, // slow, cinematic sweep
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.8, 1]
                }
            });

            if (isMounted) {
                setIsFlying(false);
            }
        };

        // Cinematic Flight Trigger loop (every 25 - 40 seconds)
        const flightInterval = setInterval(() => {
            runFlightSequence();
        }, 25000 + Math.random() * 15000);

        // Random head tilt occasionally when perched
        const headTiltInterval = setInterval(() => {
            if (!isFlying && isMounted) {
                const randomTilt = Math.random() > 0.5 ? 5 : -5;
                setHeadTilt(randomTilt);

                // Return to normal shortly
                setTimeout(() => {
                    if (isMounted) setHeadTilt(0);
                }, 2000);
            }
        }, 8000 + Math.random() * 6000);

        return () => {
            isMounted = false;
            clearTimeout(introTimeout);
            clearInterval(flightInterval);
            clearInterval(headTiltInterval);
        };
    }, [flightControls, isFlying]);

    const handleClick = () => {
        soundManager.playEffect("/assets/sounds/owl_hoot.mp3", 0.6);

        // Optional: little hop on click if perched
        if (!isFlying) {
            flightControls.start({
                y: [0, -20, 0],
                transition: { duration: 0.4, ease: "easeOut" }
            });
        }
    };

    // Calculate Wing Flap Speed
    const wingDuration = isFlying ? 0.2 : (isHovered ? 0.3 : 4);
    const leftWingRotate = isFlying ? [30, -50, 30] : (isHovered ? [-10, 20, -10] : [0, 5, 0]);
    const rightWingRotate = isFlying ? [-30, 50, -30] : (isHovered ? [10, -20, 10] : [0, -5, 0]);

    return (
        <motion.div
            animate={flightControls}
            drag={!isFlying}
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            whileHover={{ scale: isFlying ? 1 : 1.05 }}
            whileTap={{ scale: isFlying ? 1 : 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className={`relative z-20 ${!isFlying ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{ width: "160px", height: "160px" }}
        >
            {/* Transient Intro UX Text */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showIntroText ? 1 : 0, x: showIntroText ? 0 : 20 }}
                transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
                className="absolute -top-12 -left-48 w-64 text-right pointer-events-none"
            >
                <p className="text-[#DCE7FF] font-patrick text-xl leading-tight opacity-90">🦉 Night Owl Developer</p>
                <p className="text-slate-400 text-xs font-sans mt-1">Most commits detected after midnight.</p>
            </motion.div>

            {/* Shadow under the owl */}
            <motion.div
                animate={{
                    scale: isFlying ? 0.5 : (isHovered ? 1.2 : [1, 0.9, 1]),
                    opacity: isFlying ? 0.1 : (isHovered ? 0.8 : [0.6, 0.4, 0.6]),
                    filter: isFlying ? "blur(12px)" : "blur(4px)" // sharper when perched
                }}
                transition={{ duration: isFlying ? 0.5 : 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/60 rounded-[100%]"
            />

            {/* Floating Animation Wrapper (Idle Bounce / Breathing) */}
            <motion.div
                animate={{
                    y: isFlying ? 0 : [-2, 2, -2],
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-full h-full relative"
            >
                {/* SVG Owl Representation */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_15px_rgba(20,40,70,0.5)]">
                    {/* Light Falloff Highlighting (Pixar style rim light) */}
                    <defs>
                        <radialGradient id="rimLight" cx="30%" cy="30%" r="50%">
                            <stop offset="0%" stopColor="#8AABFF" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#475569" stopOpacity="1" />
                        </radialGradient>
                    </defs>

                    {/* Body */}
                    <ellipse cx="100" cy="110" rx="60" ry="70" fill="url(#rimLight)" />
                    <ellipse cx="100" cy="120" rx="40" ry="50" fill="#cbd5e1" />

                    {/* Feathers */}
                    <path d="M 85 110 L 95 120 L 105 110" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 105 130 L 115 140 L 125 130" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 75 130 L 85 140 L 95 130" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />

                    {/* Left Wing */}
                    <motion.ellipse
                        cx="35" cy="110" rx="15" ry="45" fill="#334155"
                        style={{ originX: "60px", originY: "70px" }}
                        animate={{ rotate: leftWingRotate }}
                        transition={{ duration: wingDuration, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Right Wing */}
                    <motion.ellipse
                        cx="165" cy="110" rx="15" ry="45" fill="#334155"
                        style={{ originX: "140px", originY: "70px" }}
                        animate={{ rotate: rightWingRotate }}
                        transition={{ duration: wingDuration, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Head */}
                    <motion.g
                        animate={{
                            rotate: (!isFlying && isHovered) ? 10 : headTilt, // Turn head on hover or random tilt
                            x: (!isFlying && isHovered) ? 5 : 0 // slight shift
                        }}
                        style={{ originX: "100px", originY: "65px" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <circle cx="100" cy="65" r="45" fill="url(#rimLight)" />

                        {/* Ears */}
                        <path d="M 60 40 L 50 10 L 80 30 Z" fill="#334155" />
                        <path d="M 140 40 L 150 10 L 120 30 Z" fill="#334155" />

                        {/* Outer Eyes (Yellow base) */}
                        <circle cx="80" cy="65" r="18" fill="#fef08a" />
                        <circle cx="120" cy="65" r="18" fill="#fef08a" />

                        {/* Glowing Corneas (Pixar Eye Glow Effect) */}
                        {/* We add a blurred glow layer over the eyes that pulses brightly during the blink cycle timeframe */}
                        <motion.circle
                            cx="80" cy="65" r="14" fill="#fbbf24"
                            style={{ filter: "blur(4px)" }}
                            animate={{ opacity: [0.3, 0.3, 1, 0.3, 0.3] }}
                            transition={{ duration: 6, repeat: Infinity, times: [0, 0.95, 0.97, 0.99, 1], ease: "easeIn" }}
                        />
                        <motion.circle
                            cx="120" cy="65" r="14" fill="#fbbf24"
                            style={{ filter: "blur(4px)" }}
                            animate={{ opacity: [0.3, 0.3, 1, 0.3, 0.3] }}
                            transition={{ duration: 6, repeat: Infinity, times: [0, 0.95, 0.97, 0.99, 1], ease: "easeIn" }}
                        />

                        {/* Inner Eyes (Pupils) */}
                        <motion.circle
                            cx="80" cy="65" r="8" fill="#0f172a"
                            animate={{
                                x: isHovered ? 3 : (isFlying ? 5 : 0), // Look forward while flying
                                y: isHovered ? -2 : 0
                            }}
                        />
                        <motion.circle
                            cx="120" cy="65" r="8" fill="#0f172a"
                            animate={{
                                x: isHovered ? 3 : (isFlying ? 5 : 0),
                                y: isHovered ? -2 : 0
                            }}
                        />

                        {/* Night Owl Blink (Occurs every 5-8s as requested) */}
                        <motion.path
                            d="M 60 65 Q 80 65 100 65 Q 120 65 140 65"
                            stroke="#1e293b" strokeWidth="0" fill="none"
                            animate={{
                                strokeWidth: [0, 0, 36, 0, 0],
                            }}
                            transition={{
                                duration: 6, // base duration loop
                                repeat: Infinity,
                                // Very fast fraction covering screen to simulate a blink
                                times: [0, 0.95, 0.97, 0.99, 1],
                                ease: "easeIn"
                            }}
                        />

                        {/* Beak */}
                        <path d="M 95 75 L 105 75 L 100 85 Z" fill="#f59e0b" />
                    </motion.g>
                </svg>
            </motion.div>
        </motion.div>
    );
}
