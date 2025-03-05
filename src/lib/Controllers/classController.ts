import { db } from "@/src/config/firebase";
import { doc, addDoc, collection, query, where, limit, getDocs, getDoc } from "firebase/firestore";
import { Class } from "@/src/lib/types";
import { NextResponse } from "next/server";

class ClassController{
    private majorRef;
    private classRef;
    constructor(){
        this.majorRef = collection(db, "Majors");
        this.classRef = collection(db, "Classes");
    };

    /**
     * creates a Class object using information stored in the request body
     * @param req = request to server
     * @param res = response from server
     * majorID is retrieved by querying Majors document
     */

    // async createClass(req: Request){ 
    //     console.log(req.body);
    //     const {majorName, className, classCode} = req.body
    //     try{
    //         const queryForMajor = query(this.majorRef, where("majorName", "==", majorName));
    //         const majorID = (await getDocs(queryForMajor)).docs[0].id;
            
    //         const newClass : Class = {
    //             majorID: doc(db, "Majors", majorID), 
    //             className: className, 
    //             classCode: classCode
    //         };
    //         const addingSnapShot = await addDoc(this.classRef, newClass);
    //         if(addingSnapShot.id.length == 0){
    //             return 404;
    //         }
    //         return 200;
            
    //     }catch(e){
    //         console.log(e);
    //     }
    // };
    
    private async getClassByName(className: string){
        try{
            const q = query(this.classRef, where('className', '==', className), limit(1));
            const classSnapShot = await getDocs(q);
            
            if (!classSnapShot.empty) {
                const classDoc = classSnapShot.docs[0].data();
    
                let majorData = null;
                if (classDoc.majorID) {
                    const majorRef = classDoc.majorID;
                    const majorSnap = await getDoc(majorRef);
                    
                    if (majorSnap.exists()) {
                        majorData = { id: majorSnap.id, ...majorSnap.data() };
                    }
                }
    
                return {
                    id: classSnapShot.docs[0].id,
                    classCode: classDoc.classCode,
                    className: classDoc.className,
                    major: majorData, 
                };
            }
            return null;
        } catch(e){
            return e;
        }
    };

    private async getClassByCode(classCode: string){ 
        try {
            console.log("getting class by code");
            
            const q = query(this.classRef, where("classCode", "==", classCode), limit(1));
            const classSnapShot = await getDocs(q);
    
            if (!classSnapShot.empty) {
                const classDoc = classSnapShot.docs[0].data();
    
                let majorData = null;
                if (classDoc.majorID) {
                    const majorRef = classDoc.majorID;
                    const majorSnap = await getDoc(majorRef);
                    
                    if (majorSnap.exists()) {
                        majorData = { id: majorSnap.id, ...majorSnap.data() };
                    }
                }
    
                return {
                    id: classSnapShot.docs[0].id,
                    classCode: classDoc.classCode,
                    className: classDoc.className,
                    major: majorData, 
                };
            }
    
            return null;
        }catch(error){
            console.error(error)
        }
    }

    /**
     * returns all classes across majors
    */
    async getClassesFromMajor(majorID: string) {
        try {
            const majorRef = doc(db, "Majors", majorID);
            const q = query(this.classRef, where("majorID", "==", majorRef));
            const classSnapShot = await getDocs(q);

            if (classSnapShot.empty) {
                return NextResponse.json({ classInfo: "No classes found" }, { status: 404 });
            }
            
            return NextResponse.json({
                classInfo: classSnapShot.docs.map((doc) => ({ 
                    id: doc.id, 
                    className: doc.data().className,
                    classCode: doc.data().classCode,
                    })),
            }, { status: 200 });
        } catch (e) {
            return NextResponse.json({ classInfo: `Internal error: ${e}` }, { status: 500 });
        }
    }

    async searchClasses(classID: string){
        try{
            const nameSnapShot = await this.getClassByName(classID);
            const codeSnapShot = await this.getClassByCode(classID);
            if(nameSnapShot.status == 200){
                return NextResponse.json({
                    classInfo : nameSnapShot,
                    status : 200
                })
            } 
            else if(codeSnapShot != null){
                return NextResponse.json({
                    classInfo : codeSnapShot,
                    status : 200
                })
            }
            else return NextResponse.json({
                classInfo: "Class not found",
                status: 404
            })

        } catch(e){
            console.error("Error fetching class:", e);
            return NextResponse.json({
                classInfo: `Internal error ${e}`,
                status: 500
            });
        }
    }
};
export default ClassController;