"use client";

import { useEffect } from "react";
import { DeveloperProfile } from "@/types/analysis";

export function PlaceholderScene({ analysis }: { analysis: DeveloperProfile }) {
    // Lifecycle stub — mirrors the required cleanup pattern.
    // Add sounds / timers here when the real scene is built,
    // and clean them up in the return callback.
    useEffect(() => {
        return () => {
            // cleanup: stop sounds, clear timers, remove listeners
        };
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white font-mono flex-col space-y-4 p-8">
            <h1 className="text-4xl text-emerald-400">Mock Scene: {analysis.archetype.name}</h1>
            <p className="text-xl">This is a temporary placeholder before the real scene is built.</p>
            <div className="mt-8 text-left max-w-lg bg-slate-800 p-6 rounded-md">
                <h3 className="text-2xl border-b border-emerald-500 pb-2 mb-4">Evidence Detected:</h3>
                <ul className="text-emerald-300 list-disc pl-5 space-y-2">
                    {analysis.archetype.evidence.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
