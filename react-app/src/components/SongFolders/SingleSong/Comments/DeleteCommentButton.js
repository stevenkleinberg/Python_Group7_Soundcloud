const DeleteCommentButton = ({ comment }) => {
    return (
        <div className="button flex-row">
            <div className="delete-icon" />
            <div className="action-text">Delete</div>
        </div>
    )
};

export default DeleteCommentButton;
