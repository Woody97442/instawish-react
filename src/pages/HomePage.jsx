import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import UserAvatarList from "../components/UserAvatarList";
import Post from "../components/Post";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <div className="container px-4">
        <div className="flex flex-row mt-4">
          <UserAvatarList />
        </div>
        <div className="flex flex-row mt-6">
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
