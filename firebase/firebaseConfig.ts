// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// export const firebaseConfig = {
//   apiKey: "AIzaSyCxYACY6kmhXZKRhtT8vqhYIDi5iWum-LU",
//   authDomain: "testapp-5bcee.firebaseapp.com",
//   projectId: "testapp-5bcee",
//   storageBucket: "testapp-5bcee.firebasestorage.app",
//   messagingSenderId: "892382268607",
//   appId: "1:892382268607:web:452b1ebfeb476a264d8a0a",
//   measurementId: "G-TNX95VRVBZ"
// };

// export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export const loginUser = async (email, password) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }
//   try {
//     return await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     if (error.code === 'auth/user-not-found') {
//       alert("No registered users with this email.");
//       return;
//     } else if (error.code === 'auth/wrong-password') {
//       alert("Incorrect password. Please try again.");
//     } else if (error.code === 'auth/invalid-credential') {  
//       alert("Invalid credentials. Please check your email and password.");
//     } else {
//       alert("An unexpected error occurred. Please try again later.");
//     }
//     throw error;
//   }
// };

// export const signupUser = async (email, password) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }
//   try {
//     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//     if (signInMethods.length > 0) {
//       alert("This user is already registered.");
//       return;
//     }
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     alert("User registered successfully!");
//     return userCredential;
//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {
//       alert("This user is already registered.");
//     } else if (error.code === "auth/invalid-email") {
//       alert("The email address is invalid.");
//     } else if (error.code === "auth/weak-password") {
//       alert("The password is too weak. Please use a stronger password.");
//     } else {
//       alert("An unexpected error occurred. Please try again later.");
//     }
//     throw error;
//   }
// };

// export const firestore = getFirestore(app);

// export { auth };


// export const db = getFirestore(app);

// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxYACY6kmhXZKRhtT8vqhYIDi5iWum-LU",
  authDomain: "testapp-5bcee.firebaseapp.com",
  projectId: "testapp-5bcee",
  storageBucket: "testapp-5bcee.firebasestorage.app",
  messagingSenderId: "892382268607",
  appId: "1:892382268607:web:452b1ebfeb476a264d8a0a",
  measurementId: "G-TNX95VRVBZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
