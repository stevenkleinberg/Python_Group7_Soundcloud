import React from "react";
import { NavLink } from "react-router-dom";
import { loadPlaylist } from "../../store/player";
import { useDispatch } from "react-redux";
import PlaylistTitleActions from "./PlaylistTileActions";

const PlaylistTile = ({ playlist }) => {
  const dispatch = useDispatch();
  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    dispatch(loadPlaylist(playlist));
  };
  return (
    <div className="playlist_tile flex-column">
      <div className="playlist_tile_cover">
        <img className="playlist_tile_cover_img" src={playlist.image_url} alt="" />
        <div className="playlist_tile_cover_overlay">
          <button
            onClick={handlePlayButtonClick}
            className="playlist_tile_cover_play"
          >
            &#9654;
          </button>
        </div>
      </div>
      <div className="playlist_tile_bottom flex-row">
        <div className="playlist_tile_text flex-column">
          <div>
            <NavLink
              className="playlist_tile_text_title"
              to={`/playlists/${playlist.id}`}
            >
              {playlist.title}
            </NavLink>
          </div>
          <div>
            <p className="playlist_tile_text_description">
              {playlist.description}
            </p>
          </div>
        </div>
        <div className="playlist_tile_options">
          <PlaylistTitleActions playlist={playlist} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistTile;
