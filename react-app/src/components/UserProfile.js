import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { clearPlayer } from '../store/player';
import { logout } from '../store/session';
import { NavLink } from "react-router-dom";
import { GoChevronDown } from 'react-icons/go'
import { ImUser } from 'react-icons/im';
import { BiLogOut } from 'react-icons/bi';
import { RiHeartsFill } from 'react-icons/ri';
import { RiFoldersFill } from 'react-icons/ri';


function UserProfile({ user }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = user.user_detail
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

            <div
                onClick={openMenu}
                className="user-profile-div"
                style={{ background: `${showMenu ? '#111' : ''}` }}
            >
                <div className="user-profile-dis-avtr flex-row-center"><img src={sessionUser?.avatar_url} alt={sessionUser.display_name} /></div>
                <div className="user-profile-dis-name flex-row-center"> {sessionUser.display_name} <GoChevronDown className="go-icon" /> </div>
            </div>
            <div >

            </div>

            <div className="nav-dropdown">
                {showMenu && (
                    <div className="nav-profile-dropdown">
                        <div className="dropdown-links cursor-pointer">
                            <NavLink to={`/users/${user.id}`} exact={true} className='drop-nav-links'> <ImUser className="prof-icon" /> Profile </NavLink>
                        </div>
                        <div className="dropdown-links cursor-pointer">
                            <NavLink to={`/library/likes`} exact={true} className='drop-nav-links'> <RiHeartsFill className="prof-icon" /> Likes </NavLink>
                        </div>
                        <div className="dropdown-links cursor-pointer">
                            <NavLink to={`/library/playlists`} exact={true} className='drop-nav-links'> <RiFoldersFill className="prof-icon" /> Playlists </NavLink>
                        </div>
                        <div className="cursor-pointer dropdown-links" onClick={onLogout} > <span className='drop-nav-links'> <BiLogOut className="prof-icon" /> Log Out </span>  </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
