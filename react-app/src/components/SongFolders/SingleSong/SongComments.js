import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Icons/Avatar";
import SpeechBubble from "../../Icons/SpeechBubble";
import SingleComment from './Comments/SingleComment';
import { NavLink } from "react-router-dom";
import { createComment, getCommentsBySongId } from "../../../store/comment";
import { likeSong, unlikeSong } from "../../../store/song";

const SongComments = ({ song }) => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (song) {
        await dispatch(getCommentsBySongId(song?.id));
      }
    })();
  }, [dispatch]);

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
      setContent('');
    }

  }
  const handle_LikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("song_id", song.id);
    const likedSong = await dispatch(likeSong(formData));
  };
  const handle_UnLikeButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("song_id", song.id);
    const unlikedSong = await dispatch(unlikeSong(formData));
  };

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
            />
            {/* <button type="submit" className="comment_submit_button">Post</button> */}
          </form>
        </div>
        <div className="form-errors">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div className="song_button_group">
          {!song?.likes.includes(sessionUser.id) && (
            <button  onClick={handle_LikeButtonClick}>  &#10084; Like</button>
          )}
          {song?.likes.includes(sessionUser.id) && (
            <button onClick={handle_UnLikeButtonClick}>  &#10084; Unlike</button>
          )}
          <button>Copy Link</button>
          {sessionUser?.id === song?.user_id && (
            <button><NavLink to={`/songs/${+song.id}/edit`} exact={true} activeClassName="active">
            Edit
        </NavLink></button>
          )}
          <button>More</button>
        </div>
      </div>
      <div className="flex-row">
        <div className="user-badge flex-column">
          <Avatar user={song?.user} />
          <p>{song?.user?.display_name}</p>
        </div>
        <div className="song-details flex-column">
          <div className="song-description">
            {song?.description}
          </div>
          <div className="song-comments-list flex-column">
            <div className="comments-count flex-row">
              <SpeechBubble />
              <div className="comments-count-text">{song?.comments?.length}
                {song?.comments?.length > 1 ? ' comments' : ' comment'}</div>
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
