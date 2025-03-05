import { db } from "@/src/config/firebase";
import { doc, collection, query, where, limit, getDocs, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

class MajorController {
    private majorRef;
    private classRef;
    constructor() {
        this.majorRef = collection(db, "Majors");
        this.classRef = collection(db, "Classes");
    }

    async getMajorByName(majorName: string) {
        try {
            const q = query(this.majorRef, where("majorName", "==", majorName), limit(1));
            const majorSnapShot = await getDocs(q);
            
            if (majorSnapShot.empty) {
                return NextResponse.json({ majorInfo: "Major not found" }, { status: 404 });
            }
            
            const docData = majorSnapShot.docs[0];
            const response = {
                    id: docData.id,
                    ...docData.data(),
            }
            return NextResponse.json({majorInfo: response, status: 200} );
        } catch (e) {
            return NextResponse.json({ majorInfo: "Internal server error, please try again later" }, { status: 500 });
        }
    }
    async getAllMajors() {
        try {
            const q = query(this.majorRef);
            const majorSnapshot = await getDocs(q);
            const majors = majorSnapshot.docs.map((doc) => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            
            return NextResponse.json(majors, { status: 200 });
        } catch (e) {
            return NextResponse.json({ majorInfo: "Error retrieving majors" }, { status: 500 });
        }
    }
};

export default MajorController;
