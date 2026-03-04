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

    /**
     * Fetch all repositories for a user, handling pagination
     * Returns raw GitHub repo data so the analysis engine has access to all fields
     */
    fetchAllRepos: async (
        username: string,
        maxRepos: number = 100
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

            if (allRepos.length >= maxRepos) {
                return allRepos.slice(0, maxRepos);
            }
        }

        return allRepos;
    },

    /**
     * Fetch top N repositories by recent activity
     * Good for analysis as it focuses on actively maintained projects
     */
    fetchTopRepos: async (
        username: string,
        topN: number = 15
    ): Promise<GithubRepoData[]> => {
        // Fetch more than topN to ensure we get quality repos
        const repos = await githubService.fetchAllRepos(username, topN * 2);

        // Sort by update date and take top N
        return repos
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, topN);
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
