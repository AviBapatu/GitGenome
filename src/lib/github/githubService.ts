/**
 * GitHub service layer
 * Handles high-level GitHub data operations: fetching, aggregating, and normalizing
 */

import { githubClient, type GithubRepoData } from "./githubClient";
import { normalizeUser, type NormalizedUser } from "./githubNormalizer";

export const githubService = {
    /**
     * Fetch user profile information
     */
    fetchUser: async (username: string): Promise<NormalizedUser> => {
        const rawUser = await githubClient.getUser(username);
        return normalizeUser(rawUser);
    },

    fetchAllRepos: async (
        username: string,
        maxRepos: number = 1000
    ): Promise<GithubRepoData[]> => {
        const perPage = 100;
        const pagesNeeded = Math.ceil(maxRepos / perPage);
        const allRepos: GithubRepoData[] = [];

        for (let page = 1; page <= pagesNeeded; page++) {
            const rawRepos = await githubClient.getRepos(
                username,
                page,
                perPage
            );

            if (rawRepos.length === 0) {
                break;
            }

            allRepos.push(...rawRepos);
        }

        // Filter rules
        const validRepos = allRepos.filter(repo =>
            repo.fork === false &&
            repo.archived === false &&
            repo.size > 0 &&
            (repo.owner?.login || "").toLowerCase() === username.toLowerCase()
        );

        // Sort by updated_at to ensure order
        validRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        const finalRepos = validRepos.slice(0, maxRepos);

        // Fetch commit count for deep layer (top 30 repos)
        const top30 = finalRepos.slice(0, 30);
        await Promise.all(top30.map(async (repo) => {
            if (repo.owner?.login) {
                repo.commitCount = await githubClient.getRepoCommitsCount(repo.owner.login, repo.name, username);
            }
        }));

        return finalRepos;
    },

    /**
     * Fetch top N repositories by recent activity
     * Good for analysis as it focuses on actively maintained projects
     */
    fetchTopRepos: async (
        username: string,
        topN: number = 15
    ): Promise<GithubRepoData[]> => {
        return githubService.fetchAllRepos(username, topN);
    },

    /**
     * Fetch comprehensive user data: profile + repositories
     */
    fetchUserWithRepos: async (username: string) => {
        const [user, repos] = await Promise.all([
            githubService.fetchUser(username),
            githubService.fetchAllRepos(username),
        ]);

        return { user, repos };
    },
};
