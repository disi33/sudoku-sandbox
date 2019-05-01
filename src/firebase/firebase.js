import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "pseudoku-app.firebaseapp.com",
    databaseURL: "https://pseudoku-app.firebaseio.com",
    projectId: "pseudoku-app",
    storageBucket: "pseudoku-app.appspot.com",
    messagingSenderId: "517417182245"
};

export default firebase.initializeApp(config);