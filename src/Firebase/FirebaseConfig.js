
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAjYy7dMUAuQS6TpYRoaUDu7bvK7DguHh8",
  authDomain: "shipment-delivery-applic-30575.firebaseapp.com",
  projectId: "shipment-delivery-applic-30575",
  storageBucket: "shipment-delivery-applic-30575.appspot.com",
  messagingSenderId: "598371661293",
  appId: "1:598371661293:web:f200a0d15c520d0c74e3e4",
  measurementId: "G-LJP2GH2VGK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getAuth(app)

