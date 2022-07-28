import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SongComments from "./SongComments";
import { loadSong } from "../../../store/player";
import Moment from "react-moment";
import "./singlesong.css";
import React from "react";
const SingleSong = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const song = useSelector((state) => state.songs[id]);

    const handlePlayButtonClick = (e) => {
        e.preventDefault();
        dispatch(loadSong(song.id));
    };

    return (
        <div className="song_container_main">
            <div className="Pl_S_banner flex-row">
                <div className="left_box_banner flex-column">
                    <div className="title_banner flex-row">
                        <div className="flex-row banner_title_group_1">
                            <div className="banner_play_button">
                                <div className="song_page_play" onClick={handlePlayButtonClick} >&#9654;</div>
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
                    <img alt='' src={song?.image_url} className="song_image" />
                </div>
            </div>
            <div className="flex-row song_mainfeed_sidebar_conatiner">
                <SongComments song={song} />
                {/* <songSideBar /> */}
            </div>
        </div>
    );
};

export default SingleSong;
