// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdeCQqhJKL2Ie1JuNszJqk0qftVZfEUnY",
  authDomain: "pantry-tracker-3abb1.firebaseapp.com",
  projectId: "pantry-tracker-3abb1",
  storageBucket: "pantry-tracker-3abb1.appspot.com",
  messagingSenderId: "982483332863",
  appId: "1:982483332863:web:f3f4297939fb5ab613e6ca",
  measurementId: "G-G84D9W5K3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}