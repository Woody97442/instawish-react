import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { ImExit } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link, Navigate } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full flex flex-row">
      {jwt === null && (
        <Navigate
          to="/login"
          replace={true}
        />
      )}
      <div className="flex flex-row w-full items-center justify-between px-4">
        <FontAwesomeIcon
          icon={faSquarePlus}
          size="2xl"
        />
        <h1 className="brandtext">InstaWish</h1>
        <div className="flex flex-row items-center">
          <ImExit
            className="circle-dot cursor-pointer"
            onClick={handleLogout}
          />
          <img
            src="/avatar.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
