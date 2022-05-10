import React from "react";
import CreatorCard from "../CreatorCard";
import creators from '../CreatorCard/creators.json';
import TechCard from "../TechCard";
import techs from '../TechCard/techs.json';

const Sidebar = () => {
  return (
    <div className="sidebar_container flex-column">
      <div className="tech-icon">
        <a href="https://github.com/stevenkleinberg/Python_Group7_Soundcloud" target="_blank">
          <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
        </a>
      </div>
      <h3 className="sidebar-text">Creators</h3>
      {creators?.map(creator => (
        <CreatorCard key={creator.github_username} creator={creator} />
      ))}
      <h3 className="sidebar-text">Built with</h3>
      <div className="techs flex-row">
        {techs?.map(tech => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  )
};

export default Sidebar;
