import React from "react";

const SidebarPlaylist = ({ playlist, user }) => {
  return (
    <div className="flex-row">
      <img src={playlist?.image_url} className="playlist_sidebar_image" />
      <div className="flex-column">
        <a>{user?.email}</a>
        <a href={`/playlists/${playlist?.id}`}>{playlist?.title}</a>
      </div>
    </div>
  );
};

export default SidebarPlaylist;
