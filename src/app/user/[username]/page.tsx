"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { AnalysisPipeline } from "@/components/analysis/analysis-pipeline";
import { DeveloperReportLayout } from "@/components/report/developer-report-layout";
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
            label: "Extracting profile DNA...",
            done: !!user,
        },
        {
            label: "Scanning commit behavior...",
            done: !!repos,
        },
        {
            label: "Analyzing language genetics...",
            done: !!repos,
        },
        {
            label: "Detecting developer mutations...",
            done: !!repos,
        },
        {
            label: "Generating genome report...",
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
            <main className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-poppins text-pink-500 mb-2">Genome Sequence Failed</h1>
                    <p className="text-slate-600">
                        {userError?.message || repoError?.message || "Something went wrong in the lab."}
                    </p>
                </div>
            </main>
        );
    }

    if (ready) {
        return (
            <DeveloperReportLayout
                user={user}
                repos={repos}
                analysis={analysis}
            />
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-50">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-poppins mb-2">Scanning Specimen</h1>
                <p className="text-xl text-indigo-600 font-semibold">@{username}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-md w-full">
                <AnalysisPipeline steps={steps} />
            </div>
        </main>
    );
}
