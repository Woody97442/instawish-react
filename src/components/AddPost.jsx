import React, { useState } from "react";

function AddPost() {
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
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
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
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
            onChange={(e) => setPicture(e.target.value)}
          />
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
