import GalleryCard from '../GalleryCard';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './userpage.css';
import Waveform from "../WaveForm/WaveForm";

function UserSongList() {

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
            <div id='container'>
                <div className="music-player">
                    <img src="https://soundtownbucket.s3.us-west-1.amazonaws.com/Corta-Venas+.jpeg" alt="music-icon" id='music-icon' />
                    <div className="info">
                        <h1> Fairy Tale</h1>
                        <h3> Music source Pixabay </h3>

                        <Waveform />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSongList;