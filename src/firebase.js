
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useId } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCNW0BgMaSBTio_D_laxC-ql8uhR2DWUCk",
  authDomain: "netflix-clone-4b3c8.firebaseapp.com",
  projectId: "netflix-clone-4b3c8",
  storageBucket: "netflix-clone-4b3c8.firebasestorage.app",
  messagingSenderId: "407557407857",
  appId: "1:407557407857:web:72af88b7a10d40f22307d0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

const signup =async (name,email,password) => {
     try {
     const res =  await createUserWithEmailAndPassword(auth, email, password)
     const user = res.user;
     await addDoc(collection(db, "user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
     })
     } catch (error) {
        console.log(error)
        alert(error)
     }
}

const login= async (email,password) => {
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const logout =() => {
    signOut(auth);
}

export {auth,db,login,signup,logout};