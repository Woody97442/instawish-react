import React from "react";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import UserAvatarList from "../components/UserAvatarList";
import Post from "../components/Post";
import AddPost from "../components/AddPost";

import { store } from "../app/store";
import { fetchUser, fetchMyFollows } from "../features/userSlice";
import { fetchAllUsersSlice } from "../features/allUsersSlice";

store.dispatch(fetchUser());
store.dispatch(fetchMyFollows());
store.dispatch(fetchAllUsersSlice());

function HomePage() {
  const myFollow = useSelector((state) => state.user.myFollows);
  const users = useSelector((state) => state.users.allUser);

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <div className="container px-4">
        <div className="flex flex-row mt-4">
          <div className="relative flex items-center">
            <div
              id="sliderUser"
              className="w-full h-[7rem] overflow-x-scroll  scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              {users.map((user, index) => (
                <UserAvatarList
                  user={user}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-6">
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            <AddPost />
            {myFollow.map((post) => (
              <Post
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
