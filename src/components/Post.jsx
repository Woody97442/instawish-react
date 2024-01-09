import React from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";

function Post() {
  return (
    <div className="user-post">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row w-full items-center relative">
          <img
            src="/giga.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full user-avatar"
          />
          <div className="user-post-author">
            <span>Woody97442</span>
          </div>
        </div>
        <IoEllipsisVerticalOutline className="circle-dot" />
      </div>
      <div className="post">
        <img
          src="/post.jpg"
          alt="paysage"
          className="post-img"
        />
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-3 desc-post">
        <span>Description de la photo</span>
        <span className="enable-comment">Voir les 2 commentaires</span>
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-5">
        <div className="flex flex-row items-center icon-left-block">
          <div className="message-icon">
            <FiMessageCircle className="icon-post" />
            <p className="message-count">2</p>
          </div>
          <div className="like-icon">
            <MdFavoriteBorder className="icon-post" />
            <p className="like-count">18</p>
          </div>
          <BsSend className="icon-post" />
        </div>
        <CiBookmark className="icon-post" />
      </div>
    </div>
  );
}

export default Post;
