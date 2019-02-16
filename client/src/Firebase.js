import firebase from 'firebase'
// const functions = require('firebase-functions');
var config = {
  apiKey: "AIzaSyBDoJlMgC3W749ra5MsantmhArh-Z2wziw",
  authDomain: "codeclimbers-1c849.firebaseapp.com",
  databaseURL: "https://codeclimbers-1c849.firebaseio.com/",
  storageBucket: "codeclimbers-1c849.appspot.com"
};
let firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.database();
export default db;
// functions.db.ref('code').onUp
// firebase.initializeApp(config);
