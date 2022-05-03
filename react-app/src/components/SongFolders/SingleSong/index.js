import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";


const SingleSong = () => {
    const { id } = useParams();
    const songs = useSelector(state => state.songs)
    console.log(songs)
    const song = songs[+id]

    return (
        <div>
            {song?.title}
            <NavLink to={`/songs/${+id}/edit`} exact={true} activeClassName="active">
                edit form
            </NavLink>
        </div>
    )
}

export default SingleSong;