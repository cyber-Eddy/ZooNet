// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCAFLEMGiyI7xPcg6NrQubX4QeImWqmU_0",
  authDomain: "zoo-db-7c859.firebaseapp.com",
  projectId: "zoo-db-7c859",
  storageBucket: "zoo-db-7c859.appspot.com",
  messagingSenderId: "536461667767",
  appId: "1:536461667767:web:c19008c5b384e43bde4c32",
  measurementId: "G-6ZRTZZTTCR"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

export const signOut = () => auth.signOut();
export const db = getFirestore(app);



// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export default app
