import React from "react";
import "./resetPassword.scss";
import "../auth.scss";

const ResetPassword = () => {
  return (
    <div className="auth__page">
      <div className="reset__password__container">
        <form action="">
          <h2>Reset Password</h2>
          <span>New Password</span>
          <input
            className="reset__password_input"
            type="password"
            placeholder="New Password"
          />
          <span>Confirm Password</span>
          <input
            className="reset__password_input"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="reset__password__button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
