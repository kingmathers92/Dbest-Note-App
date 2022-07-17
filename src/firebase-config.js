import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: process.env.REACT_APP_AUTHDOMAIN,

  projectId: process.env.REACT_APP_PROJECTID,

  storageBucket: process.env.REACT_APP_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_MSGID,

  appId: process.env.REACT_APP_APPID,

  measurementId: process.env.REACT_APP_MEASID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);
