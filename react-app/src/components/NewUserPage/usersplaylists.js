import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaylistTile from "../GalleryCard/playlistTile";

const UsersPlaylists = () => {
  const { userId } = useParams();
  const allPlaylists = useSelector((state) => state.playlists);
  const allPlaylistsArr = Object.values(allPlaylists);

  const userPlaylists = allPlaylistsArr.filter(
    (playlist) => +playlist?.user_id === +userId
  );
  return (
    <div className="playlist_tile_container flex-row">
      {userPlaylists.map((playlist) => (
        <PlaylistTile key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default UsersPlaylists;
