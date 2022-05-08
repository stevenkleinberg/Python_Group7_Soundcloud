import EditIcon from '../../../Icons/EditIcon';

const EditCommentButton = ({ comment }) => {
    return (
        <div className="button flex-row">
            <div className="edit-icon">
                <EditIcon />
            </div>
            <div className="action-text">Edit</div>
        </div>
    )
};

export default EditCommentButton;
