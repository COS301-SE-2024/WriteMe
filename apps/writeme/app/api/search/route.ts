import { searchStories } from "apps/writeme/services/stories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const q = req.nextUrl.searchParams.get("q");
    const results = await searchStories(q || "");
    return NextResponse.json({
        results
    });
}