import './Avatar.css';

const Avatar = ({ user }) => {
    return (
        <a href={`/users/${user.id}`}>
            <div className="avatar">
                {user.avatar_url ? (
                    <img src={user.avatar_url} />
                ) : (
                    <div className="avatar-placeholder" />
                )}
            </div>
        </a>
    )
};

export default Avatar;
