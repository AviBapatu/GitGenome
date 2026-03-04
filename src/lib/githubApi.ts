import axios from "axios";
import { GithubUser, GithubRepo } from "@/types/github";

const api = axios.create({
    baseURL: "https://api.github.com",
});

export const fetchGithubUser = async (
    username: string
): Promise<GithubUser> => {
    const { data } = await api.get(`/users/${username}`);
    return data;
};

export const fetchGithubRepos = async (
    username: string
): Promise<GithubRepo[]> => {
    const { data } = await api.get(`/users/${username}/repos?per_page=100`);
    return data;
};
