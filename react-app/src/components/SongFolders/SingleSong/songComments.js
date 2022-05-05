import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// import SingleSongRow from "./SingleSongRow";

const SongComments = ({ song }) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(content)
    }
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
                            <button type="submit" className="comment_submit_button">Post</button>
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
                <div>
                    <img />
                    <p>Jesus Elizalde</p>
                </div>
                {/* <div>
          <ul>
            similar logic but comments
            {songArr?.map((song, idx) => (
              <li key={idx}>
                <SingleSongRow song={song} idx={idx} />
              </li>
            ))}
          </ul>
        </div> */}
            </div>
        </div>
    );
};

export default SongComments;
