import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { createDetail } from "../../store/user-details";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [display_name, setDisplayName] = useState("");
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
      } else {
        const formData = new FormData();
        formData.append("id", sessionUser.id);
        const detail = await dispatch(createDetail(formData));
      }
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

  if (user) {
    return <Redirect to="/" />;
  }

  return (

    <>
      <div className="authContainer">
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              placeholder="email"
              className="field userPage"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div>
            <input
              placeholder="password"
              className="field userPage"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              className="field userPage"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='confirm password'
            ></input>
          </div>
          <button className='btn' type="submit">Sign Up</button>
        </form>
      </div>

    </>
  );
};

export default SignUpForm;
