import React from "react";

import MainFeed from "./mainfeed";
import Sidebar from "./sidebar";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage_container">
      <div>
        <MainFeed />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
