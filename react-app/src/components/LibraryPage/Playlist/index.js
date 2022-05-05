import React from "react";
import { useSelector } from "react-redux";
import PlaylistTile from "../../GalleryCard/playlistTile";

import "./Playlist.css";

const Playlist = () => {
  const playlistsObj = useSelector((state) => state.playlists);
  const playlists = Object.values(playlistsObj);
  console.log(playlists);
  return (
    <div>
      <h3>Hear your own playlists</h3>
      <div className="playlist_tile_container flex-row">
        {playlists?.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
