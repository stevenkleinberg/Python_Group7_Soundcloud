import React from "react";

import GalleryCard from "../GalleryCard";

const MainFeed = () => {
  return (
    <div>
      <ul>
        <GalleryCard
          type="songs"
          description="this is a desc "
          title="Testing"
          songs={[1, 2, 3, 12, 12, 12]}
        />
      </ul>
    </div>
  );
};

export default MainFeed;
