import { NavLink } from "react-router-dom";
import "./Avatar.css";

const Avatar = ({ user }) => {
  return (
    <NavLink to={`/users/${user?.id}`}>
      <div className="avatar">
        {user?.avatar_url ? (
          <img src={user?.avatar_url} alt={user?.display_name} />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
    </NavLink>
  );
};

export default Avatar;
