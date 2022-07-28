import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { FaUserAlt } from 'react-icons/fa';
import { IoLogOutSharp } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';

import "./auth.css";
const LoginForm = ({ setShowLoginModal, setShowSignUpModal }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // const formatError = (errorText) => {
  //   if (errorText.includes(" : ")) {
  //     let array = errorText.split(" : This field");
  //     let firstWord = array[0].split("");
  //     firstWord[0] = firstWord[0].toUpperCase();
  //     firstWord = firstWord.join("");
  //     return `${firstWord}${array[1]}`;
  //   } else if (errorText.includes("csrf")) {
  //     return 'An error occurred. Please try again.';
  //   } else {
  //     return errorText;
  //   }
  // };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
      return;
    }

    return () => {
      history.push("/");
      setShowLoginModal(false);
    };
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
      return;
    }
    history.push("/");
    setShowLoginModal(false);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const toggleModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  return (
    <div className="flex-row">
      <div className="">
        <form className="login_form flex-column" onSubmit={onLogin}>
          <IoCloseOutline className="close-login-icon" onClick={() => setShowLoginModal(false)} />

          <button
            className="login_form_btn cursor-pointer or-shdw-hov"
            type="submit"
            onClick={demoLogin}
          >
            <FaUserAlt /> Continue with Demo User
          </button>
          <button
            className="login_form_btn cursor-pointer toggle-sign-up or-shdw-hov "
            type="submit"
            onClick={toggleModals}
          >
            <IoLogOutSharp className="proF-icon" /> Create Account Here
          </button>

          <div className="half-Div">
            <div className="half-line"></div>
            <h3>or</h3>
            <div className="half-line"></div>
          </div>

          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error-text" >{error}</div>
            ))}
          </div>

          <div className="form_field">
            <input
              className="field"
              name="email"
              type="text"
              placeholder="Your email address "
              value={email}
              onChange={updateEmail}
              style={{ marginBottom: '10px' }}
              required
            />
          </div>
          <div className="form_field">
            <input
              className="field"
              name="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={updatePassword}
              required
            />
          </div>

          <div className="form_button flex-row">
            <button
              className="login_form_btn cursor-pointer or-shdw-hov cnt-login"
              type="submit">
              Continue to SoundTown
            </button>
          </div>
          <div className="form_button flex-row">

          </div>
          <div className="priv-tag-div">
            <p className="priv-tag">
              When registering, you agree that we will not use your provided
              data from the registration and we won't send you notifications on
              our products and services. You can not unsubscribe from our non-existent
              notifications at this time in your settings. For non-existent additional
              info please do not refer to our fake <span style={{ color: 'blue', cursor: 'not-allowed' }}>Privacy Policy</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
