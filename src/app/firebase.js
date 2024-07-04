// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import {firebase} from 'firebase'

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfLs4V0Es-dY3bvIl0ecoBAmMwLtED0Kc",
    authDomain: "geesiai.firebaseapp.com",
    projectId: "geesiai",
    storageBucket: "geesiai.appspot.com",
    messagingSenderId: "539399114615",
    appId: "1:539399114615:web:4661847e3a9b1840715b72",
    measurementId: "G-FCSF4PDYDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
