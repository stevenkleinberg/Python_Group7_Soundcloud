import React from "react";
import CreatorCard from "../CreatorCard";
import creators from '../CreatorCard/creators.json';
import TechCard from "../TechCard";
import techs from '../TechCard/techs.json';

const Sidebar = () => {
  return (
    <div className="sidebar_container flex-column">
      <h3 className="sidebar-text">Creators</h3>
      {creators?.map(creator => (
        <CreatorCard key={creator.github_username} creator={creator} />
      ))}
      <h3 className="sidebar-text">Technology Used</h3>
      <div className="techs flex-row">
        {techs?.map(tech => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  )
};

export default Sidebar;
