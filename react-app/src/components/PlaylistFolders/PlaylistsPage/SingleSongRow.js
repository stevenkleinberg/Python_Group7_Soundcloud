import React from "react";

const SingleSongRow = ({ song, idx }) => {
  return (
    <div className="flex-row">
      <div>
        <div>
          <img src={song?.image_url} className="single_row_img" alt="" />
        </div>
      </div>
      <div>
        <span>{idx}</span>
      </div>
      <div>
        <a href={`/songs/${song?.id}`}>{song?.title}</a>
        <span> - </span>
        <a href={`/songs/${song?.id}`}>{song?.description}</a>
      </div>
      <div>123</div>
    </div>
  );
};

export default SingleSongRow;
