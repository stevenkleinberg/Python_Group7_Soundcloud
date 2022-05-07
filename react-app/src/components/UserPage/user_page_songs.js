import GalleryCard from '../GalleryCard';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import './userpage.css'


function UserSongList() {
    const waveformRef = useRef();
    const icons = {
        mute: 'https://www.pngitem.com/pimgs/m/81-811082_mute-and-unmute-icon-png-transparent-png.png',
        play: 'https://spng.pinpng.com/pngs/s/47-472328_play-button-svg-png-icon-free-download-download.png',
        pause: 'https://www.seekpng.com/png/detail/179-1792518_play-stop-pause-icon-png.png',
        stop: 'https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-vector-stop-icon-png-image_695747.jpg',
        volume: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/768px-Speaker_Icon.svg.png'

    }
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
                        <div ref={waveformRef} id="waveform">

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSongList;