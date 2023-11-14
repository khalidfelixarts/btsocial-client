import React, { useState } from "react";
import "./authTabs.scss";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const AuthTabs = () => {
  const [isRegisterActive, setRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setRegisterActive(true);
  };

  const handleLoginClick = () => {
    setRegisterActive(false);
  };

  const handlesignUp = (e) => {
    e.preventDefault();
    console.log("Handle Signup");
  };

  const handlesignIn = (e) => {
    e.preventDefault();
    console.log("Handle Signin");
  };

  return (
    <div class={`container ${isRegisterActive ? "active" : ""}`} id="container">
      <div class="form-container sign-up">
        <form onSubmit={handlesignUp}>
          <h1>Create Account</h1>
          <div class="social-icons">
            <a href="/" target="_blank" class="icon">
              <FaGooglePlusG />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaFacebookF />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaGithub />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form onSubmit={handlesignIn}>
          <h1>Sign In</h1>
          <div class="social-icons">
            <a href="/" target="_blank" class="icon">
              <FaGooglePlusG />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaFacebookF />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaGithub />
            </a>
            <a href="/" target="_blank" class="icon">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="/" target="_blank">
            Forget Your Password?
          </a>
          <button>Sign In</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div
            class={`toggle-panel toggle-left ${
              isRegisterActive ? "active" : ""
            }`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button class="hidden" onClick={handleLoginClick} id="login">
              Sign In
            </button>
          </div>
          <div
            class={`toggle-panel toggle-right ${
              isRegisterActive ? "" : "active"
            }`}
          >
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of the site
              features
            </p>
            <button class="hidden" onClick={handleRegisterClick} id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
