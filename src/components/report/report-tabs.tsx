"use client";

const tabs = ["overview", "traits", "repositories", "activity", "compare"];

export function ReportTabs({
    active,
    setActive,
}: {
    active: string;
    setActive: (tab: string) => void;
}) {
    return (
        <div className="flex gap-6 border-b pb-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={
                        active === tab
                            ? "font-semibold border-b-2 capitalize border-foreground"
                            : "opacity-60 capitalize hover:opacity-100 transition-opacity"
                    }
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
