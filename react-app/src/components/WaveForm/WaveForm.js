import Wavesurfer from "wavesurfer.js";
import Button from "@chakra-ui/icon";
import { useEffect, useRef, useState } from "react";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";

const Waveform = () => {
    const waveform = useRef(null);
    const [waveformLoaded, setWaveformLoaded] = useState(true)
    const [regions, setRegions] = useState([])
    const websurfer = useRef(null)
    const audioData = useRef(null)

    const url = 'https://soundtownbucket.s3.us-west-1.amazonaws.com/(LETRA)+Jugaste+y+Sufri-Eslabon+Armado+ft+DannyLux+%5B2020%5D.mp3'
    useEffect(() => {

        waveform.current = Wavesurfer.create({
            display: 'display',
            container: "#waveform",
            waveColor: "whitesmoke",
            progressColor: "orange",
            barGap: 2,
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 3,
            cursorColor: "#567FFF",
            // Add the regions plugin.
            // More info here https://wavesurfer-js.org/plugins/regions.html
            plugins: [
                WaveSurferTimelinePlugin.create({ container: '#waveform-timeline' }),
                WaveSurferRegionsPlugin.create({ maxLength: '60' })
            ],
        });
        waveform.current.load('https://soundtownbucket.s3.us-west-1.amazonaws.com/(LETRA)+Jugaste+y+Sufri-Eslabon+Armado+ft+DannyLux+%5B2020%5D.mp3');


        // Enable dragging on the audio waveform

        // websurfer.current.on("ready", () => {
        //     setWaveformLoaded(true)
        // })
        // Perform action when new region is created
        waveform.current.on("region-created", (e) => {
            let color = randomColor({
                luminosity: "light",
                alpha: 0.3,
                format: "rgba",
            });
            e.color = color;
        });


        waveform.current.enableDragSelection({
            maxLength: 90,
        });
        // =========== ADDED =========
    }, []);

    // const createWaveForm = (e) => {

    //     setWaveformLoaded(false)
    //     const file = e.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = async (event) => {
    //             audioData.current = event.target.result;
    //             let blob = new window.Blob([new Uint8Array(event.target.result)], {
    //                 type: "audio/mp3"
    //             })
    //             //? Fetching from an API?
    //             let res = await fetch('https://soundtownbucket.s3.us-west-1.amazonaws.com/(LETRA)+Jugaste+y+Sufri-Eslabon+Armado+ft+DannyLux+%5B2020%5D.mp3')
    //             let data = await res.json();
    //             await fetch(data.url, {
    //                 method: 'PUT',
    //                 body: blob
    //             });
    //             websurfer.current.load(data.url);
    //             // websurfer.current.loadBlob(blob);
    //         }
    //         reader.readAsArrayBuffer(file);
    //     }
    // }
    //play pause 
    const playPause = () => {
        if (!websurfer.current.isPlaying()) {
            websurfer.current.play()
        } else {
            websurfer.current.pause();
        }
    }
    // delete a particular region
    const deleteSegment = (id) => {
        waveform.current.regions.list[id].remove();
        let updatedRegions = regions.filter((region) => {
            return region.id !== id
        })
    };

    // play a particular region
    const playClip = (clipid) => {
        waveform.current.regions.list[clipid].play();
    };

    //   ========== ADDED ===========

    const playAudio = () => {
        waveform.current.load(url)
        waveform.current.play()
        // if (waveform.current.isPlaying()) {
        //     waveform.current.pause();
        // } else {
        //     waveform.current.play();
        // }
    };


    return (
        <div className="App" style={{ height: '110px', visibility: 'visible' }}>
            <button onClick={playAudio}>Play</button>
            <input type='file' accept='audio/mp3' onChange={playAudio} />
            <div id="waveform"> </div>
            {waveformLoaded && <div>Loading ... </div>}
            <div id='waveform-timeline' style={{ visibility: `${!waveformLoaded ? "visible" : "hidden"}` }}></div>
            <input type="button" value="Play/Pause" onClick={playPause} />
            {/* <input type="button" value="upload Audio" onClick={uploadData} /> */}


        </div>
    );
};

export default Waveform;