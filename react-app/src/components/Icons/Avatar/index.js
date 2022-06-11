import { NavLink } from "react-router-dom";
import "./Avatar.css";

const Avatar = ({ user, isNotLink }) => {
  const Visual = () => {
    return (
      <div className="avatar">
        {user?.avatar_url ? (
          <img src={user?.avatar_url} alt={user?.display_name} />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
    );
  };

  if (isNotLink) {
    return <Visual />;
  } else {
    return (
      <NavLink to={`/users/${user?.id}`}>
        <Visual />
      </NavLink>
    );
  }
};

export default Avatar;
