import React, { useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFollows } from "../features/userSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const { id, imageUrl, likeds, comments, createdBy, description } = post;
  const baseUrlImage = "https://symfony-instawish.formaterz.fr/";
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(
    likeds.some((like) => like.user.id === user.id)
  );

  const handleComment = () => {
    console.log("Comment");
  };

  const handleLike = async () => {
    setLiked(!liked);

    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    let response = await fetch(
      `https://symfony-instawish.formaterz.fr/api/liked/${id}`,
      {
        method: "POST",
        headers: headersList,
      }
    );
    dispatch(fetchMyFollows());
  };

  return (
    <div className="user-post">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row w-full items-center relative">
          <img
            src={baseUrlImage + createdBy.imageUrl}
            alt="Logo"
            className="w-16 h-16 rounded-full user-avatar"
          />
          <div className="user-post-author">
            <span>{createdBy.username}</span>
          </div>
        </div>
        <IoEllipsisVerticalOutline className="circle-dot" />
      </div>
      <div className="post">
        <img
          src={baseUrlImage + imageUrl}
          alt="paysage"
          className="post-img"
        />
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-3 desc-post">
        <span>{description}</span>
        <span className="enable-comment">
          Voir les {comments.length} commentaires
        </span>
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-5">
        <div className="flex flex-row items-center icon-left-block">
          <div className="message-icon">
            <FiMessageCircle className="icon-post" />
            <p className="message-count">{comments.length}</p>
          </div>
          <div
            className={`like-icon `}
            onClick={handleLike}>
            {liked ? (
              <MdFavoriteBorder className="icon-post cursor-pointer hover:scale-105 ease-in-out duration-300 liked" />
            ) : (
              <MdFavoriteBorder className="icon-post cursor-pointer hover:scale-105 ease-in-out duration-300" />
            )}
            <p className="like-count">{likeds.length}</p>
          </div>
          <BsSend className="icon-post" />
        </div>
        <CiBookmark className="icon-post" />
      </div>
    </div>
  );
}

export default Post;
