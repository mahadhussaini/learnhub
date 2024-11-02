import "./addNewProfile.css";
import React, { useState } from "react";

const AddNewProfile = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // State to hold uploaded image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(file.type) && file.size <= 2000000) {
        // 2MB limit
        setSelectedImage(URL.createObjectURL(file));
        setMessage("");
      } else {
        setMessage("Please select a valid image (JPEG, PNG, GIF) under 2MB.");
      }
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      setUploading(true);
      setMessage("Uploading...");

      // Simulate an API call
      setTimeout(() => {
        // Here you would typically handle the upload to the server
        setUploading(false);
        setMessage("Profile picture uploaded successfully!");
        setUploadedImage(selectedImage); // Store the uploaded image
        setSelectedImage(null); // Clear the selected image after upload
      }, 2000);
    } else {
      setMessage("Please select an image to upload.");
    }
  };

  return props.trigger ? (
    <div
      className="popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="popup-inner">
        <h1 id="modal-title" className="flex mx-auto font-bold mb-5">
          UPLOAD A PROFILE PICTURE
        </h1>

        {message && <p className="text-red-600">{message}</p>}

        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded Profile Preview"
            className="mx-auto mb-4 rounded-full border border-gray-300 w-32 h-32 object-cover"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpload}
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            type="button"
            onClick={() => {
              props.setTrigger(false);
              setSelectedImage(null);
              setUploadedImage(null); // Clear uploaded image on close
              setMessage("");
            }}
            className="close-btn text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddNewProfile;
