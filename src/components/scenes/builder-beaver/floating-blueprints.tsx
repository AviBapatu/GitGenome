"use client";

import { motion } from "framer-motion";

interface BlueprintDiagram {
    id: string;
    label: string;
    description: string;
    x: number;
    y: number;
    delay: number;
}

const blueprintDiagrams: BlueprintDiagram[] = [
    {
        id: "architecture",
        label: "Architecture",
        description: "frontend → api → database",
        x: 1100,
        y: 150,
        delay: 0,
    },
    {
        id: "database",
        label: "Schema Design",
        description: "tables → relations",
        x: 1500,
        y: 150,
        delay: 0.3,
    },
    {
        id: "api",
        label: "API Structure",
        description: "endpoints → routes",
        x: 1300,
        y: 390,
        delay: 0.6,
    },
];

function BlueprintCard({ diagram }: { diagram: BlueprintDiagram }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: diagram.delay }}
            className="absolute"
            style={{ left: `${diagram.x}px`, top: `${diagram.y}px` }}
        >
            <motion.div
                animate={{
                    y: [0, -8, 0],
                    rotate: [0, 1, -1, 0],
                }}
                transition={{
                    duration: 5 + diagram.delay * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-48 p-4 bg-[#EED9A4] rounded-lg border-2 border-[#C8A97E] shadow-lg"
                style={{
                    filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))",
                }}
            >
                {/* Blueprint header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[#7A5C3E] rounded-full" />
                    <h3 className="text-[#7A5C3E] font-patrick text-sm font-bold">
                        {diagram.label}
                    </h3>
                </div>

                {/* Blueprint diagram content */}
                <svg viewBox="0 0 180 100" className="w-full h-auto mb-2">
                    <defs>
                        <pattern id={`grid-${diagram.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#C8A97E" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>

                    {/* Grid background */}
                    <rect width="180" height="100" fill={`url(#grid-${diagram.id})`} />

                    {/* Diagram content based on type */}
                    {diagram.id === "architecture" && (
                        <>
                            <rect x="10" y="35" width="40" height="30" fill="none" stroke="#7A5C3E" strokeWidth="2" rx="2" />
                            <text x="30" y="55" fontSize="10" fill="#7A5C3E" textAnchor="middle" fontWeight="bold">
                                FE
                            </text>
                            <line x1="50" y1="50" x2="80" y2="50" stroke="#7A5C3E" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <rect x="80" y="35" width="40" height="30" fill="none" stroke="#7A5C3E" strokeWidth="2" rx="2" />
                            <text x="100" y="55" fontSize="10" fill="#7A5C3E" textAnchor="middle" fontWeight="bold">
                                API
                            </text>
                            <line x1="120" y1="50" x2="150" y2="50" stroke="#7A5C3E" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <rect x="150" y="35" width="20" height="30" fill="none" stroke="#7A5C3E" strokeWidth="2" rx="2" />
                            <text x="160" y="55" fontSize="8" fill="#7A5C3E" textAnchor="middle" fontWeight="bold">
                                DB
                            </text>
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <polygon points="0 0, 10 3, 0 6" fill="#7A5C3E" />
                                </marker>
                            </defs>
                        </>
                    )}

                    {diagram.id === "database" && (
                        <>
                            <circle cx="40" cy="30" r="8" fill="none" stroke="#7A5C3E" strokeWidth="2" />
                            <circle cx="90" cy="30" r="8" fill="none" stroke="#7A5C3E" strokeWidth="2" />
                            <circle cx="140" cy="30" r="8" fill="none" stroke="#7A5C3E" strokeWidth="2" />
                            <line x1="48" y1="30" x2="82" y2="30" stroke="#7A5C3E" strokeWidth="1" />
                            <line x1="98" y1="30" x2="132" y2="30" stroke="#7A5C3E" strokeWidth="1" />
                            <text x="40" y="60" fontSize="9" fill="#7A5C3E" textAnchor="middle">
                                Users
                            </text>
                            <text x="90" y="60" fontSize="9" fill="#7A5C3E" textAnchor="middle">
                                Projects
                            </text>
                            <text x="140" y="60" fontSize="9" fill="#7A5C3E" textAnchor="middle">
                                Repos
                            </text>
                        </>
                    )}

                    {diagram.id === "api" && (
                        <>
                            <rect x="20" y="15" width="130" height="70" fill="none" stroke="#7A5C3E" strokeWidth="2" rx="4" />
                            <line x1="20" y1="35" x2="150" y2="35" stroke="#7A5C3E" strokeWidth="1" opacity="0.5" />
                            <text x="30" y="28" fontSize="8" fill="#7A5C3E">
                                GET /users
                            </text>
                            <text x="30" y="50" fontSize="8" fill="#7A5C3E">
                                POST /repos
                            </text>
                            <text x="30" y="72" fontSize="8" fill="#7A5C3E">
                                PUT /profile
                            </text>
                        </>
                    )}
                </svg>

                {/* Blueprint description */}
                <p className="text-[#7A5C3E] text-xs font-mono leading-tight opacity-75">
                    {diagram.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

export function FloatingBlueprints() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {blueprintDiagrams.map((diagram) => (
                <BlueprintCard key={diagram.id} diagram={diagram} />
            ))}
        </div>
    );
}
