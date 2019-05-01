import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "pseudoku-5aa2b.firebaseapp.com",
    databaseURL: "https://pseudoku-5aa2b.firebaseio.com",
    projectId: "pseudoku-5aa2b",
    storageBucket: "pseudoku-5aa2b.appspot.com",
    messagingSenderId: "212682065094"
};

export default firebase.initializeApp(config);