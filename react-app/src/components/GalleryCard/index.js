import React from "react";

import SongGallery from "./SongGallery";

const GalleryCard = ({ type, title, description, songs }) => {
  if (type == "songs") {
    return (
      <li>
        <SongGallery title={title} description={description} songs={songs} />
      </li>
    );
  }
};

export default GalleryCard;
