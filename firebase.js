import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyCVgoKCuNG0GUfR674LuvF25V6bH3dAUuE",

  authDomain: "yogen-chittam.firebaseapp.com",

  projectId: "yogen-chittam",

  storageBucket: "yogen-chittam.firebasestorage.app",

  messagingSenderId: "555251179353",

  appId: "1:555251179353:web:daac159f232b4a6ae73648",

  measurementId: "G-3GKQVBJZ0F"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);