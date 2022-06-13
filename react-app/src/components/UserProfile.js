import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { clearPlayer } from '../store/player';
import { logout } from '../store/session';
import { NavLink } from "react-router-dom";
import Avatar from "./Icons/Avatar";


function UserProfile({ user }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const onLogout = () => {
        dispatch(clearPlayer());
        dispatch(logout());
    };

    return (
        <div>
            <button className="cursor-pointer userProfileBtn" onClick={openMenu}>
                <Avatar user={user} isNotLink={true} />
            </button>
            <div className="dropdown">
                {showMenu && (
                    <div className="profile-dropdown">
                        <div className="dropdown-links cursor-pointer">
                            <NavLink to={`/users/${user.id}`} exact={true}> Profile </NavLink>
                        </div>
                        <div className="cursor-pointer dropdown-links" onClick={onLogout}>Log Out</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
