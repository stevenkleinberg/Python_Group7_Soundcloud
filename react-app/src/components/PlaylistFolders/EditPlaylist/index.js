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
      setImageLoading(false);

      modalFunction(false);
    }
  };

  const updateImageFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="flex-row AEP_conatiner">
      <div className="AEP_left">
        <img alt='' src={playlist.image_url} className="AEP_image" />
        <label>Playlist Image: </label>
        <input type="file" accept="image/*" onChange={updateImageFile} />
      </div>
      <div className="AEP_right">
        <form onSubmit={handleSubmit} className="flex-column">
          <label className="AEP_spacing">Title: </label>
          <input
            value={title}
            required
            type="text"
            className="AEP_spacing"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label className="AEP_spacing">Description: </label>
          <input
            className="AEP_spacing"
            value={description}
            type="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {imageLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex-row">
              <button className="AEP_submit_button">Submit</button>
              <button
                className="AEP_submit_button"
                onClick={() => modalFunction(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistForm;
