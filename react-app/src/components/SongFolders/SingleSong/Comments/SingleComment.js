import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../Icons/Avatar';
import Moment from "react-moment";
import './SingleComment.css';
import EditCommentButton from './EditCommentButton';
import DeleteCommentButton from './DeleteCommentButton';
import { editComment } from '../../../../store/comment';

const SingleComment = ({ comment }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [showActions, setShowActions] = useState(false);
    const [showContentDisplay, setShowContentDisplay] = useState(true);
    const [showContentEdit, setShowContentEdit] = useState(false);
    const [content, setContent] = useState(comment?.content);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    const commentCardMouseOver = e => {
        if (!showContentEdit) {
            setShowActions(true);
        }
    }

    const commentCardMouseOut = e => {
        if (!showContentEdit) {
            setShowActions(false);
        }
    }

    const clickEdit = e => {
        setShowContentDisplay(false);
        setShowContentEdit(true);
        setShowActions(false);
    }

    const handleEdit = async (ev) => {
        ev.preventDefault();
        const newComment = {
            id: comment.id,
            user_id: sessionUser.id,
            content,
        }
        console.log(newComment);
        const data = await dispatch(editComment(newComment));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setShowContentEdit(false);
            setShowContentDisplay(true);
        }
    };

    return (
        <div
            onMouseOver={commentCardMouseOver}
            onMouseOut={commentCardMouseOut}
            className="comment-card flex-row"
        >
            <div className="comment-body flex-row">
                <div className="comment-avatar">
                    <a href={`/users/${comment.user_id}`}>
                        <Avatar user={comment.user} />
                    </a>
                </div>
                <div className="comment-text flex-column">
                    <div className="comment-info">
                        {comment.user_id === sessionUser.id ? (
                            <span className="commenter-name">You</span>
                        ) : (
                            <a className="commenter-name" href={`/users/${comment.user_id}`}>
                                {comment?.user.display_name}
                            </a>
                        )}
                        {comment?.song_timestamp ? (<span>
                            at <span className="comment-timestamp">
                                {comment?.song_timestamp}
                            </span>
                        </span>) : (
                            null
                        )}
                    </div>
                    <div className="comment-content">
                        <div
                            className={`content-display${showContentDisplay ? '' : ' hidden'}`}
                        >
                            {comment?.content}
                        </div>
                        <form
                            onSubmit={handleEdit}
                            className={`content-edit${showContentEdit ? '' : ' hidden'}`}
                        >
                            <input
                                className="content-field"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                required
                            />
                        </form>
                        <div className="form-errors">
                            {errors.map((error, idx) => (
                                <div key={idx}>{error}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-meta flex-column">
                <Moment fromNow>{comment?.updated_at}</Moment>
                <div
                    className={`comment-actions flex-row${showActions ? '' : ' hidden'}`}
                >
                    {comment?.user_id === sessionUser?.id && (
                        <>
                            <div
                                onClick={clickEdit}
                                className="comment-edit-button"
                            >
                                <EditCommentButton />
                            </div>
                            <div className="comment-delete-button">
                                <DeleteCommentButton />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
};

export default SingleComment;
