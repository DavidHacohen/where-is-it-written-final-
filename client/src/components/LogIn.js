import React, { useState } from "react";
import { Await, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../assets/stylesheets/LogIn.css";

const LogIn = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        userName: userName,
        password: password,
      });
      console.log(response.data);
      localStorage.setItem("userName", userName);
      localStorage.setItem("token", response.data["access_token"]);
      if (localStorage.getItem("token") != null) {
        navigate("/homePage");
      }
    } catch (error) {
      setError("invalid user name or password!");
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgetpassword"); 
  };

  return (
    <div className="login-wrapper">
      <h1>:התחבר</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>כתובת מייל</p>
          <input
            type="email"
            name="email"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        <label>
          <p>סיסמה</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            נדרש
          />
        </label>
        <div>
          <button type="submit">אשר</button>
          {error && <div>{error}</div>}
        </div>
      </form>
      <div className="forgot-password-link">
        <p>שכחת סיסמה? <button type="button" onClick={handleForgotPassword}>לחץ כאן</button></p>
      </div>
    </div>
  );
};

export default LogIn;
