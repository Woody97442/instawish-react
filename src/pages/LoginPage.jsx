import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../features/authSlice";
function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("woody97442");
  const [password, setPassword] = useState("Woody97442");
  const jwt = useSelector((state) => state.auth.jwt);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = {
      "username": username,
      "password": password,
    };

    try {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/login_check",
        {
          method: "POST",
          body: JSON.stringify(bodyContent),
          headers: headersList,
        }
      );
      let data = await response.json();

      // Sauvegarde du token
      localStorage.setItem("token", data.token);
      dispatch(login(data.token));
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="container bg-login flex flex-col justify-center items-center">
      {/* Redirection ver la page home */}
      {jwt && (
        <Navigate
          to="/home"
          replace={true}
        />
      )}
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit}
          className="login-form bg-white">
          <h1 className="brandtext  mb-2">InstaWish</h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
