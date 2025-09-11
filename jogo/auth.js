// auth.js
import { auth } from './firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    setPersistence, 
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Registro
export function registrarUsuario(email, senha) {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return createUserWithEmailAndPassword(auth, email, senha);
        })
        .then((userCredential) => {
            alert("Usuário cadastrado e logado com sucesso!");
            console.log("Usuário:", userCredential.user);
        })
        .catch((error) => {
            alert("Erro ao cadastrar: " + error.message);
        });
}

// Login
export function loginUsuario(email, senha) {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, senha);
        })
        .then((userCredential) => {
            alert("Login realizado com sucesso!");
            console.log("Usuário:", userCredential.user);
        })
        .catch((error) => {
            alert("Erro ao fazer login: " + error.message);
        });
}

// Logout
export function logoutUsuario() {
    signOut(auth).then(() => {
        alert("Logout realizado com sucesso!");
    }).catch((error) => {
        alert("Erro ao sair: " + error.message);
    });
}