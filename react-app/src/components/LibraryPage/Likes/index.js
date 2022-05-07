import React, { useState } from "react";

import "./Likes.css";

import { ReactComponent as GridIcon } from "../../../static/svgs/grid.svg";
import { ReactComponent as RowIcon } from "../../../static/svgs/row.svg";
import { ReactComponent as SelectedGridIcon } from "../../../static/svgs/selectedgrid.svg";
import { ReactComponent as SelectedRowIcon } from "../../../static/svgs/selectedrow.svg";
import GridDisplay from "./GridDisplay";
import { useSelector } from "react-redux";

const Likes = () => {
  const [viewMode, setViewMode] = useState(true);
  const [filter, setFilter] = useState("");

  const user = useSelector((state) => state.session.user);

  const songs = Object.values(useSelector((state) => state.songs));
  const likedSongs = songs?.filter((song) => song.likes.includes(user.id));

  return (
    <div>
      <div className="flex-row ls_title_container">
        <p>Hear the tracks you’ve liked:</p>
        <div className="flex-row ls_title_container_right">
          <p>View</p>
          {viewMode ? (
            <>
              <SelectedGridIcon />
              <RowIcon onClick={() => setViewMode(false)} />
            </>
          ) : (
            <>
              <GridIcon onClick={() => setViewMode(true)} />
              <SelectedRowIcon />
            </>
          )}

          <input
            placeholder="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      {viewMode && <GridDisplay likedSongs={likedSongs} />}
    </div>
  );
};

export default Likes;
