import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBxEwCA-mnyakR2kvdMrJskxUtitR0dc9U",
  authDomain: "react-firebase-app-3db75.firebaseapp.com",
  databaseURL: "https://react-firebase-app-3db75.firebaseio.com",
  projectId: "react-firebase-app-3db75",
  storageBucket: "react-firebase-app-3db75.appspot.com",
  messagingSenderId: "968624372786",
  appId: "1:968624372786:web:7ce347dd7d43318470902b",
  measurementId: "G-8BCY0LZC5R"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
