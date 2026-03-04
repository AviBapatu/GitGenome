/**
 * GET /api/github/repos?username=username&limit=15
 * Fetches GitHub repositories for a user
 *
 * Query parameters:
 * - username (required): GitHub username
 * - limit (optional): Maximum number of repos to return (default: 100)
 * - topOnly (optional): If true, returns only top repos by recent activity (default: true)
 */

import { NextRequest, NextResponse } from "next/server";
import { githubService } from "@/lib/github/githubService";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const username = searchParams.get("username");
        const limit = searchParams.get("limit");
        const topOnly = searchParams.get("topOnly") !== "false";

        if (!username) {
            return NextResponse.json(
                { error: "username parameter is required" },
                { status: 400 }
            );
        }

        const repoLimit = limit ? parseInt(limit, 10) : 15;

        if (isNaN(repoLimit) || repoLimit < 1) {
            return NextResponse.json(
                { error: "limit must be a positive number" },
                { status: 400 }
            );
        }

        let repos;

        if (topOnly) {
            repos = await githubService.fetchTopRepos(username, repoLimit);
        } else {
            repos = await githubService.fetchAllRepos(username, repoLimit);
        }

        return NextResponse.json(repos, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";

        if (message.includes("404")) {
            return NextResponse.json(
                { error: "User or repos not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
