import { NextResponse } from "next/server";
import MajorController from "@/src/lib/Controllers/majorController"


const mc = new MajorController();
export async function GET(){
    try{
        return mc.getAllMajors();
    } catch(e){
        return NextResponse.json({
            "message": `Internal error ${e}`,
            "status": 500
        });
    }
}

