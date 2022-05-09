import React from "react";

import MainFeed from "./mainfeed";
import Sidebar from "./sidebar";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage_container">
      <div className="mainfeed_left_container">
        <MainFeed />
      </div>
      <div className="mainfeed_right_container">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
