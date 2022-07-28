import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../Context/Modal";
import { loadSong, queueSong } from "../../store/player";
import AddtoPlaylist from "../PlaylistFolders/AddtoPlaylist";
import { ImMenu3 } from 'react-icons/im'
import { CgPlayList } from 'react-icons/cg'
import { MdOutlinePlaylistAdd } from 'react-icons/md'

function SongTileActions({ song }) {
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
      <div className="song_tile_actions_container">
        <div className="song_tile_actions" onClick={openMenu}>
          < ImMenu3 className="song_tile_actions_icon opHov" />
        </div>
        <div className="song_tile_dropdown">
          {showMenu && (
            <div className="song-tile-action-dropdown">
              <div className='stad flex-row-center' onClick={() => addSongToQueue(song.id)} > <span className='flex-row-center '> < CgPlayList className="cg-icon" />  Add to Queue</span></div>
              <div className='stad flex-row-center' onClick={openPlaylistModal}><span className=' flex-row-center'><MdOutlinePlaylistAdd className="cg-icon" /> Add to Playlist</span></div>
            </div>
          )}
        </div>
        {
          showPlaylistModal && (
            <Modal onClose={() => setShowPlaylistModal(false)}>
              <div className="add_to_playlist_modal_container">
                <AddtoPlaylist song={song} />
              </div>
            </Modal>
          )
        }
      </div >
    </>
  );
}

export default SongTileActions;
