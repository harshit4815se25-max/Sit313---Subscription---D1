import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDfWISmMFNDaRoQSRN8y2koHCXirQOttpc",
  authDomain: "dev-deakin-d1-subscription.firebaseapp.com",
  projectId: "dev-deakin-d1-subscription",
  storageBucket: "dev-deakin-d1-subscription.firebasestorage.app",
  messagingSenderId: "236659395745",
  appId: "1:236659395745:web:bc3a2832db1c0a0c76f4e0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;