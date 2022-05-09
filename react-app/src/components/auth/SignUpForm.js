import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./auth.css";

const SignUpForm = ({ setShowSignUpModal, setShowLoginModal }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(email, password));
      if (data) {
        setErrors(data);
        return;
      }
      setShowSignUpModal(false);
      history.push("/");
    }
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
            <h1>Sign Up</h1>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="form_field">
              <input
                placeholder="email"
                className="field "
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="form_field">
              <input
                placeholder="password"
                className="field "
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className="form_field">
              <input
                className="field "
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="confirm password"
              ></input>
            </div>
            <div className="form_field">
              <button className="login_form_btn" type="submit">
                Sign Up
              </button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <span onClick={toggleModals} className="auth_links">
                  Login!
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
