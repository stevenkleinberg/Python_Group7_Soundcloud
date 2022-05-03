import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


const EditSongForm = () => {

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

    const DeleteSubmit = async (e) => {
        e.preventDefault();
        const payload = {

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
        <>
            <h2> Edit  </h2>
            <div id='EditPictureDiv' className='EditPictureForm'>
                <div>
                    <form onSubmit={handleSubmit} >
                        <input
                            className='field'
                            id='nameInput'
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder='rename here... '
                            name='name'
                            required
                        />
                        <input
                            className='field'
                            type='text'
                            value={audio_url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='change image url here...'
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
                    <form onSubmit={DeleteSubmit} id='deletePictureForm'>
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