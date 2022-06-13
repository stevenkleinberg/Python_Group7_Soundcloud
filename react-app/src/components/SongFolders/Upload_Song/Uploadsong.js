import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../../store/song";
import "./uploadSong.css";

const UploadSong = ({ setShowUploadModal }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [musicFile, setMusicFile] = useState();
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();

    setErrors([]);
    setTitle("");
    setMusicFile();
    setDescription("");
    setImageFile();
    setShowUploadModal(false);
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!musicFile || !imageFile) {
      let errors = [];
      if (!imageFile) errors.push("Image file is required");
      if (!musicFile) errors.push("Music file is required");
      setErrors(errors);
      return;
    }

    const formData = new FormData();

    formData.append("audio_url", musicFile);
    formData.append("user_id", sessionUser.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_url", imageFile);

    setAudioLoading(true);

    const res = await dispatch(createSong(formData));
    if (res) {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        setAudioLoading(false);
        history.push(`/`);
        setShowUploadModal(false);
      }
    } else {
      setAudioLoading(false);
    }
  };

  const updateAudioUrl = async (e) => {
    const file = await e.target.files[0];
    setMusicFile(file);
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

    setImageFile(file);
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
    <form onSubmit={handleSubmit} id="upload-song" className="modal-form flex-column">
      <div className="form-header flex-row">
        <h2 className="active">Upload Song</h2>
      </div>
      <div className="upload-form-container flex-row">
        <div className="upload-song-left flex-column">
          <img
            id="upload-image"
            className={`upload-song-image${!!imageFile ? '' : ' hidden'}`}
          />
          <div
            className={`upload-song-placeholder${!!imageFile ? ' hidden' : ''}`}
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
            className={`cursor-pointer image-button ${!!imageFile ? "replace-image-button" : "upload-image-button"}`}
            onClick={handleImageButtonClick}
          >
            {!!imageFile ? "Replace Image"
              : (
                <div className="inner-button flex-row">
                  <div className="upload-image-camera">
                    <i className="fa-solid fa-camera fa-1x" />
                  </div>
                  <div className="upload-image-text">Upload image</div>
                </div>
              )}
          </button>

          {imageLoading && <p>Uploading image...</p>}

        </div>
        <div className="upload-song-right flex-column">
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
            className={`cursor-pointer audio-button ${!!musicFile ? "replace-audio-button" : "upload-audio-button"}`}
            onClick={handleAudioButtonClick}
          >
            {!!musicFile ? "Replace Music File"
              : (
                <div className="inner-button flex-row">
                  <div className="upload-audio-note">
                    <i className="fa-solid fa-music fa-1x" />
                  </div>
                  <div className="upload-audio-text">Upload Music</div>
                </div>
              )}
          </button>

          {audioLoading && <p>Uploading music file...</p>}

        </div>
      </div>
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
              Submit
            </button>

          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadSong;
