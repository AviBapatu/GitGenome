import clsx from "clsx";

interface PipelineProps {
    steps: { label: string; done: boolean }[];
}

export function AnalysisPipeline({ steps }: PipelineProps) {
    return (
        <div className="space-y-4">
            {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-lg">
                    <span
                        className={clsx(
                            "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                            step.done
                                ? "bg-green-500/20 text-green-500"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {step.done ? "✓" : "•"}
                    </span>

                    <span
                        className={clsx(
                            "transition-colors duration-300",
                            step.done ? "text-foreground font-medium" : "text-muted-foreground"
                        )}
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
