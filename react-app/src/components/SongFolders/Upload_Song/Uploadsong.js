import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from '../../../store/song';
import './uploadSong.css';

const UploadSong = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [audio_url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');


    const handleSubmit = async (ev) => {

        ev.preventDefault();
        const newSong = {
            user_id: sessionUser.id,
            title,
            audio_url,
            description,
            image_url,
        };
        const songs = await dispatch(createSong(newSong));
        if (songs) {
            history.push('/')
        }

    }

    const reset = () => {
        setTitle('');
        setUrl('');
        setImageUrl('');
        setDescription('');
        history.push('/')
    };

    return (
        <div className='container'>
            <div className='song-box'>
                <div className='left'>
                </div>
                <div className='right'>
                    <h2>upload</h2>
                    <form
                        onSubmit={handleSubmit}
                        id='upload-song'>
                        <input
                            className='field'
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder='Title'
                            name='name'
                            required
                        />
                        <input
                            className='field'
                            value={audio_url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='song url'
                            name='audio_url'
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
                            type='submit'
                            className='btn'>
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </div>
    );


}

export default UploadSong;
