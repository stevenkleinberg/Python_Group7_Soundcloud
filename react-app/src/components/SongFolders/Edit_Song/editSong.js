import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, editSong } from "../../../store/song";
import "./editsong.css";

const EditSongForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const song = useSelector((state) => state.songs[+id]);
  const [title, setTitle] = useState(song?.title);
  const [audio_url, setUrl] = useState(song?.audio_url);
  const [description, setDescription] = useState(song?.description);
  const [image_url, setImageUrl] = useState(song?.image_url);
  const [audioLoading, setAudioLoading] = useState(false);
  const [newAudio, setNewAudio] = useState(false);
  const [newImage, setNewImage] = useState(false);

  const handleSubmit = async (err) => {
    err.preventDefault();
    const formData = new FormData();

    formData.append("audio_url", audio_url);
    formData.append("id", +id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_url", image_url);

    setAudioLoading(true);

    // const newSong = {
    //     id: +id,
    //     title,
    //     audio_url,
    //     description,
    //     image_url
    // };
    const song = await dispatch(editSong(formData));
    if (song) {
      setAudioLoading(false);
      history.push(`/songs/${+id}`);
    } else {
      setAudioLoading(false);
      console.log("Error: editSong.js react frontend");
    }
  };

  const deleteSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteSong(+id));
    if (res) {
      history.push("/");
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
    <>
      <div className="container">
        <div className="song-box">
          <h2>edit details</h2>
          <p style={{ color: "white", paddingBottom: "10px" }}>
            fill the form below to edit images
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="field"
              id="nameInput"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder={"rename here... "}
              name="name"
              required
            />
            <button className="field" onClick={() => setNewAudio(!newAudio)}>
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
                required
              />
            )}

            <textarea
              className="field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button className="field" onClick={() => setNewImage(!newImage)}>
              Upload New Audio File
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
            )}
            <button
              id="btnfield"
              // onClick={(e) => (
              //     setUser_id(user.id)
              // )}
              type="submit"
              style={{ margin: "5px", width: "100px" }}
            >
              Submit
            </button>
          </form>
          <form onSubmit={deleteSubmit} id="deletePictureForm">
            <button style={{ margin: "5px", width: "100px" }} type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSongForm;
