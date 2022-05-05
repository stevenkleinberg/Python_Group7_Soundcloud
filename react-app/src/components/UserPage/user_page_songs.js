import GalleryCard from '../GalleryCard';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './userpage.css'

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
            <div id='userSongList' style={{ paddingTop: '3px' }}>
                <div id='firstContainer'>

                </div>
                <div id='secondContainer'>
                    <div style={{ maxWidth: '100%' }}>
                        {allsongs.map(song => (
                            <GalleryCard
                                type='songs'
                                description={song.description}
                                title={song.title}
                                songs={Object.values(songs)}
                            />
                        ))}
                    </div>
                </div>
                <div id='thirdContainer'>

                </div>
                <div id='fourthContainer'>

                </div>
            </div>
        </>
    )
}

export default UserSongList;