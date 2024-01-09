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
      <div className="flex flex-row w-full items-center justify-between mt-5">
        <div className="flex flex-row items-center icon-left-block">
          <FiMessageCircle className="icon-post" />
          <div className="like-icon">
            <MdFavoriteBorder className="icon-post" />
          </div>
          <BsSend className="icon-post" />
        </div>
        <CiBookmark className="icon-post" />
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-3">
        <p>31 Likes</p>
        <p>15 minutes ago</p>
      </div>
    </div>
  );
}

export default Post;
