import React from "react";
import SongSlider from "./SongSlider";

const SongGallery = ({ title, description, songs }) => {
  return (
    <div className="gallery_container">
      <div className="gallery_text">
        <div>
          <p className="gallery_title">{title}</p>
        </div>
        <div>
          {description && <p className="gallery_description">{description}</p>}
        </div>
      </div>
        <div className="songs_slider">
          <SongSlider songs={songs} />
        </div>

      {/* <div className="songs_slider">
        {songs.map((song) => (
          <SongTile song={song}/>
        ))}
      </div> */}
    </div>
  );
};

export default SongGallery;
