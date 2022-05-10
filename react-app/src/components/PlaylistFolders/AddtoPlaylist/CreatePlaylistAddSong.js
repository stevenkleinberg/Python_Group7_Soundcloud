import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createPlaylist, addSongtoPlaylist } from "../../../store/playlist";

const CreatePlaylistAddSong = ({ songsArr }) => {
  const songs = useSelector((state) => state.songs);
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [dynSongsArr, setDynSongsArr] = useState(songsArr);

  const [newPlaylistId, setNewPlaylistId] = useState("");

  const [loading, setLoading] = useState(false);
  const [playlistBtn, setPlaylistBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", +userId);
    formData.append("title", title);

    const playlist = await dispatch(createPlaylist(formData));

    setNewPlaylistId(playlist.id);

    setLoading(true);

    for (const songId of dynSongsArr) {
      const formData = new FormData();

      formData.append("playlist_id", playlist?.id);
      formData.append("song_id", songId);
      dispatch(addSongtoPlaylist(formData));
    }

    setLoading(false);
    setPlaylistBtn(true);
  };

  return (
    <>
      {!playlistBtn && (
        <>
          <div>
            <p className="atp_tc">Playlist Name</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
          <div className="atp_bc">
            <a onClick={handleSubmit} className="atp_bs">
              Save
            </a>
          </div>
        </>
      )}
      {loading && (
        // <>
        //   <div>
        //     <p>Playlist Name</p>
        //     <input value={title} onChange={(e) => setTitle(e.target.value)} />
        //   </div>
        //   <div>
        //     <BarLoader height={4} width={100} color={"#4480A6"} />
        //   </div>
        // </>
        // <BarLoader height={4} width={100} color={"#4480A6"} />
        <p>Loading</p>
      )}

      {playlistBtn && (
        <NavLink to={`/playlists/${newPlaylistId}`} className="atp_bc atp_bsp">
          Go to playlist
        </NavLink>
      )}

      <div className="atp_ul_conatiner">
        <ul>
          {dynSongsArr.map((songId, idx) => (
            <li key={idx} className="atp_li_container">
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
