import ClassController from "@/src/lib/Controllers/classController";
import MajorController  from "@/src/lib/Controllers/majorController"
import { NextRequest, NextResponse } from "next/server"
const mc = new MajorController();
const cc = new ClassController();
type Params = Promise<{majorID:string}>
export async function GET(req: NextRequest, {params}: {params:Params}){
    
    const {majorID} = await params;
    if(!majorID){
        return NextResponse.json({
            "message": "Major name is required",
            "status": 400
        });
    }
    try{
        const response = await mc.getMajor(decodeURIComponent(majorID.toLowerCase()));
        const majorSnapShot = await response.json();
        if(majorSnapShot.status!== 200){
            return NextResponse.json({
                message: "Major not found",
                status: 404
            });
        }
        
        const majorInfo = majorSnapShot.majorInfo;

        const classesResponse = await cc.getClassesFromMajor(majorInfo.majorName.toLowerCase());
        const classSnapShot = await classesResponse.json();
        const classesInfo = classSnapShot.classInfo;
        
        return NextResponse.json({
            majorInfo: majorInfo,
            classes: classesInfo
        });

    } catch(e){
        
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

