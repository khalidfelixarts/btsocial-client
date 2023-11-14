import React from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const handlesignUp = (e) => {
  e.preventDefault();
  console.log("Handle Signup");
};

const SignUp = () => {
  return (
    <div className="form-auth__container sign-up">
      <form onSubmit={handlesignUp}>
        {/* <div className="alerts alert-error" role="alert">
          Error message
        </div> */}
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
        <input className="auth_input" type="text" placeholder="Name" />
        <input className="auth_input" type="email" placeholder="Email" />
        <input className="auth_input" type="password" placeholder="Password" />
        <button className="auth__button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
