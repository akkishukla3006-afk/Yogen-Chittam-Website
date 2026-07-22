import { uploadToCloudinary } from "./cloudinary.js";
import { db } from "./firebase.js";

import {
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    collection
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/* ---------------- ELEMENTS ---------------- */

const uploadImageBtn = document.getElementById("uploadGallery");
const uploadVideoBtn = document.getElementById("uploadVideo");

const galleryContainer = document.getElementById("galleryContainer");
const videoContainer = document.getElementById("videoContainer");

const totalImages = document.getElementById("totalImages");
const totalVideos = document.getElementById("totalVideos");

const progressContainer =
document.getElementById("videoProgressContainer");

const progressBar =
document.getElementById("videoProgress");

let deleteId = "";
let deleteCollection = "";


/* ---------------- IMAGE UPLOAD ---------------- */

uploadImageBtn.addEventListener("click", async () => {

    const file =
    document.getElementById("galleryImage").files[0];

    if (!file) {
        alert("Choose an image.");
        return;
    }

    uploadImageBtn.disabled = true;
    uploadImageBtn.innerHTML = "Uploading...";

    try {

        const result =
        await uploadToCloudinary(file);

        await addDoc(collection(db, "gallery"), {

            url: result.secure_url,
            public_id: result.public_id,
            createdAt: new Date()

        });

        alert("Image Uploaded Successfully!");

        loadGallery();

    }

    catch (err) {

        console.error(err);
        alert(err.message);

    }

    uploadImageBtn.disabled = false;
    uploadImageBtn.innerHTML = "Upload Image";

});


/* ---------------- VIDEO UPLOAD ---------------- */

uploadVideoBtn.addEventListener("click", async () => {

    const file =
    document.getElementById("recordedVideo").files[0];

    if (!file) {

        alert("Choose a video.");
        return;

    }

    uploadVideoBtn.disabled = true;

    uploadVideoBtn.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Uploading...
    `;

    progressContainer.style.display = "block";

    progressBar.style.width = "20%";
    progressBar.innerHTML = "Preparing...";

    try {

        const result =
        await uploadToCloudinary(file);

        progressBar.style.width = "70%";
        progressBar.innerHTML = "Saving...";

        await addDoc(collection(db, "videos"), {

            url: result.secure_url,
            public_id: result.public_id,
            createdAt: new Date()

        });

        progressBar.style.width = "100%";
        progressBar.innerHTML = "Completed";

        alert("Video Uploaded Successfully!");

        loadVideos();

    }

    catch (err) {

        console.error(err);
        alert(err.message);

    }

    setTimeout(() => {

        uploadVideoBtn.disabled = false;

        uploadVideoBtn.innerHTML = "Upload Video";

        progressContainer.style.display = "none";

        progressBar.style.width = "0%";
        progressBar.innerHTML = "0%";

    },1000);

});


/* ---------------- LOAD GALLERY ---------------- */

async function loadGallery(){

    const snapshot =
    await getDocs(collection(db,"gallery"));

    galleryContainer.innerHTML="";

    totalImages.innerHTML = snapshot.size;

    snapshot.forEach((item)=>{

        const data=item.data();

        galleryContainer.innerHTML += `

        <div class="col-md-4">

            <div class="card preview-card">

                <img
                src="${data.url}"
                class="card-img-top">

                <div class="card-body">

                    <button
                    class="btn btn-danger delete-btn"
                    onclick="prepareDelete('gallery','${item.id}')">

                    🗑 Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}


/* ---------------- LOAD VIDEOS ---------------- */

async function loadVideos(){

    const snapshot =
    await getDocs(collection(db,"videos"));

    videoContainer.innerHTML="";

    totalVideos.innerHTML = snapshot.size;

    snapshot.forEach((item)=>{

        const data=item.data();

        videoContainer.innerHTML += `

        <div class="col-md-4">

            <div class="card preview-card">

                <video controls>

                    <source
                    src="${data.url}"
                    type="video/mp4">

                </video>

                <div class="card-body">

                    <button
                    class="btn btn-danger delete-btn"
                    onclick="prepareDelete('videos','${item.id}')">

                    🗑 Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
/* ---------------- DELETE ---------------- */

const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
);

const confirmDeleteBtn =
document.getElementById("confirmDelete");

/* Save document info before deleting */

window.prepareDelete = function(collectionName,id){

    deleteCollection = collectionName;
    deleteId = id;

    deleteModal.show();

};

/* Delete after confirmation */

confirmDeleteBtn.addEventListener("click", async ()=>{

    try{

        await deleteDoc(
            doc(db,deleteCollection,deleteId)
        );

        deleteModal.hide();

        if(deleteCollection==="gallery"){

            loadGallery();

        }else{

            loadVideos();

        }

        alert("Deleted Successfully!");

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

});


/* ---------------- INITIAL LOAD ---------------- */

loadGallery();

loadVideos();