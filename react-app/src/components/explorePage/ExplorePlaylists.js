import React from "react";
import { useSelector } from "react-redux";
import PlaylistTile from "../GalleryCard/playlistTile"

function ExplorePlaylists() {
    const playlistsObj = useSelector((state) => state.playlists);
    const playlists = Object.values(playlistsObj);
  return (
    <div className="playlist_library_page_container ">
          <h3>Find Playlists from around the town!</h3>
      <div className="playlist_tile_container flex-row">
        {playlists?.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}

export default ExplorePlaylists
