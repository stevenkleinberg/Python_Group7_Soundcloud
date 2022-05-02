import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './uploadSong.css';

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [audio_url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [created_at, setCreatedAt] = useState('');
    const [updated_at, setUpdatedAt] = useState('');


    const handleSubmit = async (err) => {

        err.preventDefault();
        const newPicture = {
            user_id,
            title,
            audio_url,
            description,
            image_url,
            created_at,
            updated_at
        };
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
                    <form id='upload-song'>
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
                            // onClick={(e) => (
                            //     setUser_id()
                            // )}
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