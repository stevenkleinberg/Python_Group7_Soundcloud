import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { loadSong, queueSong } from '../../store/player';


function SongTileActions({ song }) {
    const playingId = useSelector(state => state.player.playingId);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const addSongToQueue = (id) => {
        if (!playingId) {
            dispatch(loadSong(id));
        } else {
            dispatch(queueSong(id));
        }
    }

    return (
        <>
            <div>
                <div className="song_tile_actions" onClick={openMenu}>...</div>
                <div className="dropdown">
                    {showMenu && (
                        <div className="song-tile-action-dropdown">
                            <div onClick={() => addSongToQueue(song.id)}>Add to Queue</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SongTileActions;
