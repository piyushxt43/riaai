import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8",
    authDomain: "ria-new.firebaseapp.com",
    projectId: "ria-new",
    storageBucket: "ria-new.firebasestorage.app",
    messagingSenderId: "64303120014",
    appId: "1:64303120014:web:7a724156580dbe5c1f13df",
    measurementId: "G-1SHJ6T2VST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
