import "./songlist.css";
import { useSelector } from "react-redux";
import GridDisplay from "../../LibraryPage/Likes/GridDisplay";
import React from "react";

const SongsList = () => {
  const songs = useSelector((state) => state.songs);
  const sessionUser = useSelector((state) => state.session.user);

  const userSongs = [];
  const songsArr = Object.values(songs);
  songsArr.forEach((song) => {
    if (song.user_id === sessionUser?.id) {
      userSongs.push(song);
    }
  });

  return (
    <>
      <div className="songs_library_container">
        <h3>Hear Your Uploaded Songs:</h3>
      </div>
      <div className="songs_library_container">
        <GridDisplay likedSongs={userSongs} />
      </div>
    </>
  );
};

export default SongsList;
