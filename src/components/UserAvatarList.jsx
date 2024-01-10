import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyFollows } from "../features/userSlice";
import { FaCheckCircle } from "react-icons/fa";

function UserAvatarList({ user }) {
  const baseUrlImage = "https://symfony-instawish.formaterz.fr/";
  const dispatch = useDispatch();
  const { id, email, imageUrl, username } = user;
  const myFollow = useSelector((state) => state.user.myFollows);
  const [isFollow, setIsFollow] = useState();
  useEffect(() => {
    setIsFollow(myFollow.some((follower) => follower.createdBy.id === user.id));
  }, [isFollow, myFollow]);

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
      dispatch(fetchMyFollows());
      return;
    } else {
      console.log(data);
      dispatch(fetchMyFollows());
    }
  };

  return (
    <span
      className="relative "
      onClick={() => handleFollowUser(id)}>
      <img
        src={baseUrlImage + imageUrl}
        alt="Logo"
        className="user-element inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-full"
      />
      {isFollow === true ? <FaCheckCircle className="follow-icon" /> : null}
      <span className="absolute bottom-[-3.5rem] left-[2rem] font-semibold">
        {username}
      </span>
    </span>
  );
}

export default UserAvatarList;
