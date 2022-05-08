import React from "react";

const SidebarPlaylist = ({ playlist, user }) => {
  return (
    <div className="flex-row">
      <img src={playlist?.image_url} className="playlist_sidebar_image" alt="" />
      <div className="flex-column">
        <a href={`/users/${user?.id}`}>{user?.email}</a>
        <a href={`/playlists/${playlist?.id}`}>{playlist?.title}</a>
      </div>
    </div>
  );
};

export default SidebarPlaylist;
