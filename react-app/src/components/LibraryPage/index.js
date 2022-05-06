import React from "react";
import { NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import SongsList from "../SongFolders/SongList";
import Playlist from "./Playlist";

const LibraryPage = () => {
  return (
    <div>
      <div>
        <NavLink to="/library/songs">Songs</NavLink>
        <NavLink to="/library/likes">Likes</NavLink>
        <NavLink to="/library/playlists">Playlists</NavLink>
      </div>
      <Switch>
        <ProtectedRoute path={"/library/songs"} exact={true}>
          <SongsList />
        </ProtectedRoute>
        <ProtectedRoute path={"/library/likes"} exact={true}>
          <p>Likes page</p>
        </ProtectedRoute>
        <ProtectedRoute path={"/library/playlists"} exact={true}>
          <Playlist />
        </ProtectedRoute>
      </Switch>
    </div>
  );
};

export default LibraryPage;
