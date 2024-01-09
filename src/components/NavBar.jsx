import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

function NavBar() {
  return (
    <header className="w-full flex flex-row">
      <div className="flex flex-row w-full items-center justify-between px-4">
        <FontAwesomeIcon
          icon={faSquarePlus}
          size="2xl"
        />
        <h1 className="brandtext">InstaWish</h1>
        <img
          src="/avatar.jpg"
          alt="Logo"
          className="w-16 h-16 rounded-full avatar"
        />
      </div>
    </header>
  );
}

export default NavBar;
