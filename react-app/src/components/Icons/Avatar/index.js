import "./Avatar.css";

const Avatar = ({ user }) => {
  console.log(user);
  return (
    <a href={`/users/${user?.id}`}>
      <div className="avatar">
        {user?.avatar_url ? (
          <img src={user?.avatar_url} alt={user?.display_name} />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
    </a>
  );
};

export default Avatar;
