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
<<<<<<< HEAD
import EditSongForm from "./components/SongFolders/Edit_Song/editSong";
import { getAllSongs } from "./store/song";
import SplashPage from "./components/SplashPage";
=======
import EditSongForm from './components/SongFolders/Edit_Song/editSong';
import { getAllSongs } from './store/song';
import SingleSong from './components/SongFolders/SingleSong';
>>>>>>> main

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
<<<<<<< HEAD
        <Route path="/edit-song" exact={true}>
          <EditSongForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
=======
        <Route path='/songs/:id/edit' exact={true}>
          <EditSongForm />
        </Route>
        <ProtectedRoute path='/songs/:id' exact={true}>
          <SingleSong />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
>>>>>>> main
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
