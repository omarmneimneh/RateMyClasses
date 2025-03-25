import { NextRequest, NextResponse } from "next/server";

import ReviewController from "@/src/lib/Controllers/reviewController";
const rc = new ReviewController();

export async function GET(req:NextRequest) /*Promise<NextResponse<ReviewPromise | ErrorPromise>>*/{
    const classID = req.nextUrl.searchParams.get("classID")
    if (!classID) {
        return NextResponse.json({ message: "Class ID is required", status: 400 })
    }
    try{
        return await rc.getReviews(classID);
    } catch(e){
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

export async function POST(req: NextRequest){
    try{
        const review = await req.json();
        return await rc.addReview(review);
    } catch(e){
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

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