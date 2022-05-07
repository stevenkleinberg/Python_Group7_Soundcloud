import "./songlist.css";

import GalleryCard from "../../GalleryCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SongsList = () => {
  const history = useHistory();
  const songs = useSelector((state) => state.songs);
  const allsongs = [];
  for (let key in songs) {
    allsongs.push((key = songs[key]));
  }

  const navLink = (id) => {
    history.push(`/songs/${id}`);
  };

  return (
    <>
      <div>
        <ul>
          {allsongs.map((song) => (
            <GalleryCard
              key={song.id}
              type="songs"
              description={song.description}
              title={song.title}
              songs={Object.values(songs)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SongsList;
