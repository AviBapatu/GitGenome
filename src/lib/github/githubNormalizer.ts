/**
 * GitHub data normalizer
 * Converts GitHub API responses to our internal data format
 */

import { NormalizedRepo } from "@/types/github";
import type { GithubUserData, GithubRepoData } from "./githubClient";

export interface NormalizedUser {
    login: string;
    name: string | null;
    bio: string | null;
    avatarUrl: string;
    followers: number;
    following: number;
    publicRepos: number;
    createdAt: Date;
}

export const normalizeUser = (rawUser: GithubUserData): NormalizedUser => {
    return {
        login: rawUser.login,
        name: rawUser.name,
        bio: rawUser.bio,
        avatarUrl: rawUser.avatar_url,
        followers: rawUser.followers,
        following: rawUser.following,
        publicRepos: rawUser.public_repos,
        createdAt: new Date(rawUser.created_at),
    };
};

export const normalizeRepo = (rawRepo: GithubRepoData): NormalizedRepo => {
    return {
        name: rawRepo.name,
        language: rawRepo.language,
        size: rawRepo.size,
        createdAt: new Date(rawRepo.created_at),
        updatedAt: new Date(rawRepo.updated_at),
        description: rawRepo.description || undefined,
        topics: rawRepo.topics || undefined,
        commitCount: rawRepo.commitCount,
    };
};

export const normalizeRepos = (rawRepos: GithubRepoData[]): NormalizedRepo[] => {
    return rawRepos.map(normalizeRepo);
};
