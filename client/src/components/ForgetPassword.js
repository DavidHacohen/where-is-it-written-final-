import React, {useState} from "react";
import axios from 'axios';
import "../assets/stylesheets/ForgetPassword.css"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("try")
        const response = await axios.post('http://127.0.0.1:5000/forgot-password', { email });
        setMessage('If this email is registered, you will receive a password reset link shortly.');
        setError(''); // Clear any previous errors
        navigate("/resetPassword");
      } catch (error) {
        setError('An error occurred while sending the reset link. Please try again.');
        setMessage(''); // Clear any previous messages
      }
    };
  
    return (
      <div className="forgot-password-wrapper">
        <h1>שכחת סיסמה?</h1>
        <form onSubmit={handleSubmit}> 
          <label>
            <p className="p">הכנס בבקשה כתובת מייל:</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">אפס סיסמה</button>
          </div>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  };
  
  export default ForgotPassword;