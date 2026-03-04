import { GithubRepo } from "@/types/github";

export function countLanguages(repos: GithubRepo[]) {
    const map: Record<string, number> = {};

    repos.forEach((repo) => {
        if (!repo.language) return;

        map[repo.language] = (map[repo.language] || 0) + 1;
    });

    return map;
}

export function dominantLanguage(languageMap: Record<string, number>) {
    let max = 0;
    let lang: string | null = null;

    for (const key in languageMap) {
        if (languageMap[key] > max) {
            max = languageMap[key];
            lang = key;
        }
    }

    return lang;
}

export function reposPerYear(repos: GithubRepo[]) {
    const map: Record<string, number> = {};

    repos.forEach((repo) => {
        const year = new Date(repo.created_at).getFullYear();

        map[year] = (map[year] || 0) + 1;
    });

    return map;
}

export function inactiveRepoRatio(repos: GithubRepo[]) {
    const oneYear = 1000 * 60 * 60 * 24 * 365;

    const inactive = repos.filter((repo) => {
        const updated = new Date(repo.updated_at).getTime();
        return Date.now() - updated > oneYear;
    });

    return repos.length > 0 ? inactive.length / repos.length : 0;
}
