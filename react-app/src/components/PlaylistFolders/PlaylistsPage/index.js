import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Moment from "react-moment";

import NewPlaylistForm from "../CreatePlaylist";
import PlaylistMainFeed from "./PlaylistMainFeed";

import "./PlaylistSongs.css";
import PlaylistSideBar from "./PlaylistSideBar";

const PlaylistsPage = () => {
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[+id]);

  return (
    <div className="playlist_container_main">
      <div className="Pl_S_banner flex-row">
        <div className="left_box_banner flex-column">
          <div className="title_banner flex-row">
            <div className="flex-row banner_title_group_1">
              <div className="banner_play_button">
                <p>&#9654;</p>
              </div>
              <div className="flex-column">
                <h3>{playlist?.title}</h3>
                <p>{playlist?.description}</p>
              </div>
            </div>
            <Moment fromNow>{playlist?.created_at}</Moment>
          </div>
          <div className="banner_circle">
            <div>{playlist?.songs?.length || 0}</div>
            <div>tracks</div>
          </div>
        </div>
        <div>
          <img src={playlist?.image_url} className="playlist_image" />
        </div>
      </div>
      <div className="flex-row playlist_mainfeed_sidebar_conatiner">
        <PlaylistMainFeed songsId={playlist?.songs} playlist={playlist} />
        <PlaylistSideBar />
      </div>
    </div>
  );
};

export default PlaylistsPage;
