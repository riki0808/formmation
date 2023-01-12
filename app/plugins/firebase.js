import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

//firebaseと接続させたよ！
const firebaseConfig = {
  apiKey: "AIzaSyC4wZkDME697d6OCBAxW_3sr-DUbw1z0Kk",
  authDomain: "formmation-e54bb.firebaseapp.com",
  projectId: "formmation-e54bb",
  storageBucket: "formmation-e54bb.appspot.com",
  messagingSenderId: "964079290714",
  appId: "1:964079290714:web:79fd81bab5162c5d618b63",
};

firebase.initializeApp(firebaseConfig);

// Emulatorの有効化
if (process.env.NODE_ENV != "production") {
  var functions = firebase.app().functions("us-central1");
  functions.useEmulator("localhost", 5001);
} else {
  var functions = firebase.functions();
}

//ここいじるよ！！
export const auth = firebase.auth();
export const db = firebase.firestore();
// export const storage = getStorage(firebase);

export default function (app, inject) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  inject("firebase", firebase);
  inject("firestore", firebase.firestore());
  inject("functions", functions);
  inject("fireAuth", firebase.auth());
  inject("authState", () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((auth) => {
        resolve(auth || null);
      });
    });
  });
  inject("fireStorage", firebase.storage());
}
