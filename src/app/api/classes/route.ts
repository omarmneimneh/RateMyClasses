import { NextRequest, NextResponse } from "next/server";
import ClassController  from "@/src/lib/Controllers/classController";
const cc = new ClassController();

export async function GET(){
    try{
        return cc.getAllClasses();
    } catch(e){
        console.error("Error fetching class:", e);
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}