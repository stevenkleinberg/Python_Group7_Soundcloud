import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import './NavBar.css'
import UserProfile from "./UserProfile";

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks = (
    <nav className="navbar">
      <NavLink className='navlinks' to="/" exact={true} activeClassName="active"> Home </NavLink>
      <NavLink className='navlinks' to="/upload-song" exact={true} activeClassName="active"> Upload </NavLink>
      <NavLink className='navlinks' to="/songs" exact={true} activeClassName="active"> Edit </NavLink>
      <NavLink className='navlinks' to="/users" exact={true} activeClassName="active"> Users </NavLink>
      <NavLink className='navlinks' to="/allsongs" exact={true} activeClassName="active"> Songs </NavLink>
      <UserProfile user={sessionUser} />
    </nav >
  );
  return (
    <>
      {!sessionUser ?
        <header>
          <nav className="navbar">
            <NavLink className='navlinks' exact to="/"> Home </NavLink>
            <NavLink className='navlinks' to="/login">Log In</NavLink>
            <NavLink className='navlinks' to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
          </nav>
        </header>
        : <>
          {sessionLinks}
        </>
      }
    </>
  );
};

export default NavBar;
