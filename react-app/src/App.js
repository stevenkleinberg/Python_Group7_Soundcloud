import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import UploadSong from "./components/SongFolders/Upload_Song/Uploadsong";
import HomePage from "./components/HomePage";
import EditSongForm from "./components/SongFolders/Edit_Song/editSong";
import { getAllSongs } from "./store/song";
import { getAllPlaylists } from "./store/playlist";
import SingleSong from "./components/SongFolders/SingleSong";
import Audio from "./components/AudioPlayer";
import SplashPage from "./components/SplashPage";
import PlaylistsPage from "./components/PlaylistFolders/PlaylistsPage";
import LibraryPage from "./components/LibraryPage";
import { ModalProvider } from "./components/Context/Modal";
import { getAllDetails } from "./store/user-details";
import { getAllUsers } from "./store/user";
import NewUsersPage from "./components/NewUserPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllSongs());
      await dispatch(getAllPlaylists());
      await dispatch(getAllDetails());
      await dispatch(getAllUsers());
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <BrowserRouter>
        {sessionUser != null && <NavBar />}
        <Switch>
          <Route path="/welcome" exact={true}>
            <SplashPage />
          </Route>
          <Route path="/upload-song" exact={true}>
            <UploadSong />
          </Route>
          <Route path="/songs/:id/edit" exact={true}>
            <EditSongForm />
          </Route>
          <ProtectedRoute path="/songs/:id" exact={true}>
            <SingleSong />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId">
            {/* <UserPage />  noels users page */}
            <NewUsersPage />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path="/playlists/:id" exact={true}>
            <PlaylistsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/library">
            <LibraryPage />
          </ProtectedRoute>
          <Route>
            <p>not found</p>
          </Route>
        </Switch>
        <Audio />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
