import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuM9SuTRDbVb6fYgIVAF5WTFmPLn469qc",
    authDomain: "veghacker-test.firebaseapp.com",
    projectId: "veghacker-test",
    storageBucket: "veghacker-test.appspot.com",
    messagingSenderId: "898186969394",
    appId: "1:898186969394:web:bbf37802f423bb4dff972b",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
export const firestore = firebase.firestore();
