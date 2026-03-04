"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { DeveloperProfile } from "@/types/analysis";
import { soundManager } from "@/components/sound/sound-manager";
import { NotebookLayout } from "@/components/ui/notebook-layout";
import { WorkshopBackground } from "./workshop-background";
import { TechWorkbench } from "./tech-workbench";
import { FloatingFrameworkLogos } from "./floating-framework-logos";
import { RaccoonCreature } from "@/components/creatures/raccoon";

export function FrameworkCollectorScene({ analysis }: { analysis: DeveloperProfile }) {
    const [raccoonCenter, setRaccoonCenter] = useState({ x: 0, y: 0 });
    const raccoonWrapperRef = useRef<HTMLDivElement>(null);

    // ── Sound lifecycle ────────────────────────────────────────────────────────
    useEffect(() => {
        soundManager.playAmbience("/assets/sounds/night_ambience_loop.mp3");
        return () => {
            soundManager.stopAmbience();
        };
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

        // Initial calculation — needs a short delay for layout to settle
        const timer = setTimeout(updateCenter, 300);
        window.addEventListener("resize", updateCenter);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateCenter);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden">
            {/* Layer 0: Workshop atmosphere */}
            <WorkshopBackground />

            {/* Layer 1: Workbench furniture — bottom right */}
            <TechWorkbench />

            {/* Layer 2: Raccoon sits on the workbench */}
            <motion.div
                ref={raccoonWrapperRef}
                className="fixed z-20"
                style={{ right: "148px", bottom: "195px" }}
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

            {/* Layer 4: Notebook report — slides in from below */}
            <motion.div
                initial={{ y: 180, rotate: 1.5, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 pt-16 px-4 pb-20 pointer-events-none md:w-3/5"
            >
                <div className="pointer-events-auto">
                    <NotebookLayout analysis={analysis} />
                </div>
            </motion.div>
        </div>
    );
}
