import React, { useEffect, useState } from "react";
import "../auth.scss";
import SignIn from "../signin/SignIn";
import SignUp from "../signup/SignUp";
import ForgotPassword from "../forgot-password/ForgotPassword";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthTabs = () => {
  const [isRegisterActive, setRegisterActive] = useState(false);
  const [isForgotPasswordActive, setForgotPasswordActive] = useState(false);

  const keepLoggedIn = useLocalStorage("keepLoggedIn", "get");
  const navigate = useNavigate();

  useEffect(() => {
    if (keepLoggedIn) navigate("/app/home/feeds");
  }, [keepLoggedIn, navigate]);

  return (
    <div className="auth__page">
      <div className="credits">Set Your Heart Ablaze - Khalid</div>
      <div
        className={`auth__container ${isRegisterActive ? "auth__active" : ""}`}
        id="auth__container"
      >
        {isForgotPasswordActive ? <ForgotPassword /> : <SignUp />}

        <SignIn
          tab={setRegisterActive}
          forgotPassword={setForgotPasswordActive}
        />
        <div className="toggle-auth__container">
          <div className="toggle">
            <div
              className={`toggle-panel toggle-left ${
                isRegisterActive ? "auth__active" : ""
              }`}
            >
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button
                className="auth__button hidden"
                onClick={() => {
                  setRegisterActive(false);
                  setTimeout(() => {
                    setForgotPasswordActive(false);
                  }, 500);
                }}
                id="login"
              >
                Sign In
              </button>
            </div>
            <div
              className={`toggle-panel toggle-right ${
                isRegisterActive ? "" : "auth__active"
              }`}
            >
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of the site
                features
              </p>
              <button
                className="auth__button hidden"
                onClick={() => setRegisterActive(true)}
                id="register"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
