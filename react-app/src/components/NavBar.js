import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import Logo from "./Icons/Logo";
import "./NavBar.css";
import UserProfile from "./UserProfile";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks = (
    <nav className="navbar">
      <NavLink
        className="navlinks logo"
        to="/"
        exact={true}
        activeClassName="active"
      >
        <Logo />
      </NavLink>
      <NavLink
        className="navlinks"
        to="/upload-song"
        exact={true}
        activeClassName="active"
      >
        {" "}
        Upload{" "}
      </NavLink>
      <NavLink
        className="navlinks"
        to="/library/songs"
        exact={true}
        activeClassName="active"
      >
        {" "}
        Library{" "}
      </NavLink>
      <UserProfile user={sessionUser} />
    </nav>
  );
  return (
    <>
      {!sessionUser ? (
        <header>
          <nav className="navbar">
            <NavLink className="navlinks" exact to="/">
              {" "}
              Home{" "}
            </NavLink>
            <NavLink className="navlinks" to="/login">
              Log In
            </NavLink>
            <NavLink
              className="navlinks"
              to="/sign-up"
              exact={true}
              activeClassName="active"
            >
              Sign Up
            </NavLink>
          </nav>
        </header>
      ) : (
        <>{sessionLinks}</>
      )}
    </>
  );
};

export default NavBar;
