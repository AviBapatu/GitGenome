"use client";

import { DeveloperProfile } from "@/types/analysis";
import { motion } from "framer-motion";
import { GenomeCard } from "@/components/genome/genome-card";
import { LanguageGeneCard } from "@/components/genome/language-gene-card";
import { MutationCard } from "@/components/genome/mutation-card";
import { TraitCard } from "@/components/genome/trait-card";

export function OverviewTab({ analysis }: { analysis: DeveloperProfile }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pb-20"
        >
            <GenomeCard archetype={analysis.archetype} confidence={analysis.confidence} />

            <LanguageGeneCard language={analysis.dominantLanguage} />

            <TraitCard traits={analysis.traits} />

            <MutationCard mutations={analysis.mutations} />
        </motion.div>
    );
}
