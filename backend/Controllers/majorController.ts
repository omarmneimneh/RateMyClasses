import { db } from "../../config/firebase";
import { Request, Response } from "express";
import {collection, getDoc, query, where, getDocs} from 'firebase/firestore';

const majorRef = collection(db, "Majors");

async function getMajorID(req: Request, res: Response){
    const majorName = req.body;
    try{
        const q = query(majorRef, where("majorName", "==", majorName));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty){

        }
    }
}