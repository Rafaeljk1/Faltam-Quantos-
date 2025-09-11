// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AlzaSyD4bcFgtTlwZvcXWRMZH7-zW-3tHARM1Ag",
  authDomain: "login-e-cadastro-b23aa.firebaseapp.com",
  projectId: "login-e-cadastro-b23aa",
  storageBucket: "login-e-cadastro-b23aa.appspot.com",
  messagingSenderId: "403340965110",
  appId: "1:403340965110:web:045a495f1925264764b0e7",
  measurementId: "G-YGRSK1RYS3"
};

// Inicializa o Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);