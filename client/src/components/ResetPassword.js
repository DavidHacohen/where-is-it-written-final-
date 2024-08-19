import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/stylesheets/ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/reset-password/${token}`, {
        password,
      });
      setMessage("Password reset successfully");
      navigate("/login");
    } catch (error) {
      setMessage("Failed to reset password. The link may be invalid or expired.");
    }
  };

  return (
    <div className="reset-password-wrapper">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>New Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Confirm New Password</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ResetPassword;
