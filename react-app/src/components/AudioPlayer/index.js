import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './audio.css'

const Audio = () => {
    const song = useSelector(state => state.songs[state.player.playingId])
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div className="player">
            <div className='songinfo'>
                <img className='songImg' src={song?.image_url} onError={(e) => e.target.src = '../../static/images/log'} height='50px' />
                <div>
                    {/* {song?.id ? <p> by</p> : <>  </>} */}
                    <NavLink to={`/songs/${song?.id}`}>  {song?.title}</NavLink>
                </div>
                <AudioPlayer customAdditionalControls={[]} layout="horizontal-reverse" src={song?.audio_url} />
            </div>
        </div >
    )
}

export default Audio;
