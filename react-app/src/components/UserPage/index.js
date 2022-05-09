import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  editDetails,
} from "../../store/user-details";
import GridDisplay from "../LibraryPage/Likes/GridDisplay";
import "./userpage.css";
import "./user_page.scss";
import theWavetest from "../WaveForm";

function UserPage() {
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const currentDetails = useSelector((state) => state.details[userId]);
  const songs = Object.values(useSelector((state) => state.songs));

  const likedSongs = songs?.filter((song) => song.likes.includes(+userId));

  const dispatch = useDispatch();
  const history = useHistory();
  const [display_name, setDisplayName] = useState("");
  const [avatar_url, setUrl] = useState("");
  const [banner_url, setBannerUrl] = useState("");
  const [activity, setActivity] = useState(false);
  const [display_box, setDisplayBox] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("id", currentDetails.id);
    formData.append("avatar_url", avatar_url);
    formData.append("display_name", display_name);
    formData.append("banner_url", banner_url);

    const detail = await dispatch(editDetails(formData));

    setDisplayBox(false);
  };

  const verify = currentDetails?.id === +userId;

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
    if (e === null) setActivity(false)
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
      <>
        <div className="userPageContainer">
          <img src={currentDetails?.banner_url} className="banner_container" />
          <div id="firstcontainer">
            <div className="userDetailsInfo">
              <div className="placeholderDiv">
                <div
                  className="userImage placeholder"
                // style={{
                //   background: `url(${currentDetails?.avatar_url}) no-repeat center`,
                //   backgroundSize: "cover",
                // }}
                >
                  <img
                    src={currentDetails?.avatar_url}
                    className="userImage "
                    onChange={(e) => (updateAvatarUrl(e), updateActivity(e))}

                  />
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
              {currentDetails?.display_name ? (
                <>
                  {display_box ? (
                    <div>
                      <input
                        style={{ margin: ".3em 0em" }}
                        type="text"
                        className="field userPage"
                        onChange={(e) => (
                          setDisplayName(e.target.value),
                          updateActivityDisplay(e)
                        )}
                        placeholder={currentDetails?.display_name}
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
                        {currentDetails?.display_name ? (
                          <> {currentDetails.display_name} </>
                        ) : (
                          <> add name </>
                        )}
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
                          setDisplayName(e.target.value),
                          updateActivityDisplay(e)
                        )}
                        placeholder={currentDetails?.display_name}
                        value={display_name}
                        name="display_name"
                        id="display_name"
                        required
                      />
                      <button
                        type="button"
                        className="userbtn"
                        onClick={(e) => (
                          setDisplayBox(false),
                          updateActivity(null))}
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
                        {currentDetails?.display_name ? (
                          <> {currentDetails.display_name} </>
                        ) : (
                          <> add name </>
                        )}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div id="secondcontainer">
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
            :<></>
          </div>
        </div>

        {activity ?
          <>
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
          </>
          : (
            <></>
          )}
        <div>
          <div className="forSpace"></div>
          <div className="forLikeHeading">
            <h1> Likes</h1>
          </div>
          <GridDisplay likedSongs={likedSongs} />
        </div>
        <div></div>
      </>
    </>
  );
}
export default UserPage;
