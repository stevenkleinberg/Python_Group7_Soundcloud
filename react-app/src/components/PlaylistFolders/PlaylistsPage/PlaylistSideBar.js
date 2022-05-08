import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SidebarPlaylist from "./SidebarPlaylist";

const PlaylistSideBar = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);
  const raw_playlists = Object.values(playlistsObj);

  const playlists = raw_playlists?.filter(
    (playlistele) => playlistele?.user_id === user?.id
  );

  return (
    <div className="playlist_sidebar_conatiner">
      <div className="playlist_sidebar_a_group_div">
        <h3 className="flex-row playlist_sidebar_a_group">
          <span>Playlists from this user</span>
          <NavLink to="/library/playlists">View all</NavLink>
          {/* <a href="/library/playlists">View all</a> */}
        </h3>
      </div>
      {playlists?.slice(0, 3).map((playlist) => (
        <SidebarPlaylist key={playlist?.id} playlist={playlist} user={user} />
      ))}
    </div>
  );
};

export default PlaylistSideBar;
