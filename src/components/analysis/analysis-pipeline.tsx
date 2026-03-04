import clsx from "clsx";
import { motion } from "framer-motion";

interface PipelineProps {
    steps: { label: string; done: boolean }[];
}

export function AnalysisPipeline({ steps }: PipelineProps) {
    return (
        <div className="space-y-6">
            {steps.map((step, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-lg"
                >
                    <div
                        className={clsx(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-all duration-500",
                            step.done
                                ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                                : "bg-slate-100 text-slate-400"
                        )}
                    >
                        {step.done && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                ✓
                            </motion.span>
                        )}
                        {!step.done && <span className="animate-pulse">•</span>}
                    </div>

                    <span
                        className={clsx(
                            "transition-colors duration-500",
                            step.done ? "text-slate-900 font-medium" : "text-slate-400"
                        )}
                    >
                        {step.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
