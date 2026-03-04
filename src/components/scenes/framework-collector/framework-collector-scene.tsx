"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/components/sound/sound-manager";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { WorkshopBackground } from "./workshop-background";
import { TechWorkbench } from "./tech-workbench";
import { FloatingFrameworkLogos } from "./floating-framework-logos";
import { RaccoonCreature } from "@/components/creatures/raccoon";
import type { SceneProps } from "@/components/scenes/scene-map";

export function FrameworkCollectorScene({ analysis, user, repos, username }: SceneProps) {
    const [raccoonCenter, setRaccoonCenter] = useState({ x: 0, y: 0 });
    const raccoonWrapperRef = useRef<HTMLDivElement>(null);
    const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });

    // ── Sound lifecycle ────────────────────────────────────────────────────────
    useEffect(() => {
        soundManager.playAmbience("/assets/sounds/night_ambience_loop.mp3");
        return () => {
            soundManager.stopAmbience();
        };
    }, []);

    // ── Mouse parallax tracking ────────────────────────────────────────────────
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const nx = e.clientX / window.innerWidth;
        const ny = e.clientY / window.innerHeight;
        setMouseNorm({ x: nx, y: ny });
    }, []);

    // ── Calculate raccoon centre for logo orbits ───────────────────────────────
    useEffect(() => {
        const updateCenter = () => {
            if (raccoonWrapperRef.current) {
                const rect = raccoonWrapperRef.current.getBoundingClientRect();
                setRaccoonCenter({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                });
            }
        };
        const timer = setTimeout(updateCenter, 350);
        window.addEventListener("resize", updateCenter);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateCenter);
        };
    }, []);

    return (
        <div
            className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Layer 0: Workshop atmosphere */}
            <WorkshopBackground mouseX={mouseNorm.x} mouseY={mouseNorm.y} />

            {/* Layer 1: Workbench furniture — bottom right */}
            <TechWorkbench />

            {/* Layer 2: Raccoon sits on the workbench */}
            <motion.div
                ref={raccoonWrapperRef}
                className="fixed z-20 pointer-events-none right-[92px] bottom-[210px] sm:right-[120px] sm:bottom-[230px] md:right-[160px] md:bottom-[250px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
            >
                <RaccoonCreature />
            </motion.div>

            {/* Layer 3: Orbiting framework logos — centered on raccoon */}
            {raccoonCenter.x > 0 && (
                <FloatingFrameworkLogos
                    centerX={raccoonCenter.x}
                    centerY={raccoonCenter.y}
                />
            )}

            {/* Layer 4: Notebook report — slides in from below, shifted left */}
            <motion.div
                initial={{ y: 180, rotate: 1.5, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-40 pt-16 px-4 pb-20 pointer-events-none md:w-3/5"
            >
                <div className="pointer-events-auto">
                    <NotebookLayout
                        analysis={analysis}
                        user={user}
                        repos={repos?.map(r => ({
                            name: r.name,
                            language: r.language,
                            size: r.size,
                            createdAt: new Date(r.created_at),
                            updatedAt: new Date(r.updated_at),
                            description: r.description || undefined,
                            topics: r.topics || undefined
                        }))}
                        username={username}
                    />
                </div>
            </motion.div>
        </div>
    );
}
