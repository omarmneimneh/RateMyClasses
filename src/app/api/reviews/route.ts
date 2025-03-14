import {ErrorPromise, ReviewPromise, Review} from "@/src/lib/types";
import { NextRequest, NextResponse } from "next/server";

import ReviewController from "@/src/lib/Controllers/reviewController";
const rc = new ReviewController();

export async function GET(req:NextRequest): Promise<NextResponse<ReviewPromise | ErrorPromise>>{
    const searchParams = req.nextUrl.searchParams
    const classId = searchParams.get("classId")
    if (!classId) {
        return NextResponse.json({ message: "Class ID is required", status: 400 })
    }

    try{
        const response = await rc.getReviews(classId);
        return response;
    } catch(e){
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

export async function POST(req: Request){
    //Error here
    try{
        const review = req.body;
        return await rc.addReview(review);
    } catch(e){
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}