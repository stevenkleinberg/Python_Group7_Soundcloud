import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlaylistTile from "../../GalleryCard/playlistTile";
import NewPlaylistForm from "../../PlaylistFolders/CreatePlaylist";

import { Modal } from "../../Context/Modal";

import "./Playlist.css";
import AddEditPlaylistModal from "../../PlaylistFolders/AddEditPlaylistModal";

const Playlist = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);
  const raw_playlists = Object.values(playlistsObj);

  const playlists = raw_playlists?.filter(
    (playlist) => playlist?.user_id === user?.id
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="playlist_library_page_container ">
      <div className="flex-row playlist_library_page_title_container">
        <h3>Hear your own playlists</h3>
        <button
          onClick={() => setShowModal(true)}
          className="playlist_library_page_add_button"
        >
          make a new playlist
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddEditPlaylistModal modalMode="add" modalFunction={setShowModal} />
        </Modal>
      )}
      <div className="playlist_tile_container flex-row">
        {playlists?.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
