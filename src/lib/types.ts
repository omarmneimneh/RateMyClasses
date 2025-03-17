import type { DocumentReference } from "firebase/firestore";

export interface Major {
  id?: string
  majorName: string
  majorCode: string
  courseCount: number
}

export interface Class {
  id?: string
  classCode: string
  className: string
  credits: number
  description: string
  majorID: DocumentReference
  majorName: string
  reviewCount: number
  rating: number
}

export interface Review {
  id?: string
  classID: string
  className: string
  rating: number
  comment: string 
  createdAt: string
  likes: number
  semester: string
  yearTaken: string
}

// export interface User {
//   uid: string
//   displayName: string
//   email: string
//   photoURL?: string
//   major?: string
//   graduationYear?: string
// }

export interface MajorClassesPromises{
  majorInfo: Major | null
  classes: Class[] | string
}

export interface ReviewPromise{
  reviews: Review[] | []
}
export interface AllMajorsPromise{
  majors: Major[]
}

export interface ErrorPromise{
  message: string,
  status: number
}