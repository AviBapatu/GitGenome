/**
 * GitHub API client
 * Handles direct API interactions with GitHub
 * Uses server-side token from environment variables
 */

export interface GithubUserData {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    created_at: string;
}

export interface GithubRepoData {
    id: number;
    name: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    size: number;
    created_at: string;
    updated_at: string;
    description?: string | null;
    topics?: string[];
}

interface ApiResponse<T> {
    data: T;
    status: number;
    headers: Record<string, string>;
}

const BASE_URL = "https://api.github.com";

function getAuthHeaders(): Record<string, string> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error("GITHUB_TOKEN environment variable is not set");
    }
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
    };
}

async function makeRequest<T>(
    endpoint: string,
    params?: Record<string, string | number>
): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString(), {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            `GitHub API error: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
}

export const githubClient = {
    getUser: async (username: string): Promise<GithubUserData> => {
        return makeRequest<GithubUserData>(`/users/${username}`);
    },

    getRepos: async (
        username: string,
        page: number = 1,
        per_page: number = 100
    ): Promise<GithubRepoData[]> => {
        return makeRequest<GithubRepoData[]>(
            `/users/${username}/repos`,
            {
                page,
                per_page,
                sort: "updated",
                direction: "desc",
            }
        );
    },

    getRepoLanguages: async (owner: string, repo: string): Promise<Record<string, number>> => {
        return makeRequest<Record<string, number>>(
            `/repos/${owner}/${repo}/languages`
        );
    },

    getCommits: async (
        owner: string,
        repo: string,
        per_page: number = 100
    ): Promise<any[]> => {
        return makeRequest<any[]>(
            `/repos/${owner}/${repo}/commits`,
            { per_page }
        );
    },
};
