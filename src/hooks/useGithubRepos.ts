import { useQuery } from "@tanstack/react-query";
import { fetchGithubRepos } from "@/lib/githubApi";

export const useGithubRepos = (username: string) => {
    return useQuery({
        queryKey: ["github-repos", username],
        queryFn: () => fetchGithubRepos(username),
        enabled: !!username,
    });
};
