import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongtoPlaylist,
  deleteSongtoPlaylist,
} from "../../../store/playlist";

import "./AddtoPlaylist.css";
import CreatePlaylistAddSong from "./CreatePlaylistAddSong";

const AddtoPlaylist = ({ song }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [mode, setMode] = useState("add");
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);
  const raw_playlists = Object.values(playlistsObj);
  const playlists = raw_playlists.filter(
    (playlist) => playlist.user_id === user.id
  );

  const handleAddSongToPlaylist = (playlistId, songId) => async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("playlist_id", playlistId);
    formData.append("song_id", songId);

    const playlist = await dispatch(addSongtoPlaylist(formData));

    if (playlist) {
      return playlist;
    }
  };
  const handleDeleteSongToPlaylist = (playlistId, songId) => async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("playlist_id", playlistId);
    formData.append("song_id", songId);

    dispatch(deleteSongtoPlaylist(formData));

    // if (playlist) {
    //   return playlist;
    // }

    // const playlist = await dispatch(addSongtoPlaylist(formData));

    // if (playlist) {
    //   return playlist;
    // }
  };

  return (
    <div className="flex-column inner_add_to_playlist_conatiner">
      <div className="flex-row add_song_to_playlist_mode_container ">
        <p
          onClick={() => setMode("add")}
          className="add_song_to_playlist_mode_title atp_p_l"
        >
          Add to playlist
        </p>
        <p
          onClick={() => setMode("create")}
          className="add_song_to_playlist_mode_title atp_p_r"
        >
          Create a playlist
        </p>
      </div>

      {mode === "add" ? (
        <>
          <input
            value={filter}
            placeholder="Filter playlist"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
          <div className="div_row_add_to_playlist_container">
            {playlists
              .filter((playlist) =>
                playlist?.title.toLowerCase().includes(filter)
              )
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
                      <a href={`/playlists/${playlist?.id}`}>
                        {playlist?.title}
                      </a>
                      <p>{playlist?.songs.length}</p>
                    </div>
                  </div>
                  {!playlist?.songs.includes(song?.id) ? (
                    <button
                      onClick={handleAddSongToPlaylist(playlist?.id, song?.id)}
                      className="add_song_to_playlist_button"
                    >
                      Add to playlist
                    </button>
                  ) : (
                    <button
                      onClick={handleDeleteSongToPlaylist(
                        playlist?.id,
                        song?.id
                      )}
                      className="remove_song_to_playlist_button"
                    >
                      Added
                    </button>
                  )}
                </div>
              ))}
          </div>
        </>
      ) : (
        <CreatePlaylistAddSong songsArr={[song?.id]} />
      )}
    </div>
  );
};

export default AddtoPlaylist;
