import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./NewUserPage.css";

const NewUserPage = () => {
  const { userId } = useParams();
  console.log(userId);
  const currentUser = useSelector((state) => state.session.user);
  const userDetails = useSelector((state) => state.details[userId]);
  const user = useSelector((state) => state.users[userId]);
  console.log(userDetails);
  console.log(user);
  return (
    <div className="flex-column NUP_main_container">
      <div className="flex-row banner_container">
        {/* <img src={userDetails?.banner_url} className="banner_img" /> */}
        <div>
          <img src={userDetails?.avatar_url} className="avatar_img_banner" />
        </div>
        <div>
          <h1 className="banner_title">{user?.email}</h1>
          <h3 className="banner_title_second">{userDetails?.display_name}</h3>
        </div>
      </div>
      <div className="flex-row">
        <div>
          <button>All</button>
          <button>Comments</button>
        </div>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default NewUserPage;
