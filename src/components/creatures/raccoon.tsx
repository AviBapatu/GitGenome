"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { soundManager } from "@/components/sound/sound-manager";

export function RaccoonCreature() {
    const [isHovered, setIsHovered] = useState(false);
    const [headRotate, setHeadRotate] = useState(0);
    const [earTwitch, setEarTwitch] = useState(false);
    const [showLabel, setShowLabel] = useState(true);
    const [poppedOut, setPoppedOut] = useState(false);
    const bodyControls = useAnimation();

    // ── Toolbox pop-out entrance ───────────────────────────────────────────────
    useEffect(() => {
        let isMounted = true;

        const enter = async () => {
            // Wait for scene to settle
            await new Promise((r) => setTimeout(r, 800));
            if (!isMounted) return;
            // Shake the toolbox (done via CSS on the parent wrapper)
            // Raccoon pops up
            await bodyControls.start({
                y: [60, -18, 8, 0],
                opacity: [0, 1, 1, 1],
                scale: [0.6, 1.1, 0.95, 1],
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            });
            if (isMounted) setPoppedOut(true);
        };

        enter();

        const labelTimer = setTimeout(() => {
            if (isMounted) setShowLabel(false);
        }, 5500);

        // Periodic ear twitch
        const earInterval = setInterval(() => {
            if (!isMounted) return;
            setEarTwitch(true);
            setTimeout(() => { if (isMounted) setEarTwitch(false); }, 400);
        }, 7000 + Math.random() * 4000);

        return () => {
            isMounted = false;
            clearTimeout(labelTimer);
            clearInterval(earInterval);
        };
    }, [bodyControls]);

    // ── Cursor head-tracking ───────────────────────────────────────────────────
    const raccoonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!raccoonRef.current) return;
            const rect = raccoonRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const dx = e.clientX - cx;
            // Clamp to ±15°
            const angle = Math.max(-15, Math.min(15, dx * 0.04));
            setHeadRotate(angle);
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    const handleClick = () => {
        soundManager.playEffect("/assets/sounds/owl_hoot.mp3", 0.5);
        bodyControls.start({
            y: [0, -22, 0],
            scale: [1, 1.12, 1],
            transition: { duration: 0.45, ease: "easeOut" },
        });
    };

    return (
        <motion.div
            ref={raccoonRef}
            animate={bodyControls}
            initial={{ opacity: 0, y: 60 }}
            drag={poppedOut}
            dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className={`relative z-20 ${poppedOut ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{ width: "150px", height: "180px" }}
        >
            {/* Hover label */}
            <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: showLabel ? 1 : 0, x: showLabel ? 0 : 15 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="absolute -top-10 -left-44 w-60 text-right pointer-events-none"
            >
                <p className="text-amber-200 font-patrick text-xl leading-tight opacity-90">
                    🦝 Framework Collector
                </p>
                <p className="text-amber-400/60 text-xs font-mono mt-0.5">
                    Grabs every shiny new tool.
                </p>
            </motion.div>

            {/* Ground shadow */}
            <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 rounded-[100%]"
                style={{ filter: "blur(5px)" }}
                animate={{ scale: [1, 0.92, 1], opacity: [0.5, 0.35, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Outer idle float */}
            <motion.div
                className="w-full h-full relative"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    viewBox="0 0 150 190"
                    className="w-full h-full"
                    style={{ filter: "drop-shadow(0 6px 18px rgba(251,146,60,0.25))" }}
                >
                    <defs>
                        {/*
                         * HAND-DRAWN FEEL:
                         * feTurbulence + feDisplacementMap gives lines a wobbly,
                         * slightly-off quality like they were drawn with a felt-tip pen.
                         */}
                        <filter id="raccoonSketch" x="-5%" y="-5%" width="110%" height="110%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        {/* Warm top light */}
                        <radialGradient id="topLight" cx="50%" cy="10%" r="70%">
                            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                        {/* Body fill gradient */}
                        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9a9a9a" />
                            <stop offset="100%" stopColor="#707070" />
                        </linearGradient>
                        {/* Tail stripe gradient */}
                        <linearGradient id="tailDark" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#4a4a4a" />
                            <stop offset="100%" stopColor="#383838" />
                        </linearGradient>
                        {/* Paper grain texture */}
                        <filter id="grain">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noiseOut" />
                            <feBlend in="SourceGraphic" in2="noiseOut" mode="multiply" result="blend" />
                            <feComposite in="blend" in2="SourceGraphic" operator="in" />
                        </filter>
                    </defs>

                    {/* ─── TAIL (behind body) ─── */}
                    <motion.g
                        style={{ originX: "75px", originY: "155px" }}
                        animate={{ rotate: [-8, 8, -8] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Tail base */}
                        <ellipse cx="105" cy="148" rx="22" ry="42" fill="url(#bodyFill)" filter="url(#raccoonSketch)" transform="rotate(25 105 148)" />
                        {/* Tail stripes — dark bands */}
                        {[0, 1, 2, 3].map((i) => (
                            <ellipse
                                key={`stripe-${i}`}
                                cx="108"
                                cy={130 + i * 14}
                                rx="18"
                                ry="5"
                                fill="url(#tailDark)"
                                opacity={0.6}
                                transform="rotate(25 108 148)"
                                filter="url(#raccoonSketch)"
                            />
                        ))}
                    </motion.g>

                    {/* ─── BODY ─── */}
                    <ellipse
                        cx="72"
                        cy="138"
                        rx="38"
                        ry="44"
                        fill="url(#bodyFill)"
                        stroke="#4a4a4a"
                        strokeWidth="2"
                        filter="url(#raccoonSketch)"
                    />
                    {/* Belly lighter patch */}
                    <ellipse
                        cx="72"
                        cy="148"
                        rx="22"
                        ry="28"
                        fill="#b8b8b8"
                        opacity={0.6}
                        filter="url(#raccoonSketch)"
                    />

                    {/* Little paws */}
                    <ellipse cx="44" cy="175" rx="12" ry="7" fill="#7a7a7a" stroke="#4a4a4a" strokeWidth="1.5" filter="url(#raccoonSketch)" />
                    <ellipse cx="100" cy="175" rx="12" ry="7" fill="#7a7a7a" stroke="#4a4a4a" strokeWidth="1.5" filter="url(#raccoonSketch)" />
                    {/* Toe lines */}
                    {[-4, 0, 4].map((dx) => (
                        <line key={`toL-${dx}`} x1={44 + dx} y1={172} x2={44 + dx} y2={180} stroke="#4a4a4a" strokeWidth="1" opacity={0.5} />
                    ))}
                    {[-4, 0, 4].map((dx) => (
                        <line key={`toR-${dx}`} x1={100 + dx} y1={172} x2={100 + dx} y2={180} stroke="#4a4a4a" strokeWidth="1" opacity={0.5} />
                    ))}

                    {/* Arms (slightly raised — curious pose) */}
                    <path
                        d="M 36 128 Q 22 115, 25 102 Q 28 92, 38 98"
                        stroke="#8a8a8a"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#raccoonSketch)"
                    />
                    <path
                        d="M 108 128 Q 122 115, 119 102 Q 116 92, 106 98"
                        stroke="#8a8a8a"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#raccoonSketch)"
                    />

                    {/* ─── HEAD (tracker group) ─── */}
                    <motion.g
                        style={{ originX: "72px", originY: "82px" }}
                        animate={{
                            rotate: isHovered ? headRotate : headRotate * 0.5,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {/* Head main */}
                        <ellipse
                            cx="72"
                            cy="82"
                            rx="40"
                            ry="38"
                            fill="url(#bodyFill)"
                            stroke="#4a4a4a"
                            strokeWidth="2"
                            filter="url(#raccoonSketch)"
                        />

                        {/* Warm top light on head */}
                        <ellipse cx="72" cy="68" rx="30" ry="18" fill="url(#topLight)" />

                        {/* ─── EARS ─── */}
                        {/* Left ear */}
                        <motion.g
                            style={{ originX: "42px", originY: "50px" }}
                            animate={{ rotate: earTwitch ? -18 : 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            <path
                                d="M 35 55 Q 28 35, 42 28 Q 52 35, 48 56"
                                fill="#7a7a7a"
                                stroke="#4a4a4a"
                                strokeWidth="1.5"
                                filter="url(#raccoonSketch)"
                            />
                            {/* Inner ear */}
                            <path d="M 38 52 Q 33 40, 42 34 Q 49 40, 46 52" fill="#9a7070" opacity={0.6} />
                        </motion.g>
                        {/* Right ear */}
                        <motion.g
                            style={{ originX: "102px", originY: "50px" }}
                            animate={{ rotate: earTwitch ? 18 : 0 }}
                            transition={{ duration: 0.15, ease: "easeOut", delay: 0.05 }}
                        >
                            <path
                                d="M 96 55 Q 93 35, 102 28 Q 116 35, 109 56"
                                fill="#7a7a7a"
                                stroke="#4a4a4a"
                                strokeWidth="1.5"
                                filter="url(#raccoonSketch)"
                            />
                            <path d="M 99 52 Q 96 40, 102 34 Q 111 40, 108 52" fill="#9a7070" opacity={0.6} />
                        </motion.g>

                        {/* Raccoon mask — dark patches around eyes */}
                        <ellipse cx="57" cy="80" rx="17" ry="14" fill="#4a4a4a" opacity={0.75} filter="url(#raccoonSketch)" />
                        <ellipse cx="87" cy="80" rx="17" ry="14" fill="#4a4a4a" opacity={0.75} filter="url(#raccoonSketch)" />
                        {/* Mask bridge connecting across nose */}
                        <rect x="64" y="78" width="16" height="6" fill="#4a4a4a" opacity={0.6} rx="3" />

                        {/* ─── EYES ─── */}
                        {/* White sclera */}
                        <circle cx="57" cy="79" r="9" fill="#e8e8d8" filter="url(#raccoonSketch)" />
                        <circle cx="87" cy="79" r="9" fill="#e8e8d8" filter="url(#raccoonSketch)" />
                        {/* Warm amber iris */}
                        <circle cx="57" cy="79" r="6" fill="#c8a030" />
                        <circle cx="87" cy="79" r="6" fill="#c8a030" />
                        {/* Glow layer */}
                        <motion.circle
                            cx="57" cy="79" r="5"
                            fill="#f59e0b"
                            style={{ filter: "blur(2px)" }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="87" cy="79" r="5"
                            fill="#f59e0b"
                            style={{ filter: "blur(2px)" }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        />
                        {/* Pupils — track toward cursor side */}
                        <motion.circle
                            cx="57" cy="79" r="4"
                            fill="#1a1008"
                            animate={{ x: isHovered ? Math.sign(headRotate) * 1.5 : 0 }}
                        />
                        <motion.circle
                            cx="87" cy="79" r="4"
                            fill="#1a1008"
                            animate={{ x: isHovered ? Math.sign(headRotate) * 1.5 : 0 }}
                        />
                        {/* Eye shine */}
                        <circle cx="60" cy="76" r="1.8" fill="white" opacity={0.8} />
                        <circle cx="90" cy="76" r="1.8" fill="white" opacity={0.8} />

                        {/* BLINK — sweeps across both eyes every 6–10s */}
                        <motion.rect
                            x="42" y="74" width="62" height="0" rx="4"
                            fill="#4a4a4a"
                            animate={{ height: [0, 0, 12, 0, 0] }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                times: [0, 0.92, 0.95, 0.98, 1],
                                ease: "easeIn",
                            }}
                        />

                        {/* Nose */}
                        <path
                            d="M 67 91 Q 72 96, 77 91 Q 74 87, 70 87 Z"
                            fill="#333"
                            filter="url(#raccoonSketch)"
                        />
                        {/* Nose highlight */}
                        <ellipse cx="69" cy="89" rx="2" ry="1.5" fill="#666" opacity={0.6} />

                        {/* Smile / muzzle — wobbly little grin */}
                        <path
                            d="M 64 97 Q 72 103, 80 97"
                            stroke="#4a4a4a"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#raccoonSketch)"
                        />

                        {/* Cheek stripe marks */}
                        <path d="M 36 82 Q 42 79, 44 85" stroke="#6a6a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                        <path d="M 36 88 Q 42 86, 43 92" stroke="#6a6a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
                        <path d="M 108 82 Q 102 79, 100 85" stroke="#6a6a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
                        <path d="M 108 88 Q 102 86, 101 92" stroke="#6a6a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
                    </motion.g>

                    {/* Grain texture overlay on whole raccoon */}
                    <ellipse cx="72" cy="120" rx="55" ry="75" fill="url(#topLight)" opacity={0.5} />
                </svg>
            </motion.div>
        </motion.div>
    );
}
