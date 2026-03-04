"use client";

import { useState } from "react";
import { ReportTabs } from "./report-tabs";
import { OverviewTab } from "./tabs/overview-tab";
// Other tabs will be imported here later
// import { TraitsTab } from "./tabs/traits-tab";
// import { RepositoriesTab } from "./tabs/repositories-tab";
// import { ActivityTab } from "./tabs/activity-tab";
// import { CompareTab } from "./tabs/compare-tab";

// Assuming these types exist as instructed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GithubUser = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GithubRepo = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeveloperProfile = any;

interface Props {
    user: GithubUser;
    repos: GithubRepo[];
    analysis: DeveloperProfile;
}

export function DeveloperReportLayout({ user, repos, analysis }: Props) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen p-8 space-y-8">
            <header className="flex items-center gap-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />

                <div>
                    <h1 className="text-3xl font-bold">{user.login}</h1>

                    <p className="text-sm opacity-70">
                        {user.followers} followers • {user.public_repos} repos
                    </p>
                </div>
            </header>

            <div>
                <ReportTabs active={activeTab} setActive={setActiveTab} />
            </div>

            <div className="mt-6">
                {activeTab === "overview" && <OverviewTab analysis={analysis} />}
                {activeTab === "traits" && <div>Traits coming soon...</div>}
                {activeTab === "repositories" && <div>Repositories coming soon...</div>}
                {activeTab === "activity" && <div>Activity coming soon...</div>}
                {activeTab === "compare" && <div>Compare coming soon...</div>}
            </div>
        </div>
    );
}
