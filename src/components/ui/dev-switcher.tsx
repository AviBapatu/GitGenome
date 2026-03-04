"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { sceneConfig, archetypeIds } from "@/lib/scene-config";
import { motion, AnimatePresence } from "framer-motion";

// Only shown in development — zero cost in production.
const IS_DEV = process.env.NODE_ENV === "development";

export function DevSwitcher() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    if (!IS_DEV) return null;

    const switchTo = (id: string) => {
        router.push(`${pathname}?archetype=${id}`);
        setOpen(false);
    };

    return (
        <div className="fixed top-4 left-4 z-[200] font-mono select-none">
            {/* Toggle button */}
            <button
                onClick={() => setOpen((o) => !o)}
                title="Dev Controls"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-xs backdrop-blur-md transition-all duration-200"
            >
                <span className="text-base">🛠</span>
                <span>Dev</span>
                <span
                    className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    ▾
                </span>
            </button>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="mt-2 flex flex-col gap-1 bg-black/70 border border-white/10 rounded-xl p-2 backdrop-blur-md min-w-[180px]"
                    >
                        <p className="text-[10px] text-white/30 uppercase tracking-widest px-2 pb-1 border-b border-white/10">
                            Force Archetype
                        </p>
                        {archetypeIds.map((id) => {
                            const cfg = sceneConfig[id];
                            return (
                                <button
                                    key={id}
                                    onClick={() => switchTo(id)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 text-left"
                                >
                                    {/* Accent dot */}
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: cfg.color }}
                                    />
                                    <span>{cfg.name}</span>
                                </button>
                            );
                        })}

                        {/* Clear override */}
                        <div className="border-t border-white/10 mt-1 pt-1">
                            <button
                                onClick={() => {
                                    router.push(pathname);
                                    setOpen(false);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 w-full text-left"
                            >
                                <span className="w-2 h-2 rounded-full flex-shrink-0 border border-white/30" />
                                <span>Clear Override</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
