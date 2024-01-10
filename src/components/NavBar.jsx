import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { ImExit } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Navigate } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.user);
  const baseUrlImage = "https://symfony-instawish.formaterz.fr/";

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddPost = () => {
    const addPost = document.getElementById("addPost");
    addPost.classList.toggle("hidden");
    console.log("test");
  };

  return (
    <header className="w-full flex flex-row">
      {jwt === null && (
        <Navigate
          to="/login"
          replace={true}
        />
      )}
      <div className="flex flex-row w-full items-center justify-between px-4 pt-2">
        <FontAwesomeIcon
          onClick={handleAddPost}
          icon={faSquarePlus}
          size="2xl"
          className="cursor-pointer hover:scale-105 ease-in-out duration-300"
        />
        <h1 className="brandtext">InstaWish</h1>
        <div className="flex flex-row items-center">
          <ImExit
            className="circle-dot cursor-pointer mx-4"
            onClick={handleLogout}
          />
          <img
            src={baseUrlImage + user.imageProfil}
            alt="Logo"
            className="w-14 h-14 rounded-full avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
