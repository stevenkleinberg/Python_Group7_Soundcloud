import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSongRow from "./SingleSongRow";

import { Modal } from "../../Context/Modal";

import { useHistory, useParams } from "react-router-dom";
import { deletePlaylist } from "../../../store/playlist";
import { loadPlaylist, queuePlaylist } from "../../../store/player";
import Avatar from "../../Icons/Avatar";
import AddEditPlaylistModal from "../AddEditPlaylistModal";

const PlaylistMainFeed = ({ songsId, playlist }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const playingId = useSelector((state) => state.player.playingId);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hiddenClass, setHiddenClass] = useState(false);
  const [clipboardMenu, setClipboardMenu] = useState(false);
  const songArr = [];
  const songs = useSelector((state) => state.songs);
  const sessionUser = useSelector((state) => state.session.user);

  songsId?.forEach((songId) => {
    songArr.push(songs[+songId]);
  });

  const addToClipBoard = () => {
    if (clipboardMenu) return;

    navigator.clipboard.writeText(window.location.href);
    setClipboardMenu(true);
  };

  useEffect(() => {
    if (!clipboardMenu) return;

    const closeClipboardDropdown = () => {
      if (!clipboardMenu) return;

      setClipboardMenu(false);
    };

    document.addEventListener("click", closeClipboardDropdown);

    return () => document.removeEventListener("click", closeClipboardDropdown);
  }, [clipboardMenu]);

  const showdeletemodal = () => {
    if (showDeleteModal) return;
    setShowDeleteModal(true);
  };

  const deletePlaylistDb = async () => {
    const res = await dispatch(deletePlaylist(+id));
    if (res) {
      history.push("/library/playlists");
    }
  };

  const openMenu = () => {
    if (hiddenClass) return;
    setHiddenClass(true);
  };

  useEffect(() => {
    if (!hiddenClass) return;

    const closeMenu = () => {
      setHiddenClass(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [hiddenClass]);

  const addPlaylistToQueue = (playlist) => {
    if (!playingId) {
      dispatch(loadPlaylist(playlist));
    } else {
      dispatch(queuePlaylist(playlist));
    }
  };
  return (
    <div className="playlist_mainfeed_container">
      <div className="playlist_button_group flex-row">
        <div>
          <button onClick={addToClipBoard} className="cool_button">
            Copy Link
          </button>
          {clipboardMenu && (
            <div className="dropdown-clipboard">Copied to clipboard</div>
          )}
        </div>
        {playlist?.user_id === sessionUser.id && (
          <button
            className="cool_button"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
        )}
        {showEditModal && (
          <Modal
            onClose={() => {
              setShowEditModal(false);
            }}
          >
            {/* <h3>Edit Playlist</h3>
            <EditPlaylistForm modalFunction={setShowEditModal} /> */}
            <AddEditPlaylistModal
              modalMode="edit"
              modalFunction={setShowEditModal}
              songArr={songArr}
            />
          </Modal>
        )}
        <div>
          <button onClick={openMenu} className="cool_button">
            More
          </button>
          <div className="playlist_queue_delete_container">
            {hiddenClass && (
              <>
                <p
                  onClick={() => addPlaylistToQueue(playlist)}
                  className="p_hover"
                >
                  Add to Queue
                </p>
                {playlist?.user_id === sessionUser.id && (
                  <p className="p_hover" onClick={showdeletemodal}>
                    Delete playlist
                  </p>
                )}
              </>
            )}
          </div>
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <div className="flex-column playlist_delete_modal">
                <div className="flex-column inner_playlist_delete_modal">
                  <h3>Delete playlist</h3>
                  <p>
                    Are you sure you want to delete {playlist?.title}? This
                    action cannot be undone.
                  </p>
                  <div className="flex-row inner_inner_playlist_delete_modal">
                    <p onClick={() => setShowDeleteModal(false)}>Cancel</p>
                    <p
                      className="confirm_playlist_button"
                      onClick={deletePlaylistDb}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <div className="flex-row">
        <div className="user-badge flex-column">
          <Avatar user={playlist?.user} />
          <p>{playlist?.user?.display_name}</p>
        </div>
        <div className="song_container_ul_li">
          <ul className="flex-column">
            {songArr?.map((song, idx) => (
              <li key={idx} className="playlist_song_list_li">
                <SingleSongRow song={song} idx={idx} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistMainFeed;
