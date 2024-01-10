import React, { useState } from "react";
import { useSelector } from "react-redux";

function UserAvatarList() {
  const users = useSelector((state) => state.users.allUser);
  const baseUrlImage = "https://symfony-instawish.formaterz.fr/";

  const handleFollowUser = async (idUser) => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    let response = await fetch(
      "https://symfony-instawish.formaterz.fr/api/follow/add/" + idUser,
      {
        method: "POST",
        headers: headersList,
      }
    );
    let data = await response.json();
    if (data.status === "error") {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/follow/remove/" + idUser,
        {
          method: "POST",
          headers: headersList,
        }
      );
      let data = await response.json();
      console.log(data);
      return;
    } else {
      console.log(data);
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        id="sliderUser"
        className="w-full h-[7rem] overflow-x-scroll  scroll whitespace-nowrap scroll-smooth scrollbar-hide">
        {users.map((user, index) => (
          <span
            key={index}
            className="relative "
            onClick={() => handleFollowUser(user.id)}>
            <img
              src={baseUrlImage + user.imageUrl}
              alt="Logo"
              className="user-element inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-full"
            />
            <span className="absolute bottom-[-3.5rem] left-[2rem] font-semibold">
              {user.username}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default UserAvatarList;
