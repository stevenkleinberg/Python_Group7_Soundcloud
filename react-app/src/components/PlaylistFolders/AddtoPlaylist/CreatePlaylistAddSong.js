import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../../store/playlist";

const CreatePlaylistAddSong = ({ songsArr }) => {
  const songs = useSelector((state) => state.songs);
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [dynSongsArr, setDynSongsArr] = useState(songsArr);

  const test = (index) => {
    console.log(index);
    // setDynSongsArr(() => dynSongsArr.splice(index, 1));
    // console.log(dynSongsArr);
  };

  const handle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", +userId);
    formData.append("title", title);

    dispatch(createPlaylist(formData));
  };

  return (
    <>
      <div>
        <p>Playlist Name</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <button>Save</button>
      </div>
      <div>
        <ul>
          {dynSongsArr.map((songId, idx) => (
            <li key={idx}>
              <div className="flex-row inner_create_playlist_song">
                <div className="flex-row">
                  <img
                    src={songs[+songId]?.image_url}
                    className="create_playlist_song_img"
                  />
                  <p>{songs[+songId]?.title}</p>
                </div>
                {/* <span onClick={test(idx)}>&#10005;</span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreatePlaylistAddSong;
