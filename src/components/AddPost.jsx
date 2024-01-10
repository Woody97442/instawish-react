import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/userSlice";

function AddPost() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    const formData = new FormData();
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/post/add",
        {
          method: "POST",
          body: formData,
          headers: headersList,
        }
      );
      let data = await response.json();
      dispatch(fetchUser());
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreviewImage(URL.createObjectURL(file)); // Création de l'URL de l'aperçu de l'image
  };

  return (
    <div
      className="login-form-container w-full hidden"
      id="addPost">
      <form
        onSubmit={handleSubmit}
        className="login-form bg-white">
        <h2 className="brandtext mb-2">New Post</h2>
        <div className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          {/* Affichage de l'aperçu de l'image */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <button
          type="submit"
          className="btn mt-3">
          Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
