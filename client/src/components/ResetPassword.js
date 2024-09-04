import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/stylesheets/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/reset-password`, {
        email,
        temp_password: tempPassword,
        new_password: newPassword,
      });
      setMessage("Password reset successfully");
      navigate("/login");
    } catch (error) {
      setMessage("Failed to reset password. The temporary password may be invalid..");
    }
  };

  return (
    <div className="reset-password-wrapper">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>אימייל</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
        <p>Temporary Password</p>
          <input
            type="text"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <p>New Password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
