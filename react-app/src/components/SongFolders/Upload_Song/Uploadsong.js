import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from "../../../store/song";
import "./uploadSong.css";

const UploadSong = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [audio_url, setUrl] = useState("");
  const [user_id, setUser_id] = useState("");
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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    setAudioLoading(true);

    // const newSong = {
    //   user_id: sessionUser.id,
    //   title,
    //   audio_url,
    //   description,
    //   image_url,
    // };

    const songs = await dispatch(createSong(formData));
    if (songs) {
      setAudioLoading(false);
      history.push("/");
    } else {
      setAudioLoading(false);
      console.log("Error: uploadsong.js react frontend");
    }
  };

  const reset = () => {
    setTitle("");
    setUrl("");
    setImageUrl("");
    setDescription("");
    history.push("/");
  };

  const updateAudioUrl = (e) => {
    const file = e.target.files[0];
    setUrl(file);
  };

  return (
    <div className="container">
      <div className="song-box">
        <div className="left"></div>
        <div className="right">
          <h2>upload</h2>
          <form onSubmit={handleSubmit} id="upload-song">
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
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              name="image_url"
              id="image_url"
              required
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
