import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSong, editSong } from '../../../store/song';
import './editsong.css'

const EditSongForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const song = useSelector(state => state.songs[+id])
    const [title, setTitle] = useState(song?.title);
    const [audio_url, setUrl] = useState(song?.audio_url);
    const [description, setDescription] = useState(song?.description);
    const [image_url, setImageUrl] = useState(song?.image_url);


    const handleSubmit = async (err) => {
        err.preventDefault();
        const newSong = {
            id: +id,
            title,
            audio_url,
            description,
            image_url
        };
        const song = await dispatch(editSong(newSong));
        if (song) {
            history.push(`/songs/${+id}`)
        }

    }

    const deleteSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(deleteSong(+id));
        if (res) {
            history.push('/');
        }
    }



    return (
        <>
            <div className='container'>
                <div className='song-box'>
                    <h2>edit details</h2>
                    <p style={{ color: 'white', paddingBottom: '10px' }}>fill the form below to edit images</p>
                    <form onSubmit={handleSubmit} >
                        <input
                            className='field'
                            id='nameInput'
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder={'rename here... '}
                            name='name'
                            required
                        />
                        <input
                            className='field'
                            type='text'
                            value={audio_url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='change audio url here...'
                            name='url'
                            required
                        />
                        <textarea
                            className='field'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'
                        />
                        <input
                            className='field'
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder='Image URL'
                            name='image'
                            required
                        />
                        <button
                            id='btnfield'
                            // onClick={(e) => (
                            //     setUser_id(user.id)
                            // )}
                            type='submit'
                            style={{ margin: '5px', width: '100px' }}>
                            Submit
                        </button>
                    </form>
                    <form onSubmit={deleteSubmit} id='deletePictureForm'>
                        <button
                            style={{ margin: '5px', width: '100px' }}
                            type='submit'>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default EditSongForm;
