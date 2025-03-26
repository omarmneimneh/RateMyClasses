import { db } from "@/src/config/firebase";
import { doc, collection, query, where, limit, getDocs, getDoc } from "firebase/firestore";
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
    
    async getClass(classInfo: string){
        try {     
            const nameQuery = query(this.classRef, where("className", "==", classInfo), limit(1));
            const codeQuery = query(this.classRef, where("classCode", "==", classInfo), limit(1));
            const [nameSnapshot, codeSnapshot] = await Promise.all([
                getDocs(nameQuery),
                getDocs(codeQuery),
            ]);
            
            if (nameSnapshot.empty && codeSnapshot.empty) {
                return this.returnClassNotFound();
            }
            const res = nameSnapshot.empty ? codeSnapshot.docs[0] : nameSnapshot.docs[0];
            const classData = res.data() as Omit<Class, "id">;
            // gets major info, may use later
            // if (classDoc.majorID) {
            //     const majorRef = classDoc.majorID;
            //     const majorSnap = await getDoc(majorRef);
                
            //     if (majorSnap.exists()) {
            //         majorData = { id: majorSnap.id, ...majorSnap.data() };
            //     }
            // }

            return NextResponse.json({
                classInfo:{
                    id: res.id,
                    ...classData
                }
            }, { status: 200 });
            
        }catch(e){
            return this.returnInternalError(e);
        }
    };
    
    async getClassByID(classID: string){
        try{
            const classDoc = await getDoc(doc(this.classRef, classID));
            if (!classDoc.exists()) {
                return this.returnClassNotFound();
            }
            
            return NextResponse.json({
                classInfo: { id: classDoc.id, ...classDoc.data() },
            }, { status: 200 });
        } catch(e){
            return this.returnInternalError(e);
        }
    }

    /**
     * returns all classes across majors
    */
    async getClassesFromMajor(majorName: string) {
        try {
            const q = query(this.classRef, where("majorName", "==", majorName));
            const classSnapShot = await getDocs(q);

            if (classSnapShot.empty) {
                return this.returnClassNotFound();
            }
            const classInfo=classSnapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()        
                }))
            
            
            return NextResponse.json({
                classInfo
            }, { status: 200 });

        } catch(e: unknown) {
            return this.returnInternalError(e);
        }
    }

    private returnClassNotFound(){
        return NextResponse.json({
            classInfo: "Class not found",
            status: 404
        });
    }

    private returnInternalError(e: unknown){  
        return NextResponse.json({
            classInfo: `Internal server error, ${e}`,
            status: 500
        });
    }
};
export default ClassController;