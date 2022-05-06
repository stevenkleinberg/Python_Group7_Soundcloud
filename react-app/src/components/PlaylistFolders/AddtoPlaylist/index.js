import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./AddtoPlaylist.css";

const AddtoPlaylist = ({ song }) => {
  console.log(song);
  const [filter, setFilter] = useState("");
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);
  const raw_playlists = Object.values(playlistsObj);
  const playlists = raw_playlists.filter(
    (playlist) => playlist.user_id === user.id
  );

  const handleAddSongToPlaylist = (songId, playlistId) => async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("playlist_id", playlistId);
    formData.append("song_id", songId);

    console.log(playlistId, songId);
  };

  return (
    <div className="flex-column inner_add_to_playlist_conatiner">
      <div className="flex-row">
        <p>Add to playlist</p>
        <p>Create a playlist</p>
      </div>
      <input
        value={filter}
        placeholder="Filter playlist"
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
      />
      <div className="div_row_add_to_playlist_container">
        {playlists
          .filter((playlist) => playlist?.title.toLowerCase().includes(filter))
          .map((playlist) => (
            <div
              key={playlist?.id}
              className="flex-row div_row_add_to_playlist"
            >
              <div className="flex-row">
                <img
                  src={playlist?.image_url}
                  className="add_to_playlist_img"
                />
                <div>
                  <p>{playlist?.title}</p>
                  <p>{playlist?.songs.length}</p>
                </div>
              </div>
              <button onClick={handleAddSongToPlaylist(playlist?.id, song?.id)}>
                Add to playlist
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddtoPlaylist;
