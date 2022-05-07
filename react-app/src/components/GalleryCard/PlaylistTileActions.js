import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal } from "../Context/Modal";
import { loadSong, queueSong } from "../../store/player";
import AddtoPlaylist from "../PlaylistFolders/AddtoPlaylist";

function PlaylistTitleActions({ songs }) {
  console.log(songs);
  const playingId = useSelector((state) => state.player.playingId);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openPlaylistModal = () => {
    if (showPlaylistModal) return;
    setShowPlaylistModal(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const addSongToQueue = (id) => {
    if (!playingId) {
      dispatch(loadSong(id));
    } else {
      dispatch(queueSong(id));
    }
  };

  return (
    <>
      <div>
        <div className="song_tile_actions" onClick={openMenu}>
          ...
        </div>
        <div className="dropdown">
          {showMenu && (
            <div className="song-tile-action-dropdown">
              <div
                onClick={() =>
                  songs.forEach((songId) => addSongToQueue(songId))
                }
              >
                Add to Queue
              </div>
              <div onClick={openPlaylistModal}>Add to Playlist</div>
            </div>
          )}
        </div>
        {showPlaylistModal && (
          <Modal onClose={() => setShowPlaylistModal(false)}>
            <div className="add_to_playlist_modal_container">
              <AddtoPlaylist song={songs} />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default PlaylistTitleActions;
