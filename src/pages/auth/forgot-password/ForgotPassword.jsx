import React from "react";
import "../auth.scss";
import "./forgotPassword.scss";

const handlesignUp = (e) => {
  e.preventDefault();
  console.log("Handle Signup");
};

const ForgotPassword = () => {
  return (
    <div className="form-auth__container sign-up">
      <form onSubmit={handlesignUp}>
        {/* <div className="alerts alert-error" role="alert">
          Error message
        </div> */}
        <h1>Forgot Password</h1>

        <span>Use your email to send password reset link</span>
        <input className="auth_input" type="email" placeholder="Email" />
        <button className="auth__button">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
