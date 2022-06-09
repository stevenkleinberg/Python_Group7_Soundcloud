import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useParams,
  Switch,
  useHistory,
  Route,
  Redirect,
} from "react-router-dom";
import { getAllUsers } from "../../store/user";
import { editDetails } from "../../store/user-details";
import ProtectedRoute from "../auth/ProtectedRoute";

import "./NewUserPage.css";
import UsersPlaylists from "./UsersPlaylists";
import UsersSongs from "./UsersSongs";

const NewUsersPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[userId]);
  const userDetails = user?.user_detail;

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);

  const [selected, setSelected] = useState(
    history.location.pathname.split("/")[3]
  );

  if (history.location.pathname === `/users/${userId}`) {
    history.push(`/users/${userId}/songs`);
  }
  // document.body.scrollHeight
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
          <button className="cool_button">Share</button>
          <button className="cool_button">Edit</button>
        </div>
      </div>
      <div className="inner_library_container user_inner_container flex-column">
        <div className="flex-row user_page_inner_feed_container">
          <Switch>
            <ProtectedRoute path={"/users/:userId/songs"} exact={true}>
              <UsersSongs />
            </ProtectedRoute>
            <ProtectedRoute path={"/users/:userId/playlists"} exact={true}>
              <UsersPlaylists />
            </ProtectedRoute>
            {/* <Route>
            <Redirect to="/not-found" />
          </Route> */}
          </Switch>
          <div className="user_side_feed_container">
            <div className="right_stick_feed flex_column">
              <div className="flex-row">
                <div className="flex-column user_feed_like_box">
                  <p>Liked</p>
                  <p>{user?.like_amount}</p>
                </div>
                <div className="flex-column user_feed_comment_box">
                  <p>Comments</p>
                  <p>{user?.comment_amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUsersPage;
