import React from "react";
import CreatorCard from "../CreatorCard";
import creators from '../CreatorCard/creators.json';

const Sidebar = () => {
  return (
    <div className="sidebar_contanier">
      {creators?.map(creator => (
        <CreatorCard key={creator.github_username} creator={creator} />
      ))}
    </div>
  )
};

export default Sidebar;
