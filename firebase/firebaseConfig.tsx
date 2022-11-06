import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { IFirebaseConfigProps } from '../types/firebase.interface';

const firebaseConfig: IFirebaseConfigProps = {
  apiKey: 'AIzaSyCZ3GyF0clIIV7OSxhKGcgvqLzwdRU6eMY',
  authDomain: 'rgsm-7221b.firebaseapp.com',
  projectId: 'rgsm-7221b',
  storageBucket: 'rgsm-7221b.appspot.com',
  messagingSenderId: '360046167171',
  appId: '1:360046167171:web:96c6683184a7253d9ac7b6',
};

// init firebase
initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

export { db };

