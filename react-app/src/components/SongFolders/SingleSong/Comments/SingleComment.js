import { useSelector } from 'react-redux';
import Avatar from '../../../Icons/Avatar';
import Moment from "react-moment";
import './SingleComment.css';
import EditCommentButton from './EditCommentButton';
import DeleteCommentButton from './DeleteCommentButton';
import { useState } from 'react';

const SingleComment = ({ comment }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [showActions, setShowActions] = useState(false);

    return (
        <div
            onMouseOver={() => setShowActions(true)}
            onMouseOut={() => setShowActions(false)}
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
                        <a className="commenter-name" href={`/users/${comment.user_id}`}>
                            {comment?.user.display_name}
                        </a>
                        {comment?.song_timestamp ? (<span>
                            at <span className="comment-timestamp">
                                {comment?.song_timestamp}
                            </span>
                        </span>) : (
                            null
                        )}
                    </div>
                    <div className="comment-content">
                        {comment?.content}
                    </div>
                </div>
            </div>
            <div className="comment-meta flex-column">
                <Moment fromNow>{comment?.created_at}</Moment>
                <div
                    className={`comment-actions flex-row${showActions ? '' : ' hidden'}`}
                >
                    {comment?.user_id === sessionUser?.id && (
                        <>
                            <div className="comment-edit-button">
                                <EditCommentButton />
                            </div>
                            <div className="comment-delete-button">
                                <DeleteCommentButton />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default SingleComment;
