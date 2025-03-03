import { DocumentReference } from 'firebase/firestore';

export interface Class{
    majorID: DocumentReference;
    className:string;
    classCode:string;
}



