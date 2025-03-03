import {DocumentReference} from 'firebase/firestore'
export interface Review {
    classID:DocumentReference;
    date: Date;
    enjoymentRating: number;
    difficultyRating: number;
    comment: string;
    tags: string[];
}