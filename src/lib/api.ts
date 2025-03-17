import {Class, ErrorPromise, Major, Review} from "@/src/lib/types";


/******************** Majors Portion of API ********************/
export const fetchClasses = async (majorName:string): Promise<Class[]> => {
    const response = await fetch(`/api/majors/${encodeURIComponent(majorName)}`);
    if(!response.ok){
        throw new Error(`Error fetching major: ${response.statusText}`)
    }

    return response.json();
}

export const fetchMajors = async()=>{
    const response = await fetch(`/api/majors`);
    if(!response.ok){
        throw new Error();
    }
    return response.json()
}

export const fetchMajorDetails = async (majorName: string)=>{
    const response = await fetch(`/api/majors/${decodeURIComponent(majorName)}`)
    if(!response.ok){
        throw new Error();
    }
    return response.json();
}

/******************** Classes Portion of API ********************/
export const fetchClassDetails = async (className: string)=>{
    console.log(`#### fetch details: ${className}`)
    const response = await fetch(`/api/classes/${encodeURIComponent(className)}`);
    if(!response.ok){
        throw new Error();
    }

    return response.json();
}

/******************** Reviews Portion of API ********************/

export const createReview = async(review: Review): Promise<Review>=>{
    console.log(`review in createReview: ${JSON.stringify(review)}`)
    const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    if(!response.ok){
        throw new Error(`Error creating review: ${response.statusText}`);
    }
    return response.json();
}

export const fetchReviews = async(classID: string) : Promise<Review[]>=>{
    const response = await fetch(`/api/reviews?classID=${encodeURIComponent(classID)}`);
    if(!response.ok){
        throw new Error(`Error fetching reviews: ${response.statusText}`)
    }
    return response.json()
}
