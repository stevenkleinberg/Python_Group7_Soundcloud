import React from "react";

import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splashpage_container">
      <div className="imagebox">
        <div className="imagetoptitle">
          <h1 className="soundcloudsplogo">SOUNDCLOUD</h1>
          <div className="soundcloudbuttons">
            <button className="signuptitle">Sign Up</button>
            <button className="caccounttitle">Create account</button>
          </div>
        </div>
        <h2>What's next in music is first on SoundCloud</h2>
        <p>
          Upload your first track and begin your journey. SoundCloud gives you
          space to create, find your fans, and connect with other artists.
        </p>
        <a className="uploadingbutton"> Start uploading today</a>
      </div>
      <div>
        <span>
          <span>
            <form>
              <input placeholder="Search for artists, bands, tracks, podcasts" />
              <button></button>
            </form>
          </span>
          or
          <a>Upload your own</a>
        </span>
      </div>
    </div>
  );
};

export default SplashPage;
