import ClassController from "@/src/lib/Controllers/classController";
import MajorController  from "@/src/lib/Controllers/majorController"
import { NextRequest, NextResponse } from "next/server"
const mc = new MajorController();
const cc = new ClassController();

export async function GET(req: NextRequest, {params}: {params:{majorID: string}}){
    
    const majorID = await decodeURIComponent(params.majorID);
    console.log(majorID);
    if(!majorID){
        return NextResponse.json({
            "message": "Major name is required",
            "status": 400
        });
    }
    try{
        const response = await mc.getMajorByName(majorID);
        const majorSnapShot = await response.json();
        if(majorSnapShot.status!== 200){
            return NextResponse.json({
                "message": "Major not found",
                "status": 404
            });
        }
        
        const majorInfo = majorSnapShot.majorInfo;

        const classesResponse = await cc.getClassesFromMajor(majorInfo.id);
        const classSnapShot = await classesResponse.json();
        const classesInfo = classSnapShot.classInfo;
        
        return NextResponse.json({
            "majorInfo": majorInfo,
            "classes": classesInfo
        });

    } catch(e){
        console.error("Error fetching class:", e);
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}

