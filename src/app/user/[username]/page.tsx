"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { AnalysisPipeline } from "@/components/analysis/analysis-pipeline";
import { analyzeDeveloper } from "@/lib/analysis/engine";

export default function UserPage() {
    const params = useParams();
    const username = params.username as string;

    const { data: user, isLoading: userLoading, error: userError } = useGithubUser(
        username
    );
    const { data: repos, isLoading: repoLoading, error: repoError } = useGithubRepos(
        username
    );

    const steps = [
        {
            label: "Fetching GitHub profile",
            done: !!user,
        },
        {
            label: "Scanning repositories",
            done: !!repos,
        },
        {
            label: "Calculating language distribution",
            done: !!repos,
        },
        {
            label: "Detecting developer traits",
            done: !!repos,
        },
        {
            label: "Generating genome report",
            done: !!repos,
        },
    ];

    const analysis = useMemo(() => {
        if (!repos) return null;
        return analyzeDeveloper(repos);
    }, [repos]);

    const ready = user && repos && analysis;

    if (userError || repoError) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Data</h1>
                    <p className="text-muted-foreground">
                        {userError?.message || repoError?.message || "Something went wrong"}
                    </p>
                </div>
            </main>
        );
    }

    if (ready) {
        return (
            <main className="p-12">
                <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {JSON.stringify(analysis, null, 2)}
                </pre>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl font-bold">Analyzing {username}</h1>

            <AnalysisPipeline steps={steps} />
        </main>
    );
}
