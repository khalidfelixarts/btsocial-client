import React, { useState } from "react";
import "./resetPassword.scss";
import "../auth.scss";
import { auth_resetPassword } from "../../../services/api/auth/auth.service";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [searchParams] = useSearchParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { password, confirmPassword };
      const response = await auth_resetPassword(
        searchParams.get("token"),
        body
      );
      console.log(response);
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
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
    <div className="auth__page">
      <div
        className="reset__password__container"
        style={{ height: `${responseMessage ? "400px" : ""}` }}
      >
        <form onSubmit={handleResetPassword}>
          <div className="alert__reset__password">
            {responseMessage && (
              <div className={`alerts ${alertType}`} role="alert">
                {responseMessage}
              </div>
            )}
          </div>
          <h2>Reset Password</h2>
          <span>New Password</span>
          <input
            className="reset__password_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: `${showAlert ? "1px solid #fa9b8a" : ""}`,
            }}
            type="password"
            placeholder="New Password"
          />
          <span>Confirm Password</span>
          <input
            className="reset__password_input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              border: `${
                showAlert || password !== confirmPassword
                  ? "1px solid #fa9b8a"
                  : ""
              }`,
            }}
            type="password"
            placeholder="Confirm Password"
          />
          <button
            className={`reset__password__button ${
              !password || !confirmPassword
                ? "reset__password__button__disabled"
                : ""
            }`}
            disabled={!password || !confirmPassword}
          >
            {loading ? "Resetting Password" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
