import React from "react";
import { NavLink } from "react-router-dom";
import { playSong } from "../../store/song";
import { useDispatch } from "react-redux";


const SongTile = ({ song }) => {
    const dispatch = useDispatch()

    const handlePlayButtonClick = (e) => {
        e.preventDefault();
        console.log("im here")
        dispatch(playSong(song.id));
    }

      return (
        <div className="song_tile">
            <div className="song_tile_cover">
                <img className="song_tile_cover_img" src={song.image_url}/>
                <div className="song_tile_cover_overlay">
                    <button onClick={handlePlayButtonClick} className="song_tile_cover_play">&#9654;</button>
                </div>
            </div>
            <div className="song_tile_text">
                <div>
                    <NavLink className="song_tile_text_title" to={`/songs/${song.id}`}>{song.title}</NavLink>
                </div>
                <div >
                    <p className="song_tile_text_description" >{song.description}</p>
                </div>

            </div>
        </div>
      );
    }

  export default SongTile;
