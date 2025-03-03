import { db } from "../../config/firebase";
import { doc, addDoc, collection, query, where, limit, getDocs, getDoc } from "firebase/firestore";
import { Class } from "../../../backend/Models/Classes";
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

    async createClass(req: Request){ 
        console.log(req.body);
        const {majorName, className, classCode} = req.body
        try{
            const queryForMajor = query(this.majorRef, where("majorName", "==", majorName));
            const majorID = (await getDocs(queryForMajor)).docs[0].id;
            
            const newClass : Class = {
                majorID: doc(db, "Majors", majorID), 
                className: className, 
                classCode: classCode
            };
            const addingSnapShot = await addDoc(this.classRef, newClass);
            if(addingSnapShot.id.length == 0){
                return 404;
            }
            return 200;
            
        }catch(e){
            console.log(e);
        }
    };
    
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
    async getAllClasses(){
        try{
            
            const q = query(this.classRef);
            const classSnapShot = await getDocs(q);
            if (classSnapShot.empty){
                return NextResponse.json({
                    "message": "No classes found",
                    "status": 404
                });
            }

            const classes = await Promise.all(classSnapShot.docs.map(async (doc) => {
                const classData = doc.data();
                let majorData = null;
                if (classData.majorID) {
                    const majorRef = classData.majorID;
                    const majorSnap = await getDoc(majorRef);
                    
                    if (majorSnap.exists()) {
                        majorData = { id: majorSnap.id, ...majorSnap.data() };
                    }
                }
                return {
                    id: doc.id,
                    classCode: classData.classCode,
                    className: classData.className,
                    major: majorData,
                };
            }));

            return NextResponse.json({
                "classes": classes,
                "status": 200
            });
        
        }catch(error){
            return NextResponse.json({
                "message": `Internal error ${error}`,
                "status": 500  
            })
        }
    }

    async searchClasses(classID: string){
        try{
            const nameSnapShot = await this.getClassByName(classID);
            const codeSnapShot = await this.getClassByCode(classID);
            if(nameSnapShot != null){
                return NextResponse.json({
                    "classInfo" : nameSnapShot,
                    "status" : 200
                })
            } 
            else if(codeSnapShot != null){
                return NextResponse.json({
                    "classInfo" : codeSnapShot,
                    "status" : 200
                })
            }
            else return NextResponse.json({
                "message": "Class not found",
                "status": 404
            })

        } catch(e){
            console.error("Error fetching class:", e);
            return NextResponse.json({
                message: `Internal error ${e}`,
                status: 500
            });
        }
    }
};
export default ClassController;