import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../../store/playlist";

const NewPlaylistForm = ({ modalFunction }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [urlImageFile, setUrlImageFile] = useState("");
  const [description, setDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image_url", imageFile);
    formData.append("user_id", +userId);
    formData.append("title", title);
    formData.append("description", description);

    setImageLoading(true);

    const res = await dispatch(createPlaylist(formData));
    if (res.errors) {
      setErrors(res.errors);
    }
    if (res) {
      setImageLoading(false);

      modalFunction(false);
    }
  };

  const updateImageFile = (e) => {
    const file = e.target.files[0];
    setUrlImageFile(URL.createObjectURL(file));
    setImageFile(file);
  };

  return (
    // <div>
    //   <h2>Make a new Playlist</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       {errors.map((error, ind) => (
    //         <div className="error_message" key={ind}>
    //           {error}
    //         </div>
    //       ))}
    //     </div>
    //     <label>title </label>
    //     <input
    //       type="text"
    //       required
    //       onChange={(e) => {
    //         setTitle(e.target.value);
    //       }}
    //     />
    //     <label>playlist image </label>
    //     <input type="file" accept="image/*" onChange={updateImageFile} />
    //     <label>decription </label>
    //     <input
    //       type="description"
    //       onChange={(e) => {
    //         setDescription(e.target.value);
    //       }}
    //     />
    //     <button>Submit</button>
    //   </form>
    // </div>
    <div className="flex-row AEP_conatiner">
      <div className="AEP_left">
        {urlImageFile !== '' ? (
          <img src={urlImageFile} className="AEP_image" />
        ) : (
          <div className="AEP_placeholder" />
        )}
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

export default NewPlaylistForm;
