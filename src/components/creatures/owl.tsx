"use client";

import { motion } from "framer-motion";

export function OwlCreature() {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0],
            }}
            transition={{
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }
            }}
            className="w-48 h-48 relative cursor-grab active:cursor-grabbing flex justify-center items-center opacity-90 drop-shadow-2xl z-20"
        >
            {/* Simple Owl constructed via emojis for now to save on SVG assets, 
            but this perfectly allows Framer motion scale/float logic */}
            <div className="text-[140px] leading-none select-none">🦉</div>
        </motion.div>
    );
}
