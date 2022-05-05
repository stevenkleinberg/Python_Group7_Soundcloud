import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSongRow from "./SingleSongRow";

import { Modal } from "../../Context/Modal";
import EditPlaylistForm from "../EditPlaylist";
import { useHistory, useParams } from "react-router-dom";
import { deletePlaylist } from "../../../store/playlist";
import SongTileActions from "../../GalleryCard/SongTileActions";

const PlaylistMainFeed = ({ songsId, playlist }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hiddenClass, setHiddenClass] = useState(false);
  const songArr = [];
  const songs = useSelector((state) => state.songs);
  songsId?.forEach((songId) => {
    songArr.push(songs[+songId]);
  });

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

  return (
    <div className="playlist_mainfeed_container">
      <div className="playlist_button_group flex-row">
        <button>Like</button>
        <button>Share</button>
        <button>Copy Link</button>
        <button onClick={() => setShowEditModal(true)}>Edit</button>
        {showEditModal && (
          <Modal
            onClose={() => {
              setShowEditModal(false);
            }}
          >
            <h3>Edit Playlist</h3>
            <EditPlaylistForm />
          </Modal>
        )}
        <div>
          <button onClick={openMenu}>More</button>
          <div className="playlist_queue_delete_container">
            {hiddenClass && (
              <>
                <p className="p_hover">Add to next up</p>
                <p className="p_hover" onClick={() => setShowDeleteModal(true)}>
                  Delete playlist
                </p>
                {showDeleteModal && (
                  <Modal onClose={() => setShowDeleteModal(false)}>
                    <div className="flex-column playlist_delete_modal">
                      <div className="flex-column inner_playlist_delete_modal">
                        <h3>Delete playlist</h3>
                        <p>
                          Are you sure you want to delete {playlist?.title}?
                          This action cannot be undone.
                        </p>
                        <div className="flex-row inner_inner_playlist_delete_modal">
                          <p onClick={() => setShowDeleteModal(false)}>
                            Cancel
                          </p>
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div>
          <img />
          <p>Jesus Elizalde</p>
        </div>
        <div>
          <ul>
            {songArr?.map((song, idx) => (
              <li key={idx}>
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
