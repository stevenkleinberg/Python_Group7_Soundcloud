import React from "react";
import CreatorCard from "../CreatorCard";
import creators from '../CreatorCard/creators.json';

const Sidebar = () => {
  return (
    <div className="sidebar_container">
      <h3 className="sidebar-text">Creators</h3>
      {creators?.map(creator => (
        <CreatorCard key={creator.github_username} creator={creator} />
      ))}
    </div>
  )
};

export default Sidebar;
