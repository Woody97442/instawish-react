import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("woody97442@hotmail.fr");
  const [password, setPassword] = useState("Woody97442");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez implémenter la logique de validation des identifiants
    // Par exemple, vous pouvez envoyer les données à un serveur ou les vérifier localement
    if (username === "utilisateur" && password === "motdepasse") {
      console.log("Connexion reussie");
      // dispatch(login({ username }));
    }
  };

  return (
    <div className="container bg-login flex flex-col justify-center items-center">
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit}
          className="login-form bg-white">
          <h1 className="brandtext  mb-2">InstaWish</h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
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
          </div>
          <button
            type="submit"
            className="btn mt-3">
            Login
          </button>
          <a
            href=""
            className="enable-text">
            Forgot password ?
          </a>
        </form>
        <div className="login-form bg-white">
          <p className="text-center text-sm">
            Don't have an account ?<Link to="/register"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
