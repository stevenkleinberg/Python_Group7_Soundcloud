import React from "react";
import { useSelector } from "react-redux";
import SingleSongRow from "./SingleSongRow";

const PlaylistMainFeed = ({ songsId }) => {
  const songArr = [];
  const songs = useSelector((state) => state.songs);
  console.log(songs);
  songsId?.forEach((songId) => {
    songArr.push(songs[+songId]);
  });

  console.log(songArr);
  return (
    <div className="playlist_mainfeed_container">
      <div className="playlist_button_group">
        <button>Like</button>
        <button>Share</button>
        <button>Copy Link</button>
        <button>Edit</button>
        <button>More</button>
      </div>
      <div className="flex-row">
        <div>
          <img />
          <p>Jesus Elizalde</p>
        </div>
        <div>
          <ul>
            {songArr?.map((song, idx) => (
              <li key={idx}>
                <SingleSongRow song={song} idx={idx} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistMainFeed;
