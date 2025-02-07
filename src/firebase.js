import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkkhNp-N6NYYHq-AME-vMuIxZBRxH2WB0",
  authDomain: "pokeapi-f9613.firebaseapp.com",
  projectId: "pokeapi-f9613",
  storageBucket: "pokeapi-f9613.firebasestorage.app",
  messagingSenderId: "706554360060",
  appId: "1:706554360060:web:c21df61486050045ca2779",
  measurementId: "G-7BQV7106JC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };


