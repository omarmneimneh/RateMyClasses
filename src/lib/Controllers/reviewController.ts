import { Review, ErrorPromise } from "@/src/lib/types";
import {db} from "@/src/config/firebase";
import {collection, query, where, updateDoc, getDocs, addDoc, doc, increment, getDoc, runTransaction} from "firebase/firestore";
import { NextResponse } from "next/server";
import ClassController from "@/src/lib/Controllers/classController";

export default class ReviewController{
    private reviewRef;
    private cc;
    constructor(){
        this.reviewRef = collection(db, "Reviews");
        this.cc = new ClassController();
    }

    async getReviews(classID: string): Promise<NextResponse> {
        try{
            const q = query(this.reviewRef, where("classID", "==", classID));
            const reviewSnapshot = await getDocs(q);
            const reviews: Review[] = reviewSnapshot.docs.map((doc)=>({
                id: doc.id,
                ...(doc.data() as Omit<Review, "id">),
            }));
            return NextResponse.json(reviews);
        } catch(e){
            const response: ErrorPromise = {
                message: `Internal error ${e}`,
                status: 500
            }
            return NextResponse.json(response);
        }
    }

    async addReview(review: Review){
        try{

            const classRef = doc(db, "Classes", review.classID)
            await runTransaction(db, async (transaction)=>{
                const classDoc = await transaction.get(classRef)
                if(!classDoc.exists()){
                    throw new Error("Class does not exist")
                }
                const reviewCount = classDoc.data().reviewCount
                const rating = classDoc.data().rating
                const newRating = (review.rating + (rating * reviewCount)) / (reviewCount + 1);
                transaction.update(classRef, {
                    rating: newRating,
                    reviewCount: increment(1)
                })
            })

            const postedReview = await addDoc(this.reviewRef, review);
        
            
            return NextResponse.json({
                id: postedReview.id,
            }, { status: 201
            })
            
        } catch(e){
            console.error(e);
                return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }    

    async addReviewLike(reviewID: string){
        try{
            const docRef = doc(this.reviewRef, reviewID);
            await updateDoc(docRef,{
                likes: increment(1)
            });

            return {
                success: true,
                message: "Review liked successfully"
            }
        }catch(e){
            throw new Error(`Couldn't like review: ${e}`)
        }
    }
}

