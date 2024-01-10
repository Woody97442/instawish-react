import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("woody97442@hotmail.fr");
  const [username, setUsername] = useState("woody97442");
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState("Woody97442");
  const [confirmPassword, setConfirmPassword] = useState("Woody97442");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 8;

    return hasLowerCase && hasUpperCase && hasNumber && isLengthValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    let headersList = {
      "Accept": "*/*",
    };

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // Utilisation de fetch pour envoyer les données
    try {
      const response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/register",
        {
          method: "POST",
          body: formData,
          headers: headersList,
        }
      );

      const data = await response.text();
      setError(data.status);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
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
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="btn mt-3">
            Sign up
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
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
