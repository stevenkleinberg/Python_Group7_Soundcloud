import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Icons/Avatar";
import SpeechBubble from "../../Icons/SpeechBubble";
import SingleComment from "./Comments/SingleComment";
import { createComment } from "../../../store/comment";
import { likeSong, unlikeSong } from "../../../store/song";
import { loadSong, queueSong } from "../../../store/player";

import { Modal } from "../../Context/Modal";
import AddtoPlaylist from "../../PlaylistFolders/AddtoPlaylist";
import EditSongForm from "../Edit_Song/editSong";

const SongComments = ({ song }) => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");

  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const playingId = useSelector((state) => state.player.playingId);
  const dispatch = useDispatch();
  const [clipboardMenu, setClipboardMenu] = useState(false);
  const [showEditSongModal, setShowEditSongModal] = useState(false);

  const showMoreDropdownFnc = () => {
    if (showMoreDropdown) return;

    setShowMoreDropdown(true);
  };

  useEffect(() => {
    if (!showMoreDropdown) return;

    const closeEditDropdown = () => {
      if (!showMoreDropdown) return;

      setShowMoreDropdown(false);
    };

    document.addEventListener("click", closeEditDropdown);

    return () => document.removeEventListener("click", closeEditDropdown);
  }, [showMoreDropdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      user_id: sessionUser.id,
      song_id: song.id,
      content,
    };
    const data = await dispatch(createComment(comment));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setContent("");
    }
  };
  const handle_LikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("song_id", song.id);
    await dispatch(likeSong(formData));
  };
  const handle_UnLikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("song_id", song.id);
    await dispatch(unlikeSong(formData));
  };
  const addSongToQueue = (id) => {
    if (!playingId) {
      dispatch(loadSong(id));
    } else {
      dispatch(queueSong(id));
    }
  };

  const addToClipBoard = () => {
    if (clipboardMenu) return;

    navigator.clipboard.writeText(window.location.href);
    setClipboardMenu(true);
  };
  useEffect(() => {
    if (!clipboardMenu) return;

    const closeClipboardDropdown = () => {
      if (!clipboardMenu) return;

      setClipboardMenu(false);
    };

    document.addEventListener("click", closeClipboardDropdown);

    return () => document.removeEventListener("click", closeClipboardDropdown);
  }, [clipboardMenu]);
  return (
    <div className="song_mainfeed_container">
      <div className="song_mainfeed_top">
        <div className="new-comment-form_wrapper flex-row">
          <div className="new-comment-form_placeholder" />
          <form className="new-comment-form flex-row" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Write a comment"
              name="comment_input"
              id="comment_input"
              className="comment_input"
              autoComplete="off"
            />
            {/* <button type="submit" className="comment_submit_button">Post</button> */}
          </form>
        </div>
        <div className="form-errors">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div className="song_button_group flex-row">
          {!song?.likes.includes(sessionUser.id) && (
            <button onClick={handle_LikeButtonClick} className="cool_button">
              {" "}
              &#10084; Like
            </button>
          )}
          {song?.likes.includes(sessionUser.id) && (
            <button onClick={handle_UnLikeButtonClick} className="cool_button">
              {" "}
              &#10084; Unlike
            </button>
          )}
          <button onClick={addToClipBoard} className="cool_button">
            Copy Link
          </button>
          <div>
            {clipboardMenu && (
              <div className="dropdown-clipboard">Copied to clipboard</div>
            )}
          </div>
          {sessionUser?.id === song?.user_id && (
            // <button className="cool_button">
            //   <NavLink
            //     to={`/songs/${+song.id}/edit`}
            //     exact={true}
            //     activeClassName="active"
            //   >
            //     Edit
            //   </NavLink>
            // </button>
            <>
              <div onClick={() => setShowEditSongModal(true)} className="cool_button cool_div">
                Edit
              </div>
              {showEditSongModal && (
                <Modal onClose={() => setShowEditSongModal(false)}>
                  <EditSongForm setShowEditSongModal={setShowEditSongModal} />
                </Modal>
              )}
            </>
          )}
          <div className="flex-row">
            <button onClick={showMoreDropdownFnc} className="cool_button">
              More
            </button>
            {showMoreDropdown && (
              <div className="single_song_more_dropdown">
                <p onClick={() => addSongToQueue(song.id)}>Add to queue</p>
                <p onClick={() => setShowPlaylistModal(true)}>
                  Add to playlist
                </p>
              </div>
            )}
          </div>
          {showPlaylistModal && (
            <Modal onClose={() => setShowPlaylistModal(false)}>
              <div className="add_to_playlist_modal_container">
                <AddtoPlaylist song={song} />
              </div>
            </Modal>
          )}
        </div>
      </div>
      <div className="comment-section flex-row">
        <div className="user-badge flex-column">
          <Avatar user={song?.user} />
          <p>{song?.user?.display_name}</p>
        </div>
        <div className="song-details flex-column">
          {/* <div className="song-description">{song?.description}</div> */}
          <div className="song-comments-list flex-column">
            <div className="comments-count flex-row">
              <SpeechBubble />
              <div className="comments-count-text">
                {song?.comments?.length}
                {song?.comments?.length > 1 ? " comments" : " comment"}
              </div>
            </div>
            <div className="comment-cards-list">
              {songs[song?.id]?.comments.map((comment) => (
                <div key={comment.id}>
                  <SingleComment comment={comment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongComments;
