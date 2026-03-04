"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { soundManager } from "@/components/sound/sound-manager";

interface Logo {
    id: string;
    label: string;
    color: string;
    bgColor: string;
    speed: number;
    radius: number;
    initialAngle: number;
    verticalFreq: number;
    verticalAmp: number;
    direction: 1 | -1;
    PathComponent: React.FC<{ color: string }>;
}

interface Spark {
    id: number;
    angle: number;
    speed: number;
}

// ─── SVG Doodle Paths ─────────────────────────────────────────────────────────

function ReactDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <circle cx="20" cy="20" r="4.5" fill={color} opacity={0.9} />
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.85} strokeLinecap="round" />
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.85} strokeLinecap="round" transform="rotate(60 20 20)" />
            <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke={color} strokeWidth="2" opacity={0.85} strokeLinecap="round" transform="rotate(120 20 20)" />
        </svg>
    );
}

function VueDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <path d="M 4 6 L 20 34 L 36 6 L 29 6 L 20 22 L 11 6 Z" fill={color} opacity={0.88} />
            <path d="M 11 6 L 20 20 L 29 6 L 24 6 L 20 14 L 16 6 Z" fill="#0f0a04" opacity={0.5} />
        </svg>
    );
}

function AngularDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <path d="M 20 3 L 37 9 L 33 31 L 20 37 L 7 31 L 3 9 Z" fill={color} opacity={0.88} />
            <path d="M 13 28 L 20 10 L 27 28" stroke="#0f0a04" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 15 22 H 25" stroke="#0f0a04" strokeWidth="2" />
        </svg>
    );
}

function SvelteDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <path
                d="M 28 6 C 35 2, 40 12, 32 18 C 40 16, 42 26, 30 30 C 22 34, 8 32, 10 24 C 6 26, 4 18, 12 16 C 6 18, 4 8, 16 6 C 20 4, 24 4, 28 6 Z"
                fill={color}
                opacity={0.88}
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
        <svg viewBox="0 0 40 40" width="38" height="38">
            <circle cx="20" cy="20" r="17" fill={color} opacity={0.15} stroke={color} strokeWidth="2" />
            <path d="M 11 28 L 11 12 L 26 28 L 26 12" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ViteDoodle({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <path d="M 24 3 L 10 23 L 19 23 L 16 37 L 30 17 L 21 17 Z" fill={color} opacity={0.9} />
            <path d="M 10 23 L 19 23" stroke={color} strokeWidth="1.5" opacity={0.5} />
        </svg>
    );
}

// ─── Logo definitions ─────────────────────────────────────────────────────────

const LOGOS: Logo[] = [
    { id: "react", label: "React", color: "#22d3ee", bgColor: "rgba(34,211,238,0.14)", speed: 22, radius: 155, initialAngle: 30, verticalFreq: 0.6, verticalAmp: 9, direction: 1, PathComponent: ReactDoodle },
    { id: "vue", label: "Vue", color: "#4ade80", bgColor: "rgba(74,222,128,0.14)", speed: 15, radius: 178, initialAngle: 120, verticalFreq: 0.4, verticalAmp: 12, direction: -1, PathComponent: VueDoodle },
    { id: "angular", label: "Angular", color: "#f87171", bgColor: "rgba(248,113,113,0.14)", speed: 30, radius: 142, initialAngle: 210, verticalFreq: 0.8, verticalAmp: 7, direction: 1, PathComponent: AngularDoodle },
    { id: "svelte", label: "Svelte", color: "#fb923c", bgColor: "rgba(251,146,60,0.14)", speed: 18, radius: 168, initialAngle: 300, verticalFreq: 0.5, verticalAmp: 10, direction: -1, PathComponent: SvelteDoodle },
    { id: "next", label: "Next.js", color: "#e2e8f0", bgColor: "rgba(226,232,240,0.10)", speed: 25, radius: 148, initialAngle: 75, verticalFreq: 0.7, verticalAmp: 8, direction: 1, PathComponent: NextDoodle },
    { id: "vite", label: "Vite", color: "#a78bfa", bgColor: "rgba(167,139,250,0.14)", speed: 20, radius: 162, initialAngle: 255, verticalFreq: 0.9, verticalAmp: 11, direction: -1, PathComponent: ViteDoodle },
];

// ─── Spark Particle ────────────────────────────────────────────────────────────

function SparkParticle({ angle, color, onDone }: { angle: number; color: string; onDone: () => void }) {
    const rad = (angle * Math.PI) / 180;
    const tx = Math.cos(rad) * 45;
    const ty = Math.sin(rad) * 45;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: 4,
                height: 4,
                background: color,
                boxShadow: `0 0 6px 2px ${color}`,
                left: "50%",
                top: "50%",
                marginLeft: -2,
                marginTop: -2,
                zIndex: 50,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={onDone}
        />
    );
}

// ─── Single orbiting logo ─────────────────────────────────────────────────────

interface FloatingLogoProps {
    logo: Logo;
    centerX: number;
    centerY: number;
    index: number;
}

function FloatingLogo({ logo, centerX, centerY, index }: FloatingLogoProps) {
    const angleRef = useRef(logo.initialAngle);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const [isSpinning, setIsSpinning] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [sparks, setSparks] = useState<Spark[]>([]);
    const sparkIdRef = useRef(0);

    useEffect(() => {
        setMounted(true);
        let raf: number;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;
            angleRef.current = (angleRef.current + logo.speed * logo.direction * dt) % 360;
            const rad = (angleRef.current * Math.PI) / 180;
            const time = now / 1000;
            const x = Math.cos(rad) * logo.radius;
            const y = Math.sin(rad) * (logo.radius * 0.38) + Math.sin(time * logo.verticalFreq) * logo.verticalAmp;
            setPos({ x, y });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [logo.radius, logo.speed, logo.verticalFreq, logo.verticalAmp, logo.direction]);

    const handleClick = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        soundManager.playEffect("/assets/sounds/pop.mp3", 0.4);

        // Spawn spark particles
        const newSparks: Spark[] = Array.from({ length: 8 }, (_, i) => ({
            id: sparkIdRef.current++,
            angle: i * 45 + Math.random() * 20,
            speed: 30 + Math.random() * 20,
        }));
        setSparks((s) => [...s, ...newSparks]);

        await controls.start({
            rotate: [0, 360],
            scale: [1, 1.35, 1],
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
            transition={{ delay: 1.5 + index * 0.18, duration: 0.45, ease: "backOut" }}
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
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.88 }}
                onClick={handleClick}
                className="relative flex flex-col items-center gap-1 select-none"
            >
                {/* Spark container */}
                {sparks.map((spark) => (
                    <SparkParticle
                        key={spark.id}
                        angle={spark.angle}
                        color={logo.color}
                        onDone={() => setSparks((s) => s.filter((sp) => sp.id !== spark.id))}
                    />
                ))}

                {/* Glow backdrop */}
                <motion.div
                    className="absolute inset-[-8px] rounded-full"
                    style={{
                        background: logo.bgColor,
                        filter: "blur(8px)",
                    }}
                    whileHover={{ filter: "blur(14px)", opacity: 1.6 }}
                />

                {/* Logo doodle */}
                <div
                    className="relative rounded-xl p-1.5"
                    style={{
                        border: `1.5px solid ${logo.color}40`,
                        background: "rgba(15,10,4,0.65)",
                        backdropFilter: "blur(6px)",
                        boxShadow: `0 0 14px 2px ${logo.color}22`,
                    }}
                >
                    <logo.PathComponent color={logo.color} />
                </div>

                {/* Label */}
                <span
                    className="text-[9px] font-mono tracking-wide"
                    style={{ color: logo.color, opacity: 0.85, textShadow: `0 0 10px ${logo.color}` }}
                >
                    {logo.label}
                </span>
            </motion.div>
        </motion.div>
    );
}

// ─── Main export ───────────────────────────────────────────────────────────────

interface FloatingFrameworkLogosProps {
    centerX: number;
    centerY: number;
}

export function FloatingFrameworkLogos({ centerX, centerY }: FloatingFrameworkLogosProps) {
    return (
        <>
            {LOGOS.map((logo, i) => (
                <FloatingLogo key={logo.id} logo={logo} centerX={centerX} centerY={centerY} index={i} />
            ))}
        </>
    );
}
