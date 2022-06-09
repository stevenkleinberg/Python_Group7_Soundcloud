import React, { useState } from "react";
import { NavLink, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AllSongsList from "../SongFolders/SongList/AllSongsList"
import ExplorePlaylists from "./ExplorePlaylists";

function ExplorePage() {
    const history = useHistory();
    const [selected, setSelected] = useState("songs");

    if (history.location.pathname === `/explore`) {
        history.push(`/explore/songs`);
      }
  return (
    <>
    <div className="library_links_container flex-row">
      <NavLink
        to="/explore/songs"
        className={
          selected === "songs"
            ? `library_links library_links_selected`
            : `library_links`
        }
        onClick={() => setSelected("songs")}
      >
        Explore Songs
      </NavLink>
      <NavLink
        to="/explore/playlists"
        className={
          selected === "playlists"
            ? `library_links library_links_selected`
            : `library_links`
        }
        onClick={() => setSelected("playlists")}
      >
        Explore Playlists
      </NavLink>
    </div>
    <div className="library_container flex-column">
      <div className="inner_library_container flex-column">
        <Switch>
          <ProtectedRoute path={"/explore/songs"} exact={true}>
            <AllSongsList />
          </ProtectedRoute>
          <ProtectedRoute path={"/explore/playlists"} exact={true}>
            <ExplorePlaylists />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  </>
  )
}

export default ExplorePage
