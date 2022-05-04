import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import UploadSong from "./components/SongFolders/Upload_Song/Uploadsong";
import HomePage from "./components/HomePage";
import EditSongForm from './components/SongFolders/Edit_Song/editSong';
import { getAllSongs } from './store/song';
import SingleSong from './components/SongFolders/SingleSong';
import Audio from './components/AudioPlayer';
import UserPage from './components/UserPage';
import SongsList from './components/SongFolders/SongList';



import SplashPage from "./components/SplashPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllSongs());
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/welcome" exact={true}>
          <SplashPage />
          <p>testing</p>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
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
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/allsongs" exact={true}>
          <SongsList />
        </ProtectedRoute>
      </Switch>
      <Audio />
    </BrowserRouter>
  );
}

export default App;
