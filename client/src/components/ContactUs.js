import React, { useState } from 'react';
import "../assets/stylesheets/ContactUs.css";
import Nav from "./Nav";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    user: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent successfully');
        setFormData({ firstName: '', lastName: '', user: '', message: '' });
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message');
    }
  };

  return (
    <>
    <Nav className="nav" />
    <form onSubmit={handleSubmit}>
      <div>
        <label>שם פרטי:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>שם משפחה:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>אימייל:</label>
        <input type="user" name="user" value={formData.user} onChange={handleChange} required />
      </div>
      <div>
        <label>תוכן ההודעה:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>
      <button type="submit">Send</button>
    </form>
    </>
  );
};

export default ContactUs;
