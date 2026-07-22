import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then(() => {

        window.location.href = "admin.html";

    })

    .catch((error) => {

        document.getElementById("message").innerHTML =
        "Invalid Email or Password";

        console.log(error);

    });

});