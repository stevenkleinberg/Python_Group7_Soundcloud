import React from "react";
import { useSelector } from "react-redux";
import SingleSong from "./SingleSong";

const QueueBox = () => {
  const queue = useSelector((state) => state.player.queue);
  const playHistory = useSelector((state) => state.player.playHistory);
  const currSongId = useSelector((state) => state.player.playingId);

  const listArr = [...playHistory, currSongId, ...queue];
  return (
    <div className="queue_box_container">
      {playHistory?.map((songId, idx) => (
        <SingleSong key={idx} songId={songId} view={"queue_history"} />
      ))}
      <SingleSong songId={currSongId} view={"queue_playing"} />
      {queue?.map((songId, idx) => (
        <SingleSong key={idx} songId={songId} view={""} />
      ))}
    </div>
  );
};

export default QueueBox;
