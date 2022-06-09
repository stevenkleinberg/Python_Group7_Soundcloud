import React, { useState } from "react";
import { NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import SongsList from "../SongFolders/SongList";
import Playlist from "./Playlist";

import "./LibraryPage.css";
import Likes from "./Likes";

const LibraryPage = () => {
  const [selected, setSelected] = useState("songs");

  return (
    <>
      <div className="library_links_container flex-row">
        <NavLink
          to="/library/songs"
          className={
            selected === "songs"
              ? `library_links library_links_selected`
              : `library_links`
          }
          onClick={() => setSelected("songs")}
        >
          My Songs
        </NavLink>
        <NavLink
          to="/library/likes"
          className={
            selected === "likes"
              ? `library_links library_links_selected`
              : `library_links`
          }
          onClick={() => setSelected("likes")}
        >
          Likes
        </NavLink>
        <NavLink
          to="/library/playlists"
          className={
            selected === "playlists"
              ? `library_links library_links_selected`
              : `library_links`
          }
          onClick={() => setSelected("playlists")}
        >
          Playlist
        </NavLink>
      </div>
      <div className="library_container flex-column">
        <div className="inner_library_container flex-column">
          <Switch>
            <ProtectedRoute path={"/library/songs"} exact={true}>
              <SongsList />
            </ProtectedRoute>
            <ProtectedRoute path={"/library/likes"} exact={true}>
              <Likes />
            </ProtectedRoute>
            <ProtectedRoute path={"/library/playlists"} exact={true}>
              <Playlist />
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
