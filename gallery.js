import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const gallery = document.getElementById("galleryContainer");

async function loadGallery(){

    const querySnapshot =
    await getDocs(collection(db,"gallery"));

    gallery.innerHTML="";

    querySnapshot.forEach((doc)=>{

        const data=doc.data();

        gallery.innerHTML+=`

        <div class="col-md-4">

            <a href="${data.url}" class="glightbox">

                <img
                src="${data.url}"
                class="img-fluid rounded-4 shadow gallery-img">

            </a>

        </div>

        `;

    });

}

loadGallery();