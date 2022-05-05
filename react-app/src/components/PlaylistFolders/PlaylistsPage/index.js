import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Moment from "react-moment";

import NewPlaylistForm from "../CreatePlaylist";

const PlaylistsPage = () => {
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[+id]);
  console.log(playlist?.updated_at);
  const createdDate = new Date(playlist?.created_at);
  const todayDate = new Date();

  console.log(todayDate.getDay() - createdDate.getDay());

  return (
    <div className="Pl_S_banner flex-row">
      <div className="left_box_banner flex-column">
        <div className="title_banner flex-row">
          <div className="flex-row banner_title_group_1">
            <div className="banner_play_button">
              <p>Play</p>
            </div>
            <div className="flex-column">
              <h3>{playlist?.title}</h3>
              <p>{playlist?.description}</p>
            </div>
          </div>
          <Moment fromNow>{playlist?.created_at}</Moment>
        </div>
        <div className="banner_circle">
          <div>{playlist?.songs.length}</div>
          <div>tracks</div>
        </div>
      </div>
      <div>
        <img src={playlist?.image_url} className="playlist_image" />
      </div>
      {/* <h1>Playlist Page</h1>
      <NewPlaylistForm /> */}
    </div>
  );
};

export default PlaylistsPage;
