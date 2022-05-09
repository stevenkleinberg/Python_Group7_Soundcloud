import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { queueAdvance, historyStepBack } from '../../store/player';
import errorFile from '../../static/audio/buzz.mp3';
import './audio.css'

const Audio = () => {
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs[state.player.playingId]);
    const playerState = useSelector(state => state.player);

    const playNextInQueue = () => {
        if (playerState.queue.length) {
            dispatch(queueAdvance());
        } else {
            dispatch(queueAdvance());
        }
    };


    const playLastInHistory = () => {
        if (playerState.playHistory.length) {
            dispatch(historyStepBack());
        }
    };

    return song ? (
        <div className="player">
            {song.id === playerState.playingId && (
                <div className='player songinfo'>
                    <img className='songImg' src={song?.image_url} onError={(e) => e.target.src = '../../static/images/log'} height='50px' alt="" />
                    <NavLink className='black' to={`/songs/${song?.id}`}>  {song?.title}</NavLink>
                    <AudioPlayer
                        className='songPlayer'
                        customAdditionalControls={[]}
                        layout="horizontal-reverse"
                        src={song?.audio_url}
                        onClickNext={playNextInQueue}
                        onClickPrevious={playLastInHistory}
                        onEnded={playNextInQueue}
                        showSkipControls={true}
                        volume={0.25}
                        autoPlay={true}
                    />
                </div>)
            }
            <audio id="error-sound">
                <source src={errorFile} type="audio/mp3" />
            </audio>
        </div >
    ) : (
        <div className="player">
            <div className='player songinfo'>
                <AudioPlayer
                    className='songPlayer'
                    customAdditionalControls={[]}
                    layout="horizontal-reverse"
                    src={null}
                    onClickPrevious={playLastInHistory}
                    showSkipControls={true}
                    volume={0.25}
                    autoPlay={true}
                />
            </div>)
        </div >
    )
};

export default Audio;
