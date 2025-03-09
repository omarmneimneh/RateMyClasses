import type { DocumentReference } from "firebase/firestore";

export interface Major {
  id: string
  majorName: string
  majorCode: string
  courseCount: number
}

export interface Class {
  id: string
  classCode: string
  className: string
  credits: number
  description: string
  majorID: DocumentReference
  majorName: string
  reviewCount: number
}

export interface Review {
  id?: string
  classId: string
  difficultyRating: number
  enjoymentRating: number
  comment: string
  createdAt: Date
  likes: number
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

export interface AllMajorsPromise{
  majors: Major[]
}

export interface ErrorPromise{
  message: string
}