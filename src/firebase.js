
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA-CHAVE-AQUI",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-ID",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "ID-AQUI",
  appId: "APP-ID-AQUI"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
