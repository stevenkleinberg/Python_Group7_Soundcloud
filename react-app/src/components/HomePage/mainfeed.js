import React from "react";
import GalleryCard from "../GalleryCard";
import { useSelector } from "react-redux";


const MainFeed = () => {

  const songs = useSelector(state => state.songs)
  const songs_array = Object.values(songs)
  const reverse_song_array = songs_array.slice().reverse()
  return (
    <div>
      <div className="mainFeed_gallery_list">
        <GalleryCard
          type="songs"
          description="Up-and-coming tracks on SoundTown"
          title={"Charts: Hot & Trending"}
          songs={songs_array}
        />
      </div>
      <div className="mainFeed_gallery_list">
        <GalleryCard
          type="songs"
          description="The latest Uploads from around the world"
          title={"Discover Daily"}
          songs={ reverse_song_array}
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
