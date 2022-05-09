import React from "react";
import ResponsiveSlider from "./ResponsiveSlider";

import SongGallery from "./SongGallery";

const GalleryCard = ({ type, title, description, songs }) => {
  if (type === "songs") {
    return (
      <div className="mainFeed_gallery_list_item">
        {/* <SongGallery title={title} description={description} songs={songs} /> */}
        <ResponsiveSlider
          title={title}
          description={description}
          songs={songs}
        />
      </div>
    );
  }
};

export default GalleryCard;
