import './songlist.css';
import { useState, useEffect } from 'react';
import GalleryCard from '../../GalleryCard';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const SongsList = () => {
    const history = useHistory();
    const songs = useSelector(state => state.songs)
    const allsongs = []
    for (let key in songs) {
        allsongs.push(key = songs[key])
    }

    const navLink = (id) => {
        history.push(`/songs/${id}`)
    }

    return (
        <>
            <div>
                <ul>
                    {allsongs.map(song => (
                        <GalleryCard
                            type='songs'
                            description={song.description}
                            title={song.title}
                            songs={Object.values(songs)}
                        />
                    ))}

                </ul>
            </div>
        </>

    )
}

export default SongsList;