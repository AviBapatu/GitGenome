"use client";

import { useEffect, useState } from "react";
import { soundManager } from "./sound-manager";

export function MuteToggle() {
    const [isMuted, setIsMuted] = useState(soundManager.getMutedState());

    useEffect(() => {
        setIsMuted(soundManager.getMutedState());
    }, []);

    const handleToggle = () => {
        const newState = soundManager.toggleMute();
        setIsMuted(newState);
    };

    return (
        <button
            onClick={handleToggle}
            className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:bg-white/20 transition-all shadow-lg"
            aria-label="Toggle Sound"
        >
            {isMuted ? "🔇" : "🔊"}
        </button>
    );
}
