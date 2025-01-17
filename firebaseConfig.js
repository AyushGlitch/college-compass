import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyC2onSb_3QMfq2Sg9BNeqhnZcBpgR1OHjg',
    authDomain: 'college-compass-ae1e9.firebaseapp.com',
    projectId: 'college-compass-ae1e9',
    storageBucket: 'college-compass-ae1e9.firebasestorage.app',
    messagingSenderId: '956482444756',
    appId: '1:956482444756:web:b10dca27bd2d2164890a41',
    measurementId: 'G-T5T8YZWYT2',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
