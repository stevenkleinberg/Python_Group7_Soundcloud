import React from "react";

const SongGallery = ({ title, description, songs }) => {
  return (
    <div>
      <div className="gallery_text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="songs_slider">
        {songs.map((song) => (
          <div>testing song holder</div>
        ))}
      </div>
    </div>
  );
};

export default SongGallery;
