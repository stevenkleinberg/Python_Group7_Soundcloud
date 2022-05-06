import React from "react";
import { NavLink } from "react-router-dom";
import { loadSong } from "../../store/player";
import { likeSong, unlikeSong } from "../../store/song";
import { useDispatch, useSelector } from "react-redux";
import SongTileActions from "./SongTileActions";
import "./songTile.css"

const SongTile = ({ song }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    dispatch(loadSong(song.id));
  };

  const handle_LikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("song_id", song.id);
    const likedSong = await dispatch(likeSong(formData));


  };
  const handle_UnLikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("song_id", song.id);
    const unlikedSong = await dispatch(unlikeSong(formData));


  };

  return (
    <div className="song_tile flex-column">
      <div className="song_tile_cover">
        <img className="song_tile_cover_img" src={song.image_url} alt="" />
        <div className="song_tile_cover_overlay">
          <div className="song_tile_cover_overlay_inner flex-column">
            <div className="song_tile_cover_overlay_inner_top flex-row">
              <div
                onClick={handlePlayButtonClick}
                className="song_tile_cover_play"
              > &#9654;</div>
            </div>
            <div className="song_tile_cover_overlay_inner_bottom flex-row">
              {song.likes.includes(user.id) && (
                <div
                  onClick={handle_UnLikeButtonClick}
                  className="song_tile_cover_is_liked"
                > &#10084;</div>)
              }
              {!song.likes.includes(user.id) && (
                <div
                  onClick={handle_LikeButtonClick}
                  className="song_tile_cover_not_liked"
                > &#10084;</div>)
              }
            </div>
          </div>
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
