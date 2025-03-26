import {Class, Review} from "@/src/lib/types";


/******************** Majors Portion of API ********************/
export const fetchClasses = async (majorName:string)=> {
    const response = await fetch(`/api/majors/${decodeURIComponent(majorName)}/classes`);
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

export const addClass = async (classData: Class): Promise<Class> => {
    const response = await fetch(`/api/classes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    });
    if(response.ok){
        return response.json();
    }
    throw new Error("Couldn\'t add class");
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

export const likeReview = async (reviewID: string) => {
    const response = await fetch(`/api/reviews/${reviewID}/like`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to add like: ${response.statusText}`);
    }

    return response.json();
};