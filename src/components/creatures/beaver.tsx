"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { soundManager } from "@/components/sound/sound-manager";

export function BeaverCreature() {
    const [isHovered, setIsHovered] = useState(false);
    const [isHammering, setIsHammering] = useState(false);
    const [isCheckingBlueprint, setIsCheckingBlueprint] = useState(false);
    const tailControls = useAnimation();
    const hammerControls = useAnimation();

    useEffect(() => {
        let isMounted = true;

        // Slow tail sway animation
        const startTailSway = async () => {
            if (!isMounted) return;
            while (isMounted) {
                await tailControls.start({
                    rotate: [0, 8, -8, 0],
                    transition: { duration: 3, ease: "easeInOut" }
                });
                await new Promise(res => setTimeout(res, 4000 + Math.random() * 2000));
            }
        };

        startTailSway();

        // Occasional hammering activity
        const hammeringInterval = setInterval(() => {
            if (isMounted && !isHovered) {
                setIsHammering(true);
                hammerControls.start({
                    y: [0, -8, 0, -8, 0],
                    transition: { duration: 0.8 }
                });
                setTimeout(() => {
                    if (isMounted) {
                        setIsHammering(false);
                        soundManager.playEffect("/assets/sounds/hammer_tap.mp3", 0.3);
                    }
                }, 800);
            }
        }, 6000 + Math.random() * 4000);

        // Occasional blueprint checking
        const blueprintInterval = setInterval(() => {
            if (isMounted && !isHovered && !isHammering) {
                setIsCheckingBlueprint(true);
                setTimeout(() => {
                    if (isMounted) setIsCheckingBlueprint(false);
                }, 2000);
            }
        }, 10000 + Math.random() * 5000);

        return () => {
            isMounted = false;
            clearInterval(hammeringInterval);
            clearInterval(blueprintInterval);
        };
    }, [tailControls, hammerControls, isHovered, isHammering]);

    const handleClick = () => {
        soundManager.playEffect("/assets/sounds/beaver_chatter.mp3", 0.6);
    };

    return (
        <motion.div
            drag
            dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative z-20 cursor-grab active:cursor-grabbing"
            style={{ width: "140px", height: "160px" }}
        >
            {/* Intro Label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                className="absolute -top-12 left-48 w-64 pointer-events-none"
            >
                <p className="text-[#7A5C3E] font-patrick text-xl leading-tight opacity-90">🏗️ Builder Beaver</p>
                <p className="text-slate-400 text-xs font-sans mt-1">Patient building, reliable systems.</p>
            </motion.div>

            {/* Shadow */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.3 : [1, 0.95, 1],
                    opacity: isHovered ? 0.8 : [0.5, 0.35, 0.5],
                }}
                transition={{ duration: isHovered ? 0.3 : 3.5, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/40 rounded-[100%]"
            />

            {/* Idle gentle bounce */}
            <motion.div
                animate={{
                    y: [0, 2, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-full h-full relative"
            >
                {/* SVG Beaver */}
                <svg viewBox="0 0 160 180" className="w-full h-full drop-shadow-[0_6px_10px_rgba(122,92,62,0.2)]">
                    <defs>
                        <linearGradient id="beaverBody" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B6F47" />
                            <stop offset="100%" stopColor="#6B5637" />
                        </linearGradient>
                        <linearGradient id="beaverBelly" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A0826D" />
                            <stop offset="100%" stopColor="#8B7355" />
                        </linearGradient>
                    </defs>

                    {/* Body - robust and sturdy */}
                    <ellipse cx="80" cy="110" rx="32" ry="45" fill="url(#beaverBody)" />

                    {/* Belly - lighter, softer look */}
                    <ellipse cx="80" cy="115" rx="20" ry="32" fill="url(#beaverBelly)" opacity="0.7" />

                    {/* Head */}
                    <circle cx="80" cy="65" r="26" fill="url(#beaverBody)" />

                    {/* Snout */}
                    <ellipse cx="80" cy="75" rx="15" ry="12" fill="#A0826D" />

                    {/* Nose */}
                    <circle cx="80" cy="76" r="3" fill="#4a4240" />

                    {/* Eyes - calm and focused */}
                    <circle cx="72" cy="60" r="4" fill="#2d2520" />
                    <circle cx="88" cy="60" r="4" fill="#2d2520" />

                    {/* Eye shine - gentle reflection */}
                    <circle cx="73" cy="59" r="1.5" fill="#ffffff" opacity="0.8" />
                    <circle cx="89" cy="59" r="1.5" fill="#ffffff" opacity="0.8" />

                    {/* Calm expression - slight smile */}
                    <path
                        d="M 76 80 Q 80 82 84 80"
                        stroke="#8B7355"
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Ears - rounded and neat */}
                    <ellipse cx="60" cy="48" rx="8" ry="10" fill="url(#beaverBody)" />
                    <ellipse cx="100" cy="48" rx="8" ry="10" fill="url(#beaverBody)" />

                    {/* Inner ears */}
                    <ellipse cx="60" cy="50" rx="4" ry="6" fill="#A0826D" />
                    <ellipse cx="100" cy="50" rx="4" ry="6" fill="#A0826D" />

                    {/* Front teeth - visible, not scary */}
                    <rect x="76" y="82" width="3" height="4" fill="#E8D7C3" />
                    <rect x="81" y="82" width="3" height="4" fill="#E8D7C3" />

                    {/* Arms - positioned for building work */}
                    <motion.g
                        animate={hammerControls}
                    >
                        {/* Left arm */}
                        <rect x="48" y="105" width="10" height="30" rx="5" fill="url(#beaverBody)" />
                        <circle cx="51" cy="140" r="6" fill="#8B7355" />

                        {/* Right arm - holding hammer */}
                        <rect x="102" y="105" width="10" height="30" rx="5" fill="url(#beaverBody)" />
                        <circle cx="107" cy="140" r="6" fill="#8B7355" />
                    </motion.g>

                    {/* Legs - sturdy and grounded */}
                    <rect x="65" y="155" width="10" height="18" rx="5" fill="url(#beaverBody)" />
                    <rect x="85" y="155" width="10" height="18" rx="5" fill="url(#beaverBody)" />

                    {/* Feet - webbed appearance */}
                    <ellipse cx="70" cy="177" rx="8" ry="5" fill="#A0826D" />
                    <ellipse cx="90" cy="177" rx="8" ry="5" fill="#A0826D" />

                    {/* Flat tail - characteristic beaver paddle tail */}
                    <motion.g
                        animate={tailControls}
                        style={{ transformOrigin: "120px 110px" }}
                    >
                        {/* Main tail paddle */}
                        <path
                            d="M 120 100 Q 135 105 140 125 Q 138 135 125 138 Q 115 130 120 100"
                            fill="#6B5637"
                        />

                        {/* Tail detail/scales */}
                        <line x1="128" y1="108" x2="132" y2="118" stroke="#5a4830" strokeWidth="1" opacity="0.6" />
                        <line x1="132" y1="110" x2="137" y2="122" stroke="#5a4830" strokeWidth="1" opacity="0.6" />
                        <line x1="136" y1="115" x2="139" y2="130" stroke="#5a4830" strokeWidth="1" opacity="0.6" />
                    </motion.g>

                    {/* Blueprint/Paper in paw when checking */}
                    {isCheckingBlueprint && (
                        <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            {/* Blueprint paper */}
                            <rect x="40" y="45" width="35" height="28" rx="2" fill="#EED9A4" opacity="0.9" />

                            {/* Blueprint lines */}
                            <line x1="45" y1="55" x2="70" y2="55" stroke="#7A5C3E" strokeWidth="1" opacity="0.6" />
                            <line x1="45" y1="62" x2="70" y2="62" stroke="#7A5C3E" strokeWidth="1" opacity="0.6" />
                            <line x1="45" y1="69" x2="65" y2="69" stroke="#7A5C3E" strokeWidth="1" opacity="0.6" />
                        </motion.g>
                    )}

                    {/* Subtle construction energy - logs nearby */}
                    <motion.circle
                        cx="25" cy="120" r="1.5" fill="#7A5C3E" opacity="0.3"
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.circle
                        cx="135" cy="110" r="1.5" fill="#C8A97E" opacity="0.3"
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2.8, repeat: Infinity }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
}
