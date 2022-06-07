import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, Switch } from "react-router-dom";
import { getAllUsers } from "../../store/user";
import { editDetails } from "../../store/user-details";
import ProtectedRoute from "../auth/ProtectedRoute";

import "./NewUserPage.css";

const NewUsersPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[userId]);
  const userDetails = user?.user_detail;

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);

  const [selected, setSelected] = useState("songs");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, loadingAvatar, loadingBanner]);

  const submitOnlyAvatar = async (e) => {
    e.preventDefault();
    const avatarFile = e.target.files[0];

    const formData = new FormData();
    formData.append("id", userDetails?.id);
    formData.append("display_name", userDetails?.display_name);
    formData.append("avatar_url", avatarFile);

    setLoadingAvatar(true);
    const detail = await dispatch(editDetails(formData));
    setLoadingAvatar(false);
  };

  const submitOnlyBanner = async (e) => {
    e.preventDefault();
    const bannerFile = e.target.files[0];

    const formData = new FormData();
    formData.append("id", userDetails?.id);
    formData.append("display_name", userDetails?.display_name);
    formData.append("banner_url", bannerFile);

    setLoadingBanner(true);
    const detail = await dispatch(editDetails(formData));
    setLoadingBanner(false);
  };

  if (user) {
    document.documentElement.style.setProperty(
      "--user-banner-url",
      `url(${userDetails?.banner_url})`
    );
  }

  return (
    <div className="users_page_main_container">
      {/* <div className="user_banner_img">
        <img src={userDetails?.banner_url} />
      </div> */}
      <div className="Pl_S_banner user_banner flex-row">
        <div className="flex-row">
          <div className="flex-column">
            <img
              src={
                loadingAvatar
                  ? "https://soundtownbucket.s3.amazonaws.com/e119c0b2842f44eb84dbcc441b3b9744.png"
                  : userDetails?.avatar_url
              }
              className="user_banner_avatar"
            />
            {currentUser?.id === +userId && (
              <input
                type="file"
                className="user_upload_button"
                onChange={submitOnlyAvatar}
              />
            )}
          </div>
          <div className="user_detail_block">
            <p className="user_display_name">{userDetails?.display_name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="user_banner_img_container">
          {currentUser?.id === +userId && (
            <input type="file" onChange={submitOnlyBanner} />
          )}
        </div>
      </div>
      <div className="inner_library_container user_inner_container flex-column">
        <div className="flex-row user_links_container">
          <div className="flex-row">
            <NavLink
              to={`/users/${userId}/songs`}
              className={
                selected === "songs"
                  ? `library_links library_links_selected`
                  : `library_links`
              }
              onClick={() => setSelected("songs")}
            >
              Songs
            </NavLink>
            <NavLink
              to={`/users/${userId}/playlists`}
              className={
                selected === "playlists"
                  ? `library_links library_links_selected`
                  : `library_links`
              }
              onClick={() => setSelected("playlists")}
            >
              Playlists
            </NavLink>
          </div>
          <div className="flex-row">
            <button>Share</button>
            <button>Edit</button>
          </div>
        </div>
      </div>
      <Switch>
        <ProtectedRoute path={"/users/:userId/songs"} exact={true}>
          <p>test</p>
        </ProtectedRoute>
        <ProtectedRoute path={"/users/:userId/playlists"} exact={true}>
          <p>123</p>
        </ProtectedRoute>
      </Switch>
    </div>
  );
};

export default NewUsersPage;
