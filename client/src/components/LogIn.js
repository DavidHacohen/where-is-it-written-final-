import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginUser = async (userData, handleLoginSuccess, updateUser, setErrorMessage) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      document.cookie = `access_token=${data.access_token}; path=/`;
      handleLoginSuccess();
    } else {
      console.error(`Login failed with status ${response.status}: ${data.message}`);
      setErrorMessage(data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setErrorMessage('An unexpected error occurred.');
  }
};

function LogIn({ updateUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSuccess = () => {
    alert('Login successful!');
    navigate('/');
  };

  const setErrorMessage = () => {
    alert('Login faild!');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData, handleLoginSuccess, updateUser, setErrorMessage);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
