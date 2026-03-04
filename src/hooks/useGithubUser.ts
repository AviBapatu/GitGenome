import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "@/lib/githubApi";

export const useGithubUser = (username: string) => {
    return useQuery({
        queryKey: ["github-user", username],
        queryFn: () => fetchGithubUser(username),
        enabled: !!username,
    });
};
