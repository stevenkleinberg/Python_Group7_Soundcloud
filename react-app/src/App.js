import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
import UploadSong from "./components/SongFolders/Upload_Song/Uploadsong";
import HomePage from "./components/HomePage";
import EditSongForm from "./components/SongFolders/Edit_Song/editSong";
import { getAllSongs } from "./store/song";
import { getAllPlaylists } from "./store/playlist";
import SingleSong from "./components/SongFolders/SingleSong";
import Audio from "./components/AudioPlayer";
import UserPage from "./components/UserPage";
import SongsList from "./components/SongFolders/SongList";
import SplashPage from "./components/SplashPage";
import PlaylistsPage from "./components/PlaylistFolders/PlaylistsPage";
import LibraryPage from "./components/LibraryPage";
import { ModalProvider } from "./components/Context/Modal";
import { getAllDetails, createDetail } from "./store/user-details";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userDetails = useSelector(state => state.details);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (loaded) {
      (async () => {
        await dispatch(getAllDetails());

      })();
    }
  }, [setLoaded, loaded, dispatch, sessionUser]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllSongs());
      await dispatch(getAllPlaylists());
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/welcome" exact={true}>
            <SplashPage />
            <p>testing</p>
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
          <ProtectedRoute path="/users/:userId" exact={true}>
            <UserPage />
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
