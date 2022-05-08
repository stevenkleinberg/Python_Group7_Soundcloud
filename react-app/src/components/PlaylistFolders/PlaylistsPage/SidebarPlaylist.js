import React from "react";
import { NavLink } from "react-router-dom";

const SidebarPlaylist = ({ playlist, user }) => {
  return (
    <div className="flex-row sidebar_playlist_list">
      <img
        src={playlist?.image_url}
        className="playlist_sidebar_image"
        alt=""
      />
      <div className="flex-column">
        <NavLink
          to={`/users/${user?.id}`}
          className="playlist_sidebar_user_text"
        >
          {user?.email}
        </NavLink>
        <NavLink to={`/playlists/${playlist?.id}`}>{playlist?.title}</NavLink>
      </div>
    </div>
  );
};

export default SidebarPlaylist;
