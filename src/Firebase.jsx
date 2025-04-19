import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Ce92FGgyUfOaAaNZIMDudldhwaOwXiU",
  authDomain: "lyfein-87c83.firebaseapp.com",
  projectId: "lyfein-87c83",
  storageBucket: "lyfein-87c83.firebasestorage.app",
  messagingSenderId: "997286274401",
  appId: "1:997286274401:web:db2dca79fcdb71b6c5d120",
  measurementId: "G-REXH069SWK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
