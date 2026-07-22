const CLOUD_NAME = "snjhuvsn";
const UPLOAD_PRESET = "yogen_gallery";

export async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
}