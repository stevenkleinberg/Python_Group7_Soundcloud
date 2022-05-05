import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./singlesong.css";

const SingleSong = () => {
  const { id } = useParams();
  const songs = useSelector((state) => state.songs);
  const song = songs[+id];

  return (
    <div>
      <img
        id="songImg"
        src={song?.image_url}
        alt=" "
        style={{ width: "100%" }}
      />
      {song?.title}

      <NavLink to={`/songs/${+id}/edit`} exact={true} activeClassName="active">
        edit form
      </NavLink>
    </div>
  );
};

export default SingleSong;
