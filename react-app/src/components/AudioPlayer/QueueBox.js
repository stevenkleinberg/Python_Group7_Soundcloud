import React from "react";
import { useSelector } from "react-redux";
import SingleSong from "./SingleSong";

const QueueBox = () => {
  const queue = useSelector((state) => state.player.queue);
  return (
    <div className="queue_box_container">
      {queue?.map((songId, idx) => (
        <SingleSong key={idx} songId={songId} />
      ))}
    </div>
  );
};

export default QueueBox;
