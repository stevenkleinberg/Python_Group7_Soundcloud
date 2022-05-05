import React from "react";
import { useSelector } from "react-redux";
import SidebarPlaylist from "./SidebarPlaylist";

const PlaylistSideBar = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);
  const playlists = Object.values(playlistsObj);

  return (
    <div className="playlist_sidebar_conatiner">
      <div className="playlist_sidebar_a_group_div">
        <h3 className="flex-row playlist_sidebar_a_group">
          <span>Playlistfrom this user</span>
          <a href="/library/playlists">View all</a>
        </h3>
      </div>
      {playlists?.map((playlist) => (
        <SidebarPlaylist key={playlist?.id} playlist={playlist} user={user} />
      ))}
    </div>
  );
};

export default PlaylistSideBar;
