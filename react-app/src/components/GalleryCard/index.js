import React from "react";

import SongGallery from "./SongGallery";

const GalleryCard = ({ type, title, description, songs }) => {
  if (type === "songs") {
    return (
      <li className="mainFeed_gallery_list_item">
        <SongGallery title={title} description={description} songs={songs} />
      </li>
    );
  }
};

export default GalleryCard;
