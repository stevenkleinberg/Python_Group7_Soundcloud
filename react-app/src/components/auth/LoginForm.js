import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./auth.css";
const LoginForm = ({ setShowLoginModal, setShowSignUpModal }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
      return;
    }
    setShowLoginModal(false);
    history.push("/");
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
      return;
    }
    setShowLoginModal(false);
    history.push("/");
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
    <div className="auth_contaner flex-row">
      <div className="auth_form_wrapper">
        <form className="login_form flex-column " onSubmit={onLogin}>
          <h1>Log In</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="form_field">
            <input
              className="field"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form_field">
            <input
              className="field"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="form_field">
            <button className="login_form_btn" type="submit">
              Login
            </button>
          </div>
          <div className="form_field">
            <button
              className="login_form_btn"
              type="submit"
              id="demoUserBtn"
              onClick={demoLogin}
            >
              Demo User
            </button>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <span onClick={toggleModals} className="auth_links">
                Sign Up!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
