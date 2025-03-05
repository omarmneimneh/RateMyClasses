import {Class, Major, Review} from "@/src/lib/types";

export const fetchClassesFromMajor = async (majorName:string): Promise<Class[]> => {
    const response = await fetch(`/api/majors/${encodeURIComponent(majorName)}`);
    if(!response.ok){
        throw new Error(`Error fetching major: ${response.statusText}`)
    }

    return response.json();
}

export const fetchMajors = async(): Promise<Major[]>=>{
    const response = await fetch(`/api/majors`);
    if(!response.ok){
        throw new Error();
    }
    return response.json()
}

export const fetchMajorDetails = async (majorName: string): Promise<Major> =>{
    const response = await fetch(`/api/majors/${decodeURIComponent(majorName)}`)
    if(!response.ok){
        throw new Error();
    }
    return response.json();
}