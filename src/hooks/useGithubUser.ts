import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "@/lib/githubApi";

export const useGithubUser = (username: string) => {
    return useQuery({
        queryKey: ["github-user", username],
        queryFn: () => fetchGithubUser(username),
        enabled: !!username,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
    });
};
