import React, { useState } from "react";
import { auth_forgotPassword } from "../../../services/api/auth/auth.service";
import "../auth.scss";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await auth_forgotPassword({ email });
      setLoading(false);
      setEmail("");
      setShowAlert(false);
      setAlertType("alert-success");
      setResponseMessage(response?.data?.message);
    } catch (error) {
      setLoading(false);
      setShowAlert(true);
      setAlertType("alert-error");
      setResponseMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className="form-auth__container sign-up">
      <form onSubmit={handleForgotPassword}>
        {responseMessage && (
          <div className={`alerts ${alertType}`} role="alert">
            {responseMessage}
          </div>
        )}
        <h1>Forgot Password</h1>

        <span>Use your email to send password reset link</span>
        <input
          className="auth_input"
          value={email}
          style={{ border: `${showAlert ? "1px solid #fa9b8a" : ""}` }}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <button
          className={`auth__button ${!email ? "auth__button__disabled" : ""}`}
          disabled={!email}
        >
          {loading ? "Sending Email.." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
