import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const registerUser = async (
  userData,
  handleRegistrationSuccess,
  setErrorMessage
) => {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful, proceed to login
      loginUser(userData, handleRegistrationSuccess, setErrorMessage);
    } else {
      setErrorMessage(data.message);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const loginUser = async (userData, handleLoginSuccess, setErrorMessage) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if ("access_token" in data) {
      // Save the token in a secure way (e.g., HTTP-only cookie)
      document.cookie = `access_token=${data.access_token}; path=/`;

      // Handle successful login
      handleLoginSuccess();
      console.log("new if");

    } else  {
      setErrorMessage(data.message);
      console.log("new els");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistrationSuccess = () => {
    alert("Registration and login successful!");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData, handleRegistrationSuccess, setErrorMessage);
  };

  return (
    <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Registration Form</h2>
      <form
        action="/action_page.php"
        method="get"
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <label>
          Your first name:
          <input
            id="FirstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Your last name:
          <input
            id="LastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        Your email:
        <label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        Enter a new password:
        <label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
