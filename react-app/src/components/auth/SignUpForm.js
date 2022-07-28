import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { createDetail } from "../../store/user-details";
import { FaUserAlt } from 'react-icons/fa';
import { IoLogOutSharp } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import { login } from "../../store/session";
import "./auth.css";

const SignUpForm = ({ setShowSignUpModal, setShowLoginModal }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(email, password));
      if (!data.sucess) {
        setErrors(data);
        return;
      }

      const displayname = "add name";
      const formData = new FormData();
      formData.append("user_id", data.sucess.id);
      formData.append("display_name", displayname);
      formData.append(
        "avatar_url",
        "https://avatarfiles.alphacoders.com/194/thumb-194221.jpg"
      );
      formData.append(
        "banner_url",
        "https://i.ytimg.com/vi/zob-2dpRtH0/maxresdefault.jpg"
      );
      const res = await dispatch(createDetail(formData));
      if (res) {
        return () => {
          history.push("/");
          setShowSignUpModal(false);
        };
      }
    }
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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const toggleModals = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="auth_contaner flex-row">
        <div className="auth_form_wrapper">
          <form className="signup_form flex-column " onSubmit={onSignUp}>
            <IoCloseOutline className="close-login-icon" onClick={() => setShowSignUpModal(false)} />

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
              <IoLogOutSharp className="proF-icon" /> Continue to Log In
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
                placeholder="email"
                style={{ marginBottom: '10px' }}

                className="field"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                required
              ></input>
            </div>
            <div className="form_field">
              <input
                placeholder="password"
                style={{ marginBottom: '10px' }}

                className="field"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                required
              ></input>
            </div>
            <div className="form_field">
              <input
                className="field"

                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="confirm password"
              ></input>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind} className="error-text">{error}</div>
              ))}
            </div>
            <div className="form_button flex-row">
              <button className="login_form_btn cursor-pointer cnt-login or-shdw-hov" type="submit">
                Accept {'&'} Continue
              </button>
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
    </>
  );
};

export default SignUpForm;
