/**
 * GET /api/github/user?username=username
 * Fetches GitHub user profile information
 */

import { NextRequest, NextResponse } from "next/server";
import { githubService } from "@/lib/github/githubService";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json(
                { error: "username parameter is required" },
                { status: 400 }
            );
        }

        const user = await githubService.fetchUser(username);

        return NextResponse.json(user, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";

        if (message.includes("404")) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
