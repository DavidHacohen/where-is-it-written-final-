import React, { useState } from 'react';
import "../assets/stylesheets/ContactUs.css";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactUs;
