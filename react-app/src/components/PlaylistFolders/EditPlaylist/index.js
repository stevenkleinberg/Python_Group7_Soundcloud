import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPlaylist } from "../../../store/playlist";

const EditPlaylistForm = ({ modalFunction }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[+id]);
  const userId = useSelector((state) => state.session.user.id);
  const [title, setTitle] = useState(playlist?.title);
  const [imageFile, setImageFile] = useState("");
  const [description, setDescription] = useState(playlist?.description);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image_url", imageFile);
    formData.append("id", +id);
    formData.append("user_id", +userId);
    formData.append("title", title);
    formData.append("description", description);

    setImageLoading(true);

    const playlist = await dispatch(editPlaylist(formData));

    if (playlist) {
      modalFunction(false);
    }
  };

  const updateImageFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>title </label>
        <input
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>playlist image </label>
        <input type="file" accept="image/*" onChange={updateImageFile} />
        <label>decription </label>
        <input
          value={description}
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

export default EditPlaylistForm;
