import React from "react";
import { NavLink } from "react-router-dom";
import { loadSong } from "../../store/player";
import { useDispatch } from "react-redux";
import SongTileActions from "./SongTileActions";

const SongTile = ({ song }) => {
  const dispatch = useDispatch();

  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    dispatch(loadSong(song.id));
  };

  return (
    <div className="song_tile flex-column">
      <div className="song_tile_cover">
        <img className="song_tile_cover_img" src={song.image_url} />
        <div className="song_tile_cover_overlay">
          <button
            onClick={handlePlayButtonClick}
            className="song_tile_cover_play"
          >
            &#9654;
          </button>
        </div>
      </div>
      <div className="song_tile_bottom flex-row">
        <div className="song_tile_text flex-column">
          <div>
            <NavLink className="song_tile_text_title" to={`/songs/${song.id}`}>
              {song.title}
            </NavLink>
          </div>
          <div>
            <p className="song_tile_text_description">{song.description}</p>
          </div>
        </div>
        <div className="song_tile_options">
          <SongTileActions song={song} />
        </div>
      </div>
    </div>
  );
};

export default SongTile;
