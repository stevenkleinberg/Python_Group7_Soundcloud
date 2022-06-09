import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal } from "./Context/Modal";
import Logo from "./Icons/Logo";
import "./NavBar.css";
import UserProfile from "./UserProfile";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm"
import UploadSong from "./SongFolders/Upload_Song/Uploadsong";
const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const rawSongs = useSelector((state) => state.songs);
  const songs = Object.values(rawSongs);

  const [showResults, setShowResults] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (searchInput.length) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchInput]);

  useEffect(() => {
    if (!showResults) return;

    const closeResults = () => {
      setShowResults(false);
    };

    document.addEventListener("click", closeResults);

    return () => document.removeEventListener("click", closeResults);
  }, [showResults]);

  const openLoginModal = () => {
    if (showLoginModal) return;
    setShowLoginModal(true);
  };
  const openSignUpModal = () => {
    if (showSignUpModal) return;
    setShowSignUpModal(true);
  };
  let sessionLinks = (
    <nav className="navbar">
      <NavLink
        className="navlinks logo"
        to="/"
        exact={true}
        activeClassName="active"
      >
        <Logo />
      </NavLink>
      <NavLink
        className="navlinks logo"
        to="/"
        exact={true}
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink
        className="navlinks"
        to="/library/songs"
        exact={true}
        activeClassName="active"
      >
        Library
      </NavLink>
      <div className="flex-row navbar_input_container">
        <div>
          <input
            className="navbar_search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {showResults && (
            <div className="search_results">
              <ul>
                {songs
                  ?.filter((song) =>
                    song.title.toLowerCase().includes(searchInput.toLowerCase())
                  )
                  .map((song) => (
                    <li key={song.id} className="flex-row search_results_li">
                      <img
                        className="search_results_img"
                        src={song.image_url}
                      />
                      <a
                        href={`/songs/${song.id}`}
                        className="search_results_a"
                      >
                        {song.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* <NavLink
        className="navlinks"
        to="/upload-song"
        exact={true}
        activeClassName="active"
      >
        Upload
      </NavLink> */}

      <div onClick={() => setShowUploadModal(true)} className="navlinks">
        Upload
      </div>
      {showUploadModal && (
        <Modal onClose={() => setShowUploadModal(false)}>
          {/* <div className="upload-modal-container"> */}
          <UploadSong setShowUploadModal={setShowUploadModal} />
          {/* </div> */}
        </Modal>
      )}
      <UserProfile user={sessionUser} />
    </nav>
  );
  return (
    <>
      {!sessionUser ? (
        <header>
          <nav className="navbar">
            <NavLink className="navlinks" exact to="/">
              Home
            </NavLink>
            <div onClick={openLoginModal} className="navlinks">
              Log In
            </div>
            <div onClick={openSignUpModal} className="navlinks" >
              Sign Up
            </div>
          </nav>
          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <div className="login_modal_container">
                <LoginForm setShowLoginModal={setShowLoginModal} />
              </div>
            </Modal>
          )}
          {showSignUpModal && (
            <Modal onClose={() => setShowSignUpModal(false)}>
              <div className="login_modal_container">
                <SignUpForm setShowSignUpModal={setShowSignUpModal} />
              </div>
            </Modal>
          )}
        </header>
      ) : (
        <>{sessionLinks}</>
      )}
    </>
  );
};

export default NavBar;
