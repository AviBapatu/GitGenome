import { RoughNotation } from "react-rough-notation";

export function ScribbleDivider() {
    return (
        <div className="w-full h-12 flex items-center justify-center my-6 opacity-30">
            <RoughNotation
                type="crossed-off"
                show={true}
                color="#1e293b"
                strokeWidth={1.5}
                animationDelay={1000}
            >
                <div className="w-48 h-4 opacity-0 pointer-events-none">divider</div>
            </RoughNotation>
        </div>
    );
}
