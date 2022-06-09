import React from 'react'
import { useSelector } from "react-redux";
import GridDisplay from "../../LibraryPage/Likes/GridDisplay";
import "./songlist.css";


function AllSongsList() {
    const allSongs = useSelector((state) => state.songs);
    const songsArr = Object.values(allSongs);

  return (
    <>
      <div className="songs_library_container">
        <h3>Every song from every user!</h3>
      </div>
      <div className="songs_library_container">
        <GridDisplay likedSongs={songsArr} />
      </div>
    </>
  )
}

export default AllSongsList
