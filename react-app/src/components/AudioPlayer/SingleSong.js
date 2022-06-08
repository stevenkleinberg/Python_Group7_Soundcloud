import React from "react";
import { useSelector } from "react-redux";

const SingleSong = ({ songId }) => {
  const song = useSelector((state) => state.songs[songId]);

  return (
    <div className="flex-row queue_single_song_details">
      <img src={song?.image_url} />
      <p>{song?.title}</p>
    </div>
  );
};

export default SingleSong;
