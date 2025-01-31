// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyADFEjOES6yddPsBjyWy08eaS9c8kluEe4',
    authDomain: 'college-compass-6354f.firebaseapp.com',
    projectId: 'college-compass-6354f',
    storageBucket: 'college-compass-6354f.firebasestorage.app',
    messagingSenderId: '499007111473',
    appId: '1:499007111473:web:6c7882dca91bf8f6993010',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
