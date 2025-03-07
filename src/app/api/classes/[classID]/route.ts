import { NextRequest, NextResponse } from "next/server";
import ClassController  from "@/src/lib/Controllers/classController";
const cc = new ClassController();

export async function GET(req: NextRequest, {params}: {params:{classID: string}}){
    
    const classID = decodeURIComponent(params.classID.toLowerCase());
    console.log(classID);
    if (!classID) {
        return NextResponse.json({ message: "classID is required" }, { status: 400 });
    }
    try{
        return await cc.getClass(classID);
    } catch(e){
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}