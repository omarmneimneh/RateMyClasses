import { db } from "@/src/config/firebase";
import { doc, collection, query, where, limit, getDocs, getDoc, updateDoc, increment} from "firebase/firestore";
import { NextResponse } from "next/server";
import { ErrorPromise, Major} from "@/src/lib/types";
import { capitalizeWords } from "@/src/lib/utils";
class MajorController {
    private majorRef;
    constructor() {
        this.majorRef = collection(db, "Majors");
    }

    async getMajor(majorName: string) {
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
            return NextResponse.json({ majorInfo: "Internal server error, please try again later",e }, { status: 500 });
        }
    }
    async getAllMajors()/*: Promise<NextResponse<AllMajorsPromise | ErrorPromise>>*/ {
        try {
            const q = query(this.majorRef);
            const majorSnapshot = await getDocs(q);
            const majors : Major[] = majorSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    majorName: capitalizeWords(data.majorName),
                    majorCode: data.majorCode.toUpperCase(),
                    courseCount: data.courseCount
                };
            });
            return NextResponse.json(majors, { status: 200 });
        } catch (e) {
            const response: ErrorPromise = {
                message: `Internal Error ${e}`,
                status: 500
            };
            return NextResponse.json(response, { status: 500 });
        }
    }

    async getMajorByID(majorID: string) {
        try {
            const majorDoc = await getDoc(doc(this.majorRef, majorID));
            if (!majorDoc.exists()) {
                return NextResponse.json({ majorInfo: "Major not found" }, { status: 404 });
            }
            return NextResponse.json({
                majorInfo: 
                    {
                    id: majorDoc.id,
                    ...majorDoc.data()
                    }, 
                status: 200 
            });
        } catch (e) {

            return NextResponse.json({ message: `Internal server error, please try again later: ${e}` }, { status: 500 });
        }
    }

    async incrementCourseCount(majorName: string){
        try {
            const major = await this.getMajor(majorName.toLowerCase());
            const majorID = (await major.json()).majorInfo.id;
            await updateDoc(doc(this.majorRef, majorID), {
                courseCount: increment(1)
            });
        } catch(e) {
            return NextResponse.json({ message: `Internal server error, please try again later. ${e}` }, { status: 500 });
        }
    }
};

export default MajorController;
