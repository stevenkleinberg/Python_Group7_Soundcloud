import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../store/song";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../Context/Modal";
import SongTile from "../GalleryCard/songTile";

import Logo from "../Icons/Logo";
import GridDisplay from "../LibraryPage/Likes/GridDisplay";

import "./SplashPage.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const songs = useSelector((state) => Object.values(state.songs));

  const openLoginModal = () => {
    if (showLoginModal) return;
    setShowLoginModal(true);
  };
  const openSignUpModal = () => {
    if (showSignUpModal) return;
    setShowSignUpModal(true);
  };

  useEffect(() => {
    dispatch(getAllSongs());
    // setArr()
  }, []);

  return (
    <div className="splashpage_container">
      <div className="imagebox">
        <div className="imagetoptitle">
          <h1 className="soundcloudsplogo">SoundTown</h1>
          <div className="soundcloudbuttons">
            <button className="signuptitle" onClick={openLoginModal}>
              Sign In
            </button>
            {showLoginModal && (
              <Modal onClose={() => setShowLoginModal(false)}>
                <div className="login_modal_container">
                  <LoginForm
                    setShowLoginModal={setShowLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                  />
                </div>
              </Modal>
            )}
            <button className="caccounttitle" onClick={openSignUpModal}>
              Create account
            </button>
            {showSignUpModal && (
              <Modal onClose={() => setShowSignUpModal(false)}>
                <div className="login_modal_container">
                  <SignUpForm
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}
                  />
                </div>
              </Modal>
            )}
          </div>
        </div>
        <h3 className="imagebox_inner_title">
          What's next in music is first on SoundTown
        </h3>
        <p className="imagebox_inner_para">
          Upload your first track and begin your journey. SoundTown gives you
          space to create, find your fans, and connect with other artists.
        </p>
        <div className="splash_logo">
          <Logo />
        </div>
      </div>
      <div className="flex-column splashpage_title_songs_container">
        {/* <span>
          <span>
            <form>
              <input placeholder="Search for artists, bands, tracks, podcasts" />
              <button></button>
            </form>
          </span>
          or
          <a>Upload your own</a>
        </span> */}
        <div className="splashpage_inner_title_container">
          Hear what’s trending for free in the SoundCloud community
        </div>
        <div className="splashpage_song_container flex-row">
          <GridDisplay likedSongs={songs.slice(0, 8)} />
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
