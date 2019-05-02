import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "sudoku-sandbox.firebaseapp.com",
    databaseURL: "https://sudoku-sandbox.firebaseio.com",
    projectId: "sudoku-sandbox",
    storageBucket: "sudoku-sandbox.appspot.com",
    messagingSenderId: "698959756837",
    appId: "1:698959756837:web:32893e73de148887"
};

export default firebase.initializeApp(config);