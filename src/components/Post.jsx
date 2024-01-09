import React from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

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
    </div>
  );
}

export default Post;
