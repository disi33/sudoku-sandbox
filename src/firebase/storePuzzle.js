import { Entropy } from 'entropy-string';
import firebase from './firebase';

const entropy = new Entropy({total: 1e6, risk: 1e6, prng: true});

const generateKey = () => entropy.string();

export const uploadPuzzle = content => firebase.storage().ref(generateKey()).putString(content);

export const getPuzzleDownloadUrl = key => firebase.storage().ref(key).getDownloadURL();