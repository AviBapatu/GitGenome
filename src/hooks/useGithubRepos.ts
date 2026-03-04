import { useQuery } from "@tanstack/react-query";
import { fetchGithubRepos } from "@/lib/githubApi";

interface UseGithubReposOptions {
    limit?: number;
    topOnly?: boolean;
}

export const useGithubRepos = (username: string, options: UseGithubReposOptions = {}) => {
    const { limit = 15, topOnly = true } = options;

    return useQuery({
        queryKey: ["github-repos", username, limit, topOnly],
        queryFn: () => fetchGithubRepos(username, limit, topOnly),
        enabled: !!username,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
    });
};
