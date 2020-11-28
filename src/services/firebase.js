import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBJXmCv7_QwYDfmVAJYLwc3wqtky1pz8F0",
  authDomain: "game-of-3.firebaseapp.com",
  databaseURL: "https://game-of-3.firebaseio.com",
  projectId: "game-of-3",
  storageBucket: "game-of-3.appspot.com",
  messagingSenderId: "869498797807",
  appId: "1:869498797807:web:983ae0b0b136bc1897651a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database().ref("games");
