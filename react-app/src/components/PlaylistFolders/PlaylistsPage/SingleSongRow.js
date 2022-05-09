import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadSong } from "../../../store/player";

const SingleSongRow = ({ song, idx }) => {
  const dispatch = useDispatch();
  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    dispatch(loadSong(song.id));
  };

  return (
    <div className="flex-row single_song_container_li">
      <div className="single_song_container_img">
        <div className="single_row_img_overlay" onClick={handlePlayButtonClick}>
          <div className="single_row_img_play">&#9658;</div>
        </div>
        <img src={song?.image_url} className="single_row_img" alt="" />
      </div>
      <div className="single_song_container_idx">
        <span>{idx + 1}</span>
      </div>
      <div className="single_song_container_title">
        <NavLink to={`/songs/${song?.id}`}>{song?.title}</NavLink>
        {/* <a href={`/songs/${song?.id}`}>{song?.title}</a> */}
        <span> - </span>
        <NavLink to={`/songs/${song?.id}`}>{song?.description}</NavLink>
        {/* <a href={`/songs/${song?.id}`}>{song?.description}</a> */}
      </div>
    </div>
  );
};

export default SingleSongRow;
