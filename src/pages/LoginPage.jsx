import React from "react";
import NavBar from "../components/NavBar";

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <div className="container px-4">
        <h1>Page de login</h1>
      </div>
    </div>
  );
}

export default LoginPage;
