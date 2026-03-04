"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { soundManager } from "@/components/sound/sound-manager";

interface Logo {
    id: string;
    label: string;
    color: string;
    bgColor: string;
    speed: number;     // degrees per second
    radius: number;    // orbit radius in px
    initialAngle: number;
    verticalFreq: number;
    verticalAmp: number;
    PathComponent: React.FC<{ color: string }>;
}

// ─── SVG Doodle Paths ─────────────────────────────────────────────────────────
// Each logo is a slightly wobbly hand-drawn doodle matching the notebook aesthetic.

function ReactDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Nucleus */}
            <circle cx="20" cy="20" r="4" fill={color} opacity={0.9} />
            {/* Wobbly orbits - slightly misaligned for hand-drawn feel */}
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.8} strokeLinecap="round" />
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.8} strokeLinecap="round" transform="rotate(60 20 20)" />
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.8} strokeLinecap="round" transform="rotate(120 20 20)" />
        </svg>
    );
}

function VueDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Wobbly V shape */}
            <path d="M 4 6 L 20 34 L 36 6 L 29 6 L 20 22 L 11 6 Z" fill={color} opacity={0.85} />
            {/* Inner V */}
            <path d="M 11 6 L 20 20 L 29 6 L 24 6 L 20 14 L 16 6 Z" fill="#0f0a04" opacity={0.5} />
        </svg>
    );
}

function AngularDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Angular shield — slightly wobbly */}
            <path d="M 20 3 L 37 9 L 33 31 L 20 37 L 7 31 L 3 9 Z" fill={color} opacity={0.85} />
            {/* A letter */}
            <path d="M 13 28 L 20 10 L 27 28" stroke="#0f0a04" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 15 22 H 25" stroke="#0f0a04" strokeWidth="2" />
        </svg>
    );
}

function SvelteDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Svelte flame-like S path */}
            <path
                d="M 28 6 C 35 2, 40 12, 32 18 C 40 16, 42 26, 30 30 C 22 34, 8 32, 10 24 C 6 26, 4 18, 12 16 C 6 18, 4 8, 16 6 C 20 4, 24 4, 28 6 Z"
                fill={color}
                opacity={0.85}
            />
            <path
                d="M 22 12 C 28 10, 30 18, 22 20 C 30 20, 26 30, 18 28"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
            />
        </svg>
    );
}

function NextDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Circle base */}
            <circle cx="20" cy="20" r="17" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
            {/* N letter, slightly wobbly */}
            <path d="M 11 28 L 11 12 L 26 28 L 26 12" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ViteDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="36" height="36">
            {/* Vite lightning bolt */}
            <path d="M 24 3 L 10 23 L 19 23 L 16 37 L 30 17 L 21 17 Z" fill={color} opacity={0.9} />
            {/* Small accent angle */}
            <path d="M 10 23 L 19 23" stroke={color} strokeWidth="1.5" opacity={0.5} />
        </svg>
    );
}

// ─── Logo definitions ─────────────────────────────────────────────────────────

const LOGOS: Logo[] = [
    { id: "react", label: "React", color: "#22d3ee", bgColor: "rgba(34,211,238,0.12)", speed: 22, radius: 155, initialAngle: 0, verticalFreq: 0.6, verticalAmp: 9, PathComponent: ReactDoodle },
    { id: "vue", label: "Vue", color: "#4ade80", bgColor: "rgba(74,222,128,0.12)", speed: 15, radius: 175, initialAngle: 60, verticalFreq: 0.4, verticalAmp: 12, PathComponent: VueDoodle },
    { id: "angular", label: "Angular", color: "#f87171", bgColor: "rgba(248,113,113,0.12)", speed: 30, radius: 140, initialAngle: 120, verticalFreq: 0.8, verticalAmp: 7, PathComponent: AngularDoodle },
    { id: "svelte", label: "Svelte", color: "#fb923c", bgColor: "rgba(251,146,60,0.12)", speed: 18, radius: 168, initialAngle: 200, verticalFreq: 0.5, verticalAmp: 10, PathComponent: SvelteDoodle },
    { id: "next", label: "Next.js", color: "#e2e8f0", bgColor: "rgba(226,232,240,0.10)", speed: 25, radius: 148, initialAngle: 280, verticalFreq: 0.7, verticalAmp: 8, PathComponent: NextDoodle },
    { id: "vite", label: "Vite", color: "#a78bfa", bgColor: "rgba(167,139,250,0.12)", speed: 20, radius: 162, initialAngle: 330, verticalFreq: 0.9, verticalAmp: 11, PathComponent: ViteDoodle },
];

interface FloatingLogoProps {
    logo: Logo;
    centerX: number;
    centerY: number;
}

function FloatingLogo({ logo, centerX, centerY }: FloatingLogoProps) {
    const angleRef = useRef(logo.initialAngle);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const [isSpinning, setIsSpinning] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        let raf: number;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;
            angleRef.current = (angleRef.current + logo.speed * dt) % 360;
            const rad = (angleRef.current * Math.PI) / 180;
            const time = now / 1000;
            const x = Math.cos(rad) * logo.radius;
            const y = Math.sin(rad) * (logo.radius * 0.38) + Math.sin(time * logo.verticalFreq) * logo.verticalAmp;
            setPos({ x, y });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [logo.radius, logo.speed, logo.verticalFreq, logo.verticalAmp]);

    const handleClick = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        soundManager.playEffect("/assets/sounds/pop.mp3", 0.4);
        await controls.start({
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            transition: { duration: 0.6, ease: "easeInOut" },
        });
        controls.set({ rotate: 0 });
        setIsSpinning(false);
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + LOGOS.indexOf(logo) * 0.15, duration: 0.4, ease: "backOut" }}
            style={{
                position: "fixed",
                left: centerX + pos.x - 28,
                top: centerY + pos.y - 28,
                zIndex: 15,
                cursor: "pointer",
            }}
        >
            <motion.div
                animate={controls}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                className="relative flex flex-col items-center gap-1 select-none"
            >
                {/* Glow backdrop */}
                <motion.div
                    className="absolute inset-[-6px] rounded-full"
                    style={{
                        background: logo.bgColor,
                        filter: "blur(6px)",
                    }}
                    whileHover={{ filter: "blur(10px)", opacity: 1.5 }}
                />
                {/* Logo doodle */}
                <div
                    className="relative rounded-lg p-1"
                    style={{
                        border: `1.5px solid ${logo.color}33`,
                        background: "rgba(15,10,4,0.6)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <logo.PathComponent color={logo.color} />
                </div>
                {/* Label — tiny handwritten style */}
                <span
                    className="text-[9px] font-mono tracking-wide"
                    style={{ color: logo.color, opacity: 0.8, textShadow: `0 0 8px ${logo.color}` }}
                >
                    {logo.label}
                </span>
            </motion.div>
        </motion.div>
    );
}

// ─── Main export ───────────────────────────────────────────────────────────────

interface FloatingFrameworkLogosProps {
    /** Center X of the raccoon (in viewport px) */
    centerX: number;
    /** Center Y of the raccoon (in viewport px) */
    centerY: number;
}

export function FloatingFrameworkLogos({ centerX, centerY }: FloatingFrameworkLogosProps) {
    return (
        <>
            {LOGOS.map((logo) => (
                <FloatingLogo key={logo.id} logo={logo} centerX={centerX} centerY={centerY} />
            ))}
        </>
    );
}
