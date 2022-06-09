import React from "react";
import { useSelector } from "react-redux";
import SingleSong from "./SingleSong";

const QueueBox = () => {
  const queue = useSelector((state) => state.player.queue);
  const playHistory = useSelector((state) => state.player.playHistory);
  const currSong = useSelector((state) => state.player.playingId);

  const listArr = [...playHistory, currSong, ...queue];
  console.log("🚀 ~ file: QueueBox.js ~ line 11 ~ QueueBox ~ listArr", listArr);
  return (
    <div className="queue_box_container">
      {listArr?.map((songId, idx) => (
        <SingleSong key={idx} songId={songId} />
      ))}
    </div>
  );
};

export default QueueBox;
