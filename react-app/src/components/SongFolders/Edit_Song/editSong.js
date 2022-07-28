import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, editSong } from "../../../store/song";
import "./editsong.css";

const EditSongForm = ({ setShowEditSongModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const song = useSelector((state) => state.songs[+id]);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(song?.title);
  const [audio_url, setAudioUrl] = useState(song?.audio_url);
  const [description, setDescription] = useState(song?.description);
  const [image_url, setImageUrl] = useState(song?.image_url);
  const [audioLoading, setAudioLoading] = useState(false);
  const [newAudio, setNewAudio] = useState();
  const [newImage, setNewImage] = useState();

  const handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();

    setErrors([]);
    setTitle(song?.title);
    setAudioUrl(song?.audio_url);
    setDescription(song?.description);
    setImageUrl(song?.image_url);
    setShowEditSongModal(false);
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();

    formData.append("audio_url", newAudio || audio_url);
    formData.append("id", +id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_url", newImage || image_url);

    if (newAudio) setAudioLoading(true);

    const res = await dispatch(editSong(formData));
    if (res) {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        setAudioLoading(false);
        history.push(`/songs/${+id}`);
        setShowEditSongModal(false);
      }
    } else {
      setAudioLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await dispatch(deleteSong(+id));
    if (res) {
      history.push("/");
    }
  };

  const updateAudioUrl = async (e) => {
    const file = await e.target.files[0];
    setNewAudio(file);
  };

  const updateImageUrl = async (e) => {
    e.preventDefault();
    const file = await e.target.files[0];

    if (FileReader && file) {
      const fr = new FileReader();
      const img = document.getElementById("upload-image");
      fr.onload = () => img.src = fr.result;
      fr.readAsDataURL(file);
    }

    setNewImage(file);
  };

  const handleImageButtonClick = e => {
    e.preventDefault();
    document.getElementById("image_url").click();
  };

  const handleAudioButtonClick = e => {
    e.preventDefault();
    document.getElementById("audio_url").click();
  };

  return (
    <form onSubmit={handleSubmit} id="edit-song" className="modal-form flex-column">
      <div className="form-header flex-row">
        <h2 className="active">Edit Song</h2>
      </div>
      <div className="edit-form-container flex-row">
        <div className="edit-song-left flex-column">
          <img
            alt=''
            id="upload-image"
            src={image_url}
            className={`upload-song-image`}
          />
          <input
            type="file"
            accept="image/*"
            onChange={updateImageUrl}
            name="image_url"
            id="image_url"
            hidden
          />
          <button
            className={`cursor-pointer image-button replace-image-button`}
            onClick={handleImageButtonClick}
          >
            Replace Image
          </button>

        </div>

        <div className="edit-song-right flex-column">
          <label className="modal-field-label label-required">Title</label>
          <input
            className="modal-field"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />

          <label className="modal-field-label">Description</label>
          <textarea
            className="modal-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          <input
            className="modal-field"
            type="file"
            accept="audio/*"
            onChange={updateAudioUrl}
            name="audio_url"
            id="audio_url"
            hidden
          />
          <button
            className={`cursor-pointer audio-button replace-audio-button`}
            onClick={handleAudioButtonClick}
          >
            Replace Music File
          </button>

          {audioLoading && <p>Uploading music file...</p>}

        </div>
      </div>


      {/* <input
          className="field"
          id="nameInput"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={"rename here... "}
          name="name"
          required
        />
        <button
          type="button"
          className="field"
          onClick={() => setNewAudio(!newAudio)}
        >
          Upload New Audio File
        </button>
        {newAudio && (
          <input
            className="field"
            type="file"
            accept="audio/*"
            onChange={updateAudioUrl}
            name="audio_url"
            id="audio_url"
          />
        )}

        <textarea
          className="field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button
          type="button"
          className="field"
          onClick={() => setNewImage(!newImage)}
        >
          Upload New Image File
        </button>
        {newImage && (
          <input
            className="field"
            type="file"
            accept="image/*"
            onChange={updateImageUrl}
            name="image_url"
            id="image_url"
          />
        )} */}

      <div className="form-footer flex-column">
        <div className="error-block">
          {errors?.map((error, ind) => (
            <div className="error-text" key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className="form-action flex-row">
          <div className="legend">
            <div className="legend-required">Required fields</div>
          </div>
          <div className="form-action-buttons flex-row">
            <button
              className="cursor-pointer modal-button button-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button className="cursor-pointer modal-button button-submit" type="submit">
              Save changes
            </button>

            <button className="cursor-pointer modal-button button-delete" onClick={handleDelete}>
              Delete song
            </button>

          </div>
        </div>

        {/* <button
          id="btnfield"
          // onClick={(e) => (
          //     setUser_id(user.id)
          // )}
          type="submit"
          style={{ margin: "5px", width: "100px" }}
        >
          Submit
        </button>
        <form onSubmit={deleteSubmit} id="deletePictureForm">
          <button style={{ margin: "5px", width: "100px" }} type="submit">
            Delete
          </button>
        </form> */}
      </div>
    </form >
  );
};

export default EditSongForm;
