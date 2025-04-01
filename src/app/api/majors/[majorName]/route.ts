import MajorController  from "@/src/lib/Controllers/majorController"
import { NextRequest, NextResponse } from "next/server"
const mc = new MajorController();

type Params = Promise<{majorName:string}>
export async function GET(req: NextRequest, {params}: {params:Params}){
    
    const {majorName} = await params;
    
    if(!majorName){
        return NextResponse.json({
            message: "Major name is required",
            status: 400
        });
    }
    try{
        const response = await mc.getMajor(decodeURIComponent(majorName.toLowerCase()));
        const majorSnapShot = await response.json();
        if(majorSnapShot.status!== 200){
            return NextResponse.json({
                message: "Major not found",
                status: 404
            });
        }
        
        const majorInfo = majorSnapShot.majorInfo;
        return NextResponse.json({
            majorInfo: majorInfo,
        });

    } catch(e){
        
        return NextResponse.json({
            message: `Internal error ${e}`,
            status: 500
        });
    }
}

