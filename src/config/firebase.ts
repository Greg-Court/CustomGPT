import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA6wn1U9x0mDel3meXQEznyAjxOiF1cXlw',
  authDomain: 'custom-gpt-948c9.firebaseapp.com',
  projectId: 'custom-gpt-948c9',
  storageBucket: 'custom-gpt-948c9.appspot.com',
  messagingSenderId: '112476708556',
  appId: '1:112476708556:web:36a7452e9929cf3a6a6c69',
  measurementId: 'G-FW8XFHYK9P',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
