import React from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./signin.scss";

const handlesignIn = (e) => {
  e.preventDefault();
  console.log("Handle Signin");
};

const SignIn = ({ forgotPassword, tab }) => {
  return (
    <>
      <div className="form-auth__container sign-in">
        <form onSubmit={handlesignIn}>
          {/* <div className="alerts alert-error" role="alert">
          Error message
        </div> */}
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
          <input className="auth_input" type="email" placeholder="Email" />
          <input
            className="auth_input"
            type="password"
            placeholder="Password"
          />
          <div className="keep__me__signedin__label">
            <label className="checkmark-container">
              <input type="checkbox" />
              Keep me signed in
            </label>
          </div>
          <button className="auth__button">Sign In</button>

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
