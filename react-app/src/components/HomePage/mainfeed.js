import React from "react";
import GalleryCard from "../GalleryCard";
import { useSelector } from "react-redux";


const MainFeed = () => {

  const songs = useSelector(state => state.songs)

  return (
    <div>
      <ul>
        <GalleryCard
          type="songs"
          description="this is a desc "
          title="Testing"
          songs={Object.values(songs)}
        />
      </ul>
    </div>
  );
};

export default MainFeed;
