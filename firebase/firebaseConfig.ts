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
