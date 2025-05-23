import ClassController from "@/src/lib/Controllers/classController";
import { NextRequest, NextResponse } from "next/server"
const cc = new ClassController();
type Params = Promise<{majorName:string}>

export async function GET(req: NextRequest, {params}: {params:Params}){
    const {majorName} = await params;
    if(!majorName){
        return NextResponse.json({
            "message": "Major name is required",
            "status": 400
        });
    }
    try{

        return await cc.getClassesFromMajor(majorName.toLowerCase());

    } catch(e){
        
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

export async function POST(req: NextRequest){
    const classData = await req.json();
    if(!classData){
        return NextResponse.json({
            message: "Class data is required",
            status: 400
        });
    }
    try{
        const response = await cc.addClass(classData);
        return NextResponse.json({
            ...response
        })
    } catch(e){
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}