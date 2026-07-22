import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const videoContainer = document.getElementById("videoContainer");

async function loadVideos() {

    const querySnapshot = await getDocs(collection(db, "videos"));

    videoContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        videoContainer.innerHTML += `

        <div class="col-lg-4">

            <div class="card shadow border-0 h-100">

                <video controls class="card-img-top">
                    <source src="${data.url}" type="video/mp4">
                </video>

                <div class="card-body">

                    <h5 class="fw-bold">
                        Recorded Yoga Class
                    </h5>

                    <p class="text-secondary">
                        Watch anytime at your convenience.
                    </p>

                </div>

            </div>

        </div>

        `;

    });

}

loadVideos();