import React from "react";
import GalleryCard from "../GalleryCard";
import { useSelector } from "react-redux";


const MainFeed = () => {

  const songs = useSelector(state => state.songs)
  delete songs.playingId
  const songs_array = Object.values(songs)

  return (
    <div>
      <div className="mainFeed_gallery_list">
        <GalleryCard
          type="songs"
          description="Up-and-coming tracks on SoundTown"
          title={"Charts: New & Hot"}
          songs={songs_array}
        />
      </div>
      <div className="mainFeed_gallery_list">
        <GalleryCard
          type="songs"
          description="Top tracks from artists similar to Max B"
          title={"Artists You Should Know"}
          songs={songs_array}
        />
      </div>
      <div className="mainFeed_gallery_list">
        <GalleryCard
          type="songs"
          description="Emerging artists and tracks"
          title={"Bubbling Up"}
          songs={songs_array}
        />
      </div>
    </div>
  );
};

export default MainFeed;
