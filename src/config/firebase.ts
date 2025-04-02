import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import 'firebaseui/dist/firebaseui.css'
import { config } from "dotenv";
config();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCZodgmRgZsG-qgAZLm24J6q_dCS9Rm8Co",
//   authDomain: "ratemyclasses-c70c2.firebaseapp.com",
//   projectId: "ratemyclasses-c70c2",
//   storageBucket: "ratemyclasses-c70c2.firebasestorage.app",
//   messagingSenderId: "360721220097",
//   appId: "1:360721220097:web:fc0f18b4c0e25e76a13600",
//   measurementId: "G-2E6RF7X1M3"
// };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const uiConfig = {
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
    ],
};

export { db, app, auth, provider, uiConfig, firebaseConfig };

