import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../../store/song";
import "./uploadSong.css";

const UploadSong = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [audio_url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();

    formData.append("audio_url", audio_url);
    formData.append("user_id", sessionUser.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_url", image_url);

    setAudioLoading(true);

    const res = await dispatch(createSong(formData));
    if (res) {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        setAudioLoading(false);
        history.push(`/`);
      }
    } else {
      setAudioLoading(false);
    }
  };

  const updateAudioUrl = (e) => {
    const file = e.target.files[0];
    setUrl(file);
  };

  const updateImageUrl = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
  };

  return (
    <div className="container">
      <div className="song-box">
        <div className="left"></div>
        <div className="right">
          <h2>upload</h2>
          <form onSubmit={handleSubmit} id="upload-song">
            <div>
              {errors.map((error, ind) => (
                <div className="error_message" key={ind}>
                  {error}
                </div>
              ))}
            </div>
            <input
              className="field"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
              name="title"
              id="title"
              required
            />
            <input
              className="field"
              type="file"
              accept="audio/*"
              onChange={updateAudioUrl}
              name="audio_url"
              id="audio_url"
              required
            />

            <textarea
              className="field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              name="description"
              id="description"
            />

            <input
              className="field"
              type="file"
              accept="image/*"
              onChange={updateImageUrl}
              name="image_url"
              id="image_url"
            />

            <button className="btn" type="submit">
              Submit
            </button>
            {audioLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
