import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyB_N_GfJtJvjpj-LrxL1ieF3vGgCIWU88E",
  authDomain: "exam-test-84bd9.firebaseapp.com",
  projectId: "exam-test-84bd9",
  storageBucket: "exam-test-84bd9.firebasestorage.app",
  messagingSenderId: "190984937487",
  appId: "1:190984937487:web:6d4bda551c073bcd9ac37a",
  measurementId: "G-0MZFQXSQN7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'asia-south1'); 

export default app;
