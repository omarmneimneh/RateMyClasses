import { NextRequest, NextResponse } from "next/server";
import ClassController  from "@/src/lib/Controllers/classController";
const cc = new ClassController();
type Params =   Promise<{classID:string}>
export async function GET(
  req: NextRequest,
  { params }: { params: Params }
){
    const {classID} = await params
    if (!classID) {
        console.error("Class name required for classes/[className]");
        return NextResponse.json({ message: "classID is required" }, { status: 400 });
    }
    try{
        const response = await cc.getClass(decodeURIComponent(classID.toLowerCase()));
        return response;
    } catch(e){
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}