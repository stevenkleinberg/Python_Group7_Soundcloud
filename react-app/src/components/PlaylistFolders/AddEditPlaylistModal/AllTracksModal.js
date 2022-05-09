import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteSongtoPlaylist } from "../../../store/playlist";
import { deleteSong } from "../../../store/song";

const AllTracksModal = ({ songArr }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);

  const handleDeleteSongtoPlaylist = (playlistId, songId) => async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("playlist_id", playlistId);
    formData.append("song_id", songId);

    dispatch(deleteSongtoPlaylist(formData));
  };
  return (
    <div className="AEP_track_container">
      <ul>
        {songArr?.map((song) => (
          <li key={song?.id} className="AEP_li flex-row">
            <div className="flex-row">
              <img src={song?.image_url} className="AEP_li_img" />
              <NavLink to={`/songs/${song?.id}`}>{song?.title}</NavLink>
            </div>
            <p
              onClick={handleDeleteSongtoPlaylist(playlist?.id, song?.id)}
              className="AEP_li_x"
            >
              &#10005;
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTracksModal;
