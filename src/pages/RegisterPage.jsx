import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("woody97442@hotmail.fr");
  const [username, setUsername] = useState("woody97442");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("009864Brian@");
  const [confirmPassword, setConfirmPassword] = useState("009864Brian@");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 8;

    return hasLowerCase && hasUpperCase && hasNumber && isLengthValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("profilePicture", profilePicture);

    // for (const entry of formData.entries()) {
    //   console.log(entry[0], entry[1]);
    // }

    // Vérification des champs
    if (!username || !password || !confirmPassword || !email) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et faire au moins 8 caractères."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Exemple d'envoi des données à une API en utilisant FormData
    fetch("https://symfony-instawish.formaterz.fr/api/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Gérer la réponse de l'API
        console.log(data);
      })
      .catch((error) => {
        // Gérer les erreurs de requête
        console.error("Erreur lors de l'envoi des données:", error);
      });
  };

  return (
    <div className="container bg-login flex flex-col justify-center items-center">
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit}
          className="login-form bg-white">
          <h1 className="brandtext  mb-2">InstaWish</h1>
          <p>Sign up to see photos and videos</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="file"
              placeholder="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn mt-3">
            Sign up
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <div className="login-form bg-white">
          <p className="text-center text-sm">
            Do you have an account ? <Link to="/login"> Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
