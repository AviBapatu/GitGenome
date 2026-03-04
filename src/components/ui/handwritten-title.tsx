import { ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

export function HandwrittenTitle({ children, type = "underline" }: { children: ReactNode, type?: "underline" | "box" | "circle" | "highlight" }) {
    return (
        <div className="flex w-full">
            <RoughNotation
                type={type}
                show={true}
                color={type === 'highlight' ? '#e0e7ff' : '#6366f1'}
                strokeWidth={2}
                animationDelay={500}
                animationDuration={1500}
                padding={type === 'highlight' ? [0, -2] : [0, 4]}
            >
                <div className="text-3xl font-patrick text-slate-800 relative z-10 px-2 inline-block leading-[2rem]">
                    {children}
                </div>
            </RoughNotation>
        </div>
    );
}
