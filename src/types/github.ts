export interface GithubUser {
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    created_at: string;
}

export interface GithubRepo {
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

/**
 * Normalized repo data for analysis
 * The analysis engine works with normalized data to keep logic clean
 */
export interface NormalizedRepo {
    name: string;
    language: string | null;
    size: number;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    topics?: string[];
}
