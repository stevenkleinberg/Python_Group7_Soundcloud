import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GridDisplay from "../LibraryPage/Likes/GridDisplay";

const UsersSongs = () => {
  const { userId } = useParams();
  const songs = useSelector((state) => state.songs);

  const userSongs = [];
  const songsArr = Object.values(songs);
  songsArr.forEach((song) => {
    if (song.user_id === +userId) {
      userSongs.push(song);
    }
  });
  return (
    <div className="songs_library_container user_page_left_conatiner">
      <GridDisplay likedSongs={userSongs} />
    </div>
  );
};

export default UsersSongs;
