import { ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

export function HandwrittenTitle({ children, type = "underline" }: { children: ReactNode, type?: "underline" | "box" | "circle" | "highlight" }) {
    return (
        <RoughNotation
            type={type}
            show={true}
            color="#6366f1"
            strokeWidth={2}
            animationDelay={500}
            animationDuration={1500}
        >
            <h2 className="text-3xl font-patrick text-slate-800 relative z-10 px-2">
                {children}
            </h2>
        </RoughNotation>
    );
}
