import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createDetail, editDetails } from "../../store/user-details";
import UserNavBar from "./user_page_nav";
import UserSongList from "./user_page_songs";
import "./userpage.css";
import "./user_page.scss";

function UserPage() {
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const userDetails = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const history = useHistory();
  const [display_name, setDisplayName] = useState(userDetails?.display_name);
  const [avatar_url, setUrl] = useState(userDetails?.avatar_url);
  const [banner_url, setBannerUrl] = useState(userDetails?.banner_url);
  const [activity, setActivity] = useState(false);
  const [display_box, setDisplayBox] = useState(false);
  const [display_button, setDisplayButton] = useState(true);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("id", sessionUser.id);
    formData.append("avatar_url", avatar_url);
    formData.append("display_name", display_name);
    formData.append("banner_url", banner_url);

    console.log(formData, "llflflffkkfkfd");
    const detail = await dispatch(editDetails(formData));
    if (detail) {
      history.push("/");
    } else {
      console.log("Error: uploadsong.js react frontend");
    }
  };

  const updateAvatarUrl = (e) => {
    const file = e.target.files[0];
    setUrl(file);
  };

  const updateActivity = (e) => {
    if (e.target.files) {
      setActivity(true);
    } else {
      setActivity(false);
    }
  };
  const updateActivityDisplay = (e) => {
    if (e.target.value) {
      setActivity(true);
    } else {
      setActivity(false);
    }
  };

  const checkDisplayName = (e) => {
    if (e) {
      setDisplayBox(true);
    } else {
      setDisplayBox(false);
    }
  };
  const updateBannerUrl = (e) => {
    const file = e.target.files[0];
    setBannerUrl(file);
  };

  return (
    <>
      <div
        className="userPageContainer"
        style={{
          background: `url(${userDetails?.banner_url}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <div id="firstcontainer">
          <div className="userDetailsInfo">
            <div className="placeholderDiv">
              <div
                className="userImage placeholder"
                style={{
                  background: `url(${userDetails?.avatar_url}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <input
                  className="chooseFileAvatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => (updateAvatarUrl(e), updateActivity(e))}
                  name="avatar_url"
                  id="avatar_url"
                />
              </div>
            </div>
            {userDetails.display_name !== "" ? (
              <>
                {display_box ? (
                  <div>
                    <input
                      style={{ margin: ".3em 0em" }}
                      type="text"
                      className="field userPage"
                      onChange={(e) => (
                        setDisplayName(e.target.value), updateActivityDisplay(e)
                      )}
                      placeholder={userDetails?.display_name}
                      value={display_name}
                      name="display_name"
                      id="display_name"
                      required
                    />
                    <button
                      type="button"
                      className="userbtn"
                      onClick={() => setDisplayBox(false)}
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn draw-border userBtnDetail"
                      onClick={() => setDisplayBox(true)}
                    >
                      {userDetails?.display_name}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {display_box ? (
                  <div>
                    <input
                      style={{ margin: ".3em 0em" }}
                      type="text"
                      className="field userPage"
                      onChange={(e) => (
                        setDisplayName(e.target.value), updateActivityDisplay(e)
                      )}
                      placeholder={userDetails?.display_name}
                      value={display_name}
                      name="display_name"
                      id="display_name"
                      required
                    />
                    <button
                      type="button"
                      className="userbtn"
                      onClick={() => setDisplayBox(false)}
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn draw-border userBtnDetail"
                      onClick={() => setDisplayBox(true)}
                    >
                      {userDetails?.display_name}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div id="secondcontainer">
          {!userDetails.banner_url ? (
            <>
              <div className="backgroundHeaderImage " style={{}}>
                <button className="headerUploadField">
                  upload header image...
                  <input
                    className="chooseFileHeader"
                    type="file"
                    accept="image/*"
                    onChange={(e) => (updateBannerUrl(e), updateActivity(e))}
                    name="banner_url"
                    id="banner_url"
                  />
                  <br />
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {activity ? (
        <div className="submitFormDiv">
          <form onSubmit={(e) => handleSubmit(e)} id="submitDetailsForm">
            <button
              className="btn"
              type="submit"
              onClick={() => checkDisplayName(display_name)}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div>
        <UserNavBar />
        <UserSongList />
      </div>
      <div></div>
    </>
  );
}
export default UserPage;
