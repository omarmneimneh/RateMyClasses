import { Review, ReviewPromise, ErrorPromise } from "@/src/lib/types";
import {db} from "@/src/config/firebase";
import { collection, query, where, getDocs, writeBatch, doc, increment, getDoc} from "firebase/firestore";
import { NextResponse } from "next/server";
import ClassController from "@/src/lib/Controllers/classController";
export default class ReviewController{
    private reviewRef;
    private cc;
    constructor(){
        this.reviewRef = collection(db, "Reviews");
        this.cc = new ClassController();
    }

    async getReviews(classID: string){
        try{
            const q = query(this.reviewRef, where("classID", "==", classID));
            const reviewSnapshot = await getDocs(q);
            if(reviewSnapshot.empty){
                const response: ErrorPromise ={
                    message: "No reviews found",
                }
                return NextResponse.json(response);
            }
            const reviews: Review[] = [];
            reviewSnapshot.forEach((doc)=>{
                const review = doc.data() as Review;
                review.id = doc.id;
                reviews.push(review);
            });
            return NextResponse.json({reviews: reviews});
        } catch(e){
            const response: ErrorPromise = {
                message: `Internal error ${e}`
            }
            return NextResponse.json(response);
        }
    }

    async addReview(review: Review){
        try{
            console.log(`review: ${review}`)
            const classRef = doc(db, "Classes", review.classID)
            const batch = writeBatch(db)

            const newReview = doc(this.reviewRef);
            batch.set(newReview,{
                classID: review.classID,
                className: review.className,
                rating: review.rating,
                comment: review.comment,
                createdAt:review.createdAt,
                likes: review.likes
            })

            batch.update(classRef, {
                reviewCount: increment(1)
            })

            await batch.commit()

            const postedReview = await getDoc(newReview);
            if(postedReview.exists()){
                return NextResponse.json({
                    ...postedReview
                })
            }
        } catch(e){
            console.error(e);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }
}


