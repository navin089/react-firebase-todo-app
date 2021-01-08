// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBhSybFJY5ikVEu-sRIeDIIJ7kvr5VhPTw",
    authDomain: "todo-app-cp-ccb01.firebaseapp.com",
    projectId: "todo-app-cp-ccb01",
    storageBucket: "todo-app-cp-ccb01.appspot.com",
    messagingSenderId: "476853744368",
    appId: "1:476853744368:web:74dfaad4ec2cb2a6f6c835",
    measurementId: "G-ZKBCHCQMCC"
});

const db = firebaseApp.firestore();

export default db; 