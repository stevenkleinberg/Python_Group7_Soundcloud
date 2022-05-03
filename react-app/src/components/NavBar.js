import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import './NavBar.css'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks = (
    <nav>
      <ul className='nav_links'>
        <li className='links'> <NavLink to="/" exact={true} activeClassName="active"> Home </NavLink></li>
        <li className='links'><NavLink to="/upload-song" exact={true} activeClassName="active"> Upload </NavLink> </li>
        <li className='links'><NavLink to="/songs" exact={true} activeClassName="active"> Edit </NavLink>   </li>
        <li className='links'>  <NavLink to="/users" exact={true} activeClassName="active"> Users </NavLink> </li>
        <li className='links'>  <NavLink to="/allsongs" exact={true} activeClassName="active"> Songs </NavLink> </li>
        <li>
          <div className='profile'>
            <LogoutButton />
          </div>
        </li>
      </ul>
    </nav>
  );
  return (
    <>
      {!sessionUser ?
        <header>
          <nav >
            <ul className='nav_links'>
              <li><NavLink exact to="/"> Home </NavLink></li>
              <li><NavLink to="/login">Log In</NavLink></li>
              <li><NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink></li>
            </ul>
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
