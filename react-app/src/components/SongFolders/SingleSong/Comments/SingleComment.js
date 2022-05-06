import Avatar from '../../../Icons/Avatar';
import Moment from "react-moment";
import './SingleComment.css';

const SingleComment = ({ comment }) => {
    return (
        <div className="comment-card flex-row">
            <div className="comment-avatar">
                <a href={`/users/${comment.user_id}`}>
                    <Avatar user={comment.user} />
                </a>
            </div>
            <div className="comment-content flex-column">
                <div className="comment-info">
                    <a href={`/users/${comment.user_id}`}>
                        {comment?.user.display_name}
                    </a> at <span className="comment-timestamp">
                        {comment?.song_timestamp}
                    </span>
                </div>
                <div className="comment-content">
                    {comment?.content}
                </div>
            </div>
            <div className="comment-meta flex-column">
                <Moment fromNow>{comment?.created_at}</Moment>
            </div>
        </div>
    )
};

export default SingleComment;
