import firebase from './firebase';

const generateKey = () => {
    const chars = '2346789bdfghjmnpqrtBDFGHJLMNPQRT';
    return [...Array(10)].map(_ => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const uploadPuzzle = content => firebase.storage().ref(generateKey()).putString(content);

export const getPuzzleDownloadUrl = key => firebase.storage().ref(key).getDownloadURL();