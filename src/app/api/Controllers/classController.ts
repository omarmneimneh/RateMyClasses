import { Request, Response } from "express";
import { db } from "../../config/firebase";
import { doc, addDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { Class } from "../Models/Classes";
import { get } from "http";

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
            const q = query(this.classRef, where('classCode', '==', className), limit(1));
            const classID = await getDocs(q);
            if(classID.empty){
                return null;
            }
            return classID.docs[0].data();
        } catch(e){
            return e;
        }
    };

    private async getClassByCode(classCode: string){ 
        try{
            console.log("getting class by code");
            const q = query(this.classRef, where("classCode", "==", classCode), limit(1));
            const classSnapShot = await getDocs(q);
            if (!classSnapShot.empty){
                return null;
            }
            return classSnapShot.docs[0].data();
        }catch(error){
            console.error(error)
        }
    }


    /**
     * returns a class document based on classID
     */
    async getClassByID(req: Request, res: Response){
        try{
            const classID = req.params['classID']
            const q = query(this.classRef, where("id", "==", classID), limit(1));
            const classSnapShot = await getDocs(q);
            if (!classSnapShot.empty){
                return res.status(404).json({message: "Class Not Found"});
            }
            return res.status(200).json(classSnapShot.docs[0].data());
        }catch(error){
            console.error(error)
        }
    }

    /**
     * returns all classes in a major
    */
    async getAllClasses(req: Request, res: Response){
        try{
            const majorName = req.params['majorName']
            const q = query(this.classRef, where("majorName", "==", majorName));
            const classSnapShot = await getDocs(q);
            const classList = classSnapShot.docs.map((doc) => doc.data());
            return res.status(200).json(classList);
        }catch(error){
            return res.status(500).json({message: "Error fetching classes"});
        }
    }

    async searchClasses(req: Request){
        const query = req.query['class'] as string;
        console.log("query: ", query);
        if(!query){
            return null;
        }
        try{
            const nameSnapShot = await this.getClassByName(query);
            const codeSnapShot = await this.getClassByCode(query);
            if(!codeSnapShot && !nameSnapShot){
                return null;
            }
            const classList = nameSnapShot ? nameSnapShot : codeSnapShot;
            console.log(typeof classList)
            return classList

        } catch(e){
            return "error";
        }
    }
};
export default ClassController;