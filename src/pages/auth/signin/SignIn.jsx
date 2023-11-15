import React from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import { auth_signIn } from "../../../services/api/auth/auth.service";
import "./signin.scss";

const SignIn = ({ forgotPassword, tab }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();

  const handlesignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth_signIn({ username, password });

      // set logged in to true in local storage
      // set username in local storage
      // dispatch user to redux
      // console.log(result);
      setUser(result.data.user);
      setKeepLoggedIn(keepLoggedIn);
      setHasError(false);
      setAlertType("alert-success");
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType("alert-error");
      setErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) {
      setLoading(false);
      console.log("navigate feeds page from login page");
    }
  }, [loading, user]);

  return (
    <>
      <div className="form-auth__container sign-in">
        <form onSubmit={handlesignIn}>
          {hasError && errorMessage && (
            <div className={`alerts ${alertType}`} role="alert">
              {errorMessage}
            </div>
          )}
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="/" target="_blank" className="icon">
              <FaGooglePlusG />
            </a>
            <a href="/" target="_blank" className="icon">
              <FaFacebookF />
            </a>
            <a href="/" target="_blank" className="icon">
              <FaGithub />
            </a>
            <a href="/" target="_blank" className="icon">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your email password</span>
          <input
            value={username}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            onChange={(e) => setUsername(e.target.value)}
            className="auth_input"
            type="text"
            placeholder="Username"
          />
          <input
            className="auth_input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            type="password"
            placeholder="Password"
          />
          <div className="keep__me__signedin__label">
            <label className="checkmark-container">
              <input
                type="checkbox"
                value={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              />
              Keep me signed in
            </label>
          </div>
          <button
            className={`auth__button ${
              !username || !password ? "auth__button__disabled" : ""
            }`}
            disabled={!username || !password}
          >
            {loading ? "Signing In.." : "Sign In"}
          </button>

          <span
            onClick={() => {
              forgotPassword(true);
              setTimeout(() => {
                tab(true);
              }, 50);
            }}
            className="forgot__password__button"
          >
            Forget Your Password?
          </span>
        </form>
      </div>
    </>
  );
};

export default SignIn;
