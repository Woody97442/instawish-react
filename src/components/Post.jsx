import React, { useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyFollows } from "../features/userSlice";
import { fetchUser } from "../features/userSlice";
function Post({ post }) {
  const dispatch = useDispatch();
  const { id, imageUrl, likeds, comments, createdBy, description } = post;
  const baseUrlImage = "https://symfony-instawish.formaterz.fr/";
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(
    likeds.some((like) => like.user.id === user.id)
  );
  const [commentText, setCommentText] = useState("");

  const handleComment = async () => {
    if (commentText.length > 3) {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      };

      let bodyContent = {
        "content": commentText,
      };

      let response = await fetch(
        `https://symfony-instawish.formaterz.fr/api/comment/add/${id}`,
        {
          method: "POST",
          body: JSON.stringify(bodyContent),
          headers: headersList,
        }
      );
      dispatch(fetchMyFollows());
      dispatch(fetchUser());
      setCommentText("");
    }
  };

  const handleDelete = async (comment) => {
    console.log(comment.id);
    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    let response = await fetch(
      `https://symfony-instawish.formaterz.fr/api/comment/remove/${comment.id}`,
      {
        method: "POST",
        headers: headersList,
      }
    );
    let data = await response.json();
    dispatch(fetchMyFollows());
    dispatch(fetchUser());
  };

  const handleCommentText = (e) => {
    const sendIcon = document.getElementById("sendComment" + id);
    if (commentText === "") {
      sendIcon.classList.remove("message-send");
    } else {
      sendIcon.classList.add("message-send");
    }
    setCommentText(e.target.value);
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
        <IoEllipsisVerticalOutline className="circle-dot cursor-pointer hover:scale-105 ease-in-out duration-300" />
      </div>
      <div className="post">
        <img
          src={baseUrlImage + imageUrl}
          alt="paysage"
          className="post-img"
        />
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-3 desc-post">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col">
            <span>{description}</span>
            <span className="enable-comment">
              Voir les {comments.length} commentaires
            </span>
            {comments.map((comment) => (
              <div className="flex flex-row w-full items-center relative m-3 ">
                <img
                  src={baseUrlImage + comment.user.imageUrl}
                  alt="Logo"
                  className="w-12 h-12 rounded-full user-avatar"
                />
                <div className="user-post-author">
                  <span>{comment.content}</span>
                </div>
                <IoIosCloseCircleOutline
                  className=" ms-3 circle-dot cursor-pointer hover:scale-105 ease-in-out duration-300"
                  onClick={(e) => handleDelete(comment)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <input
            type="text"
            placeholder="commenter..."
            className="w-full h-10 rounded-3xl border border-gray-300 outline-none px-4 mt-2"
            id="addComment"
            onInput={handleCommentText}
          />
        </div>
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
          <BsSend
            id={"sendComment" + id}
            className="icon-post cursor-pointer hover:scale-105 ease-in-out duration-300 sendComment"
            onClick={handleComment}
          />
        </div>
        <CiBookmark className="icon-post" />
      </div>
    </div>
  );
}

export default Post;
