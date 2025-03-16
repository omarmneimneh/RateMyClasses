import {Class, Major, Review} from "@/src/lib/types";


/******************** Majors Portion of API ********************/
export const fetchClassesFromMajor = async (majorName:string): Promise<Class[]> => {
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
    const response = await fetch(`/api/classes/${decodeURIComponent(className)}`);
    if(!response.ok){
        throw new Error();
    }
    return response.json();
}


/******************** Review Portion of API ********************/
export const createReview = async (reviewData: Review): Promise<Review> => {
    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
        throw new Error(`Failed to create review: ${response.statusText}`);
    }
    return response.json();
}

export const fetchReviews = async (classID: string): Promise<Review[]> => {
    const response = await fetch(`/api/reviews?classID=${classID}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }
    return response.json();
}