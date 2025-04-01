import { db } from "@/src/config/firebase";
import { doc, collection, query, where, limit, getDocs, getDoc, addDoc} from "firebase/firestore";
import { Class } from "@/src/lib/types";
import { NextResponse } from "next/server";
import MajorController from "./majorController";

class ClassController{
    private mc;
    private classRef;
    constructor(){
        this.mc = new MajorController();
        this.classRef = collection(db, "Classes");
    };

    /**
     * creates a Class object using information stored in the request body
     * @param req = request to server
     * @param res = response from server
     * majorID is retrieved by querying Majors document
     */

    
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
            if (!classData) {
                return this.returnClassNotFound();
            }
            return NextResponse.json({
                classInfo:{
                    id: res.id,
                    ...classData
                },
                status:200
            },);
            
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
        return{
            classInfo: "Class not found",
            status: 404
        };
    }

    private returnInternalError(e: unknown){  
        return NextResponse.json({
            classInfo: `Internal server error, ${e}`,
            status: 500
        });
    }

    async addClass(classDetails: Class){ 
        try{
            const getByName = await this.getClass(classDetails.className.toLowerCase());
            const getByClassCode = await this.getClass(classDetails.classCode.toLowerCase());
            
            if (getByName.status === 200 || getByClassCode.status === 200) {
                return {
                    success: false,
                    message: "Class already exists",
                    status: 404
                };
            }

            // If the class does not exist, proceed to add it
            await this.mc.incrementCourseCount(classDetails.majorName);            
            const addingSnapShot = await addDoc(this.classRef, {
                ...classDetails});
            if(addingSnapShot.id){
                return {
                    success: true,
                    id: addingSnapShot.id,
                    ...classDetails
                }
            }   
        }catch(e){
            return this.returnInternalError(e);
        }
    };
};
export default ClassController;