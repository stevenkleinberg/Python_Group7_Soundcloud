import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../../store/playlist";

const NewPlaylistForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [description, setDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image_url", imageFile);
    formData.append("user_id", +userId);
    formData.append("title", title);
    formData.append("description", description);

    setImageLoading(true);

    dispatch(createPlaylist(formData));
  };

  const updateImageFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <h2>Make a new Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label>title </label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>playlist image </label>
        <input type="file" accept="image/*" onChange={updateImageFile} />
        <label>decription </label>
        <input
          type="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewPlaylistForm;
