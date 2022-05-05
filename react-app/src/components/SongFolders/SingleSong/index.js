import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
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
=======
import SongComments from './songComments';
import './singlesong.css'
import Moment from "react-moment";
const SingleSong = () => {
    const { id } = useParams();
    const song = useSelector(state => state.songs[id])

    // return (
    //     <div>
    //         <img
    //             id='songImg'
    //             src={song?.image_url}
    //             alt=' '
    //             style={{ width: '100%' }}
    //         />
    //         {song?.title}

    //         <NavLink to={`/songs/${+id}/edit`} exact={true} activeClassName="active">
    //             edit form
    //         </NavLink>
    //     </div>
    // )
    return (
        <div className="song_container_main">
          <div className="Pl_S_banner flex-row">
            <div className="left_box_banner flex-column">
              <div className="title_banner flex-row">
                <div className="flex-row banner_title_group_1">
                  <div className="banner_play_button">
                    <p>Play</p>
                  </div>
                  <div className="flex-column">
                    <h3>{song?.title}</h3>
                    <p>{song?.description}</p>
                  </div>
                </div>
                <Moment fromNow>{song?.created_at}</Moment>
              </div>
            </div>
            <div>
              <img src={song?.image_url} className="song_image" />
            </div>
          </div>
          <div className="flex-row song_mainfeed_sidebar_conatiner">
            <SongComments song={song} />
            {/* <songSideBar /> */}
          </div>
        </div>
      );
}
>>>>>>> main

export default SingleSong;
