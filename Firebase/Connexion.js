// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_HoYUjryM6eEB0x5Rs9sn-AU70YfqU4M",
  authDomain: "emarket-a6858.firebaseapp.com",
  databaseURL: "https://emarket-a6858-default-rtdb.firebaseio.com",
  projectId: "emarket-a6858",
  storageBucket: "emarket-a6858.appspot.com",
  messagingSenderId: "1083209775253",
  appId: "1:1083209775253:web:3629b15e8f79a7e2dc439c",
  measurementId: "G-HNGF5RBC9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth,db}