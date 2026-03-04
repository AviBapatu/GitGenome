/**
 * Client-side GitHub API wrapper
 * Calls our Next.js API routes (which handle authentication server-side)
 */

import { NormalizedUser } from "@/lib/github/githubNormalizer";
import { GithubRepo } from "@/types/github";

/**
 * Fetch user profile via server API
 */
export const fetchGithubUser = async (username: string): Promise<NormalizedUser> => {
    const response = await fetch(`/api/github/user?username=${encodeURIComponent(username)}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Fetch repositories via server API
 * @param username - GitHub username
 * @param limit - Maximum number of repos to fetch (default: 15)
 * @param topOnly - If true, returns only top repos by recent activity (default: true)
 */
export const fetchGithubRepos = async (
    username: string,
    limit: number = 15,
    topOnly: boolean = true
): Promise<GithubRepo[]> => {
    const params = new URLSearchParams({
        username,
        limit: String(limit),
        topOnly: String(topOnly),
    });

    const response = await fetch(`/api/github/repos?${params}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }

    return response.json();
};
