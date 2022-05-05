import { NavLink } from "react-router-dom";
import Logo from '../Icons/Logo';
import './userpage.css'


function UserNavBar() {

    return (
        <nav className="userNav">
            <NavLink className='navlinks' to="/upload-song" exact={true} activeClassName="active"> Upload </NavLink>
            <NavLink
                className='navlinks logo'
                to="/"
                exact={true}
                activeClassName="active"
            >
                <Logo />
            </NavLink>
            <NavLink className='navlinks' to="/allsongs" exact={true} activeClassName="active"> Songs </NavLink>
        </nav >
    )
}

export default UserNavBar;