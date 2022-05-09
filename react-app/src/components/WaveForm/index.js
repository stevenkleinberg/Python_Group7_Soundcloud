// Plugins prop format
// now you have to pass always an array of objects, where each can contain three properties,
// only one of them is required - plugin;
// plugin property is a plugin class, imported from wavesurfer.js
// example:
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import { useEffect, useRef, useState } from "react";
import Wavesurfer from "wavesurfer.js";
import { WaveSurfer } from 'wavesurfer.js';
import { useSelector } from "react-redux";

function TheWavetest() {
    const waveform = useRef(null);
    const sessionUser = useSelector(state => state.session.user)
    // const url = 'https://soundtownbucket.s3.us-west-1.amazonaws.com/(LETRA)+Jugaste+y+Sufri-Eslabon+Armado+ft+DannyLux+%5B2020%5D.mp3'
    const song = useSelector(state => state.songs[state.player.playingId]);

    useEffect(() => {

        waveform.current = Wavesurfer.create({
            container: "#waveform",
            waveColor: "black",
            progressColor: "orange",
            barGap: 2,
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 3,
            cursorColor: "#567FFF",
            // Add the regions plugin.
            // More info here https://wavesurfer-js.org/plugins/regions.html
            plugins: [
                TimelinePlugin.create({ container: '#timeline' }),
                RegionsPlugin.create({ maxLength: '60' }),
                CursorPlugin.create({})
            ],
        });
        // waveform.current.load('../../static/audio/buzz.mp3');

    }, [sessionUser]);



    return (
        <>
            <div id='waveform'> </div>
            <div id='timeline'> </div>
            {/* <p>hello</p> */}
            {/* <WaveSurfer /> */}
        </>
    )
}

export default TheWavetest;