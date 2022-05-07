import React from "react";
import { useState } from "react";
import Avatar from "../../Icons/Avatar";
import SingleComment from "./Comments/SingleComment";

const SongComments = ({ song }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content);
  };
  return (
    <div className="song_mainfeed_container">
      <div className="song_mainfeed_top flex-column">
        <div className="commentForm_wrapper  flex-row">
          <div className="commentForm_input_wrapper flex-row">
            <form className="commentForm" onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Write a comment"
                name="comment_input"
                id="comment_input"
                className="comment_input"
              />
              <button type="submit" className="comment_submit_button">
                Post
              </button>
            </form>
          </div>
        </div>
        <div className="song_button_group">
          <button>Like</button>
          <button>Share</button>
          <button>Copy Link</button>
          <button>Edit</button>
          <button>More</button>
        </div>
      </div>
      <div className="flex-row">
        <div className="user-badge flex-column">
          <Avatar user={song?.user} />
          <p>{song?.user?.display_name}</p>
        </div>
        <div className="song-details flex-column">
          <div className="song-description">{song?.description}</div>
          <div className="song-comments-list flex-column">
            <div className="comments-count"></div>
            <div className="comment-cards-list">
              <ul>
                similar logic but comments
                {song?.comments?.map((comment, idx) => (
                  <li key={idx}>
                    <SingleComment comment={comment} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongComments;
