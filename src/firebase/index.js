import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyANlRrTSWKbNozbjw1VqvQccakTpAc5L7Y",
    authDomain: "summative-8d0c9.firebaseapp.com",
    projectId: "summative-8d0c9",
    storageBucket: "summative-8d0c9.firebasestorage.app",
    messagingSenderId: "991122029281",
    appId: "1:991122029281:web:2f24836867b677d10595a0"
  };  

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };