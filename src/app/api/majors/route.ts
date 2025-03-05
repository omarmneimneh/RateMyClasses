import { NextRequest, NextResponse } from "next/server";
import MajorController from "@/src/lib/Controllers/majorController"

const mc = new MajorController();
export async function GET(){
    try{
        return mc.getAllMajors();
    } catch(e){
        console.log('error');
    }
}

