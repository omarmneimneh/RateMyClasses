import { NextRequest, NextResponse } from "next/server";
import ClassController  from "@/src/lib/Controllers/classController";
const cc = new ClassController();

export async function GET(req: NextRequest, {params}: {params:{classID: string}}){
    
    const {classID} = await params
    if (!classID) {
        return NextResponse.json({ message: "classID is required" }, { status: 400 });
    }
    try{
        const classData = await cc.searchClasses(classID);
        return classData;
    } catch(e){
        console.error("Error fetching class:", e);
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}