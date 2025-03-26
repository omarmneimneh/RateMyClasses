import { NextRequest, NextResponse } from "next/server";
import ReviewController from "@/src/lib/Controllers/reviewController";

const rc = new ReviewController();
export async function PATCH(req: NextRequest) {
    const reviewID = req.nextUrl.searchParams.get("reviewID");

    if (!reviewID) {
        return NextResponse.json(
        { message: "Review ID is required." },
        { status: 400 }
        );
    }
    try {
        console.log("in patch");
        const result = await rc.addReviewLike(reviewID);
        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        console.error("Error liking review:", e);
        return NextResponse.json(
        {
            message: `Internal error: ${e}`,
        },
        { status: 500 }
        );
    }
}