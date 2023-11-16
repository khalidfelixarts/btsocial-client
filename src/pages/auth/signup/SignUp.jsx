import React from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Utils } from "../../../services/utils/utils.service";
import { auth_signUp } from "../../../services/api/auth/auth.service";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import useSessionStorage from "../../../hooks/useSessionStorage";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();
  const [setStoredUsername] = useLocalStorage("username", "set");
  const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
  const [pageReload] = useSessionStorage("pageReload", "set");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const avatarColor = Utils.getAvatarColor();
      const avatarImage = Utils.generateAvatar(
        username.charAt(0).toUpperCase(),
        avatarColor
      );
      const result = await auth_signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage,
      });

      // set logged in to true in local storage
      setLoggedIn(true);

      // set username in local storage
      setStoredUsername(username);

      // dispatch user to redux

      setHasError(false);

      setAlertType("alert-success");

      Utils.dispatchUser(result, pageReload, dispatch, setUser);
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
      navigate("/app/home/feeds");
    }
  }, [loading, user, navigate]);

  return (
    <div className="form-auth__container sign-up">
      <form onSubmit={handlesignUp}>
        {hasError && errorMessage && (
          <div className={`alerts ${alertType}`} role="alert">
            {errorMessage}
          </div>
        )}
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          value={username}
          className="auth_input"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          value={email}
          className="auth_input"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          value={password}
          className="auth_input"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className={`auth__button ${
            !username || !email || !password ? "auth__button__disabled" : ""
          }`}
          disabled={!username || !email || !password}
        >
          {loading ? "Signing up.." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
