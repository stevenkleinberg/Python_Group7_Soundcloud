import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./NewUserPage.css";

const NewUsersPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  const userDetails = user?.user_detail;

  return (
    <div className="users_page_main_container">
      <img src={userDetails?.banner_url} className="user_banner_img" />
      <div className="Pl_S_banner user_banner flex_row">
        <div className="flex-row">
          <div className="flex-column">
            <img src={userDetails?.avatar_url} className="user_banner_avatar" />
            <input type="file" className="user_upload_button" />
          </div>
          <div className="user_detail_block">
            <p>{userDetails?.display_name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUsersPage;
