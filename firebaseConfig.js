// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getReactNativePersistence} from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxosGW3wChZ-H-Dh9TyWZ0T9ChNknK5CI",
    authDomain: "ecovida-13203.firebaseapp.com",
    projectId: "ecovida-13203",
    storageBucket: "ecovida-13203.appspot.com",
    messagingSenderId: "989903719875",
    appId: "1:989903719875:web:b8af6904a50be7bf670176",
    measurementId: "G-QMXLJ64LHX"
};

//989903719875-4eohpq60la1clbdhhp5qhb5i0cs53qv8.apps.googleusercontent.com

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage),
});