import React, { useState } from 'react';
import "../assets/stylesheets/ContactUs.css";
import Nav from "./Nav";


const ContactUs = () => {
  const [firstName1, setfirstName1] = useState("")
  const [lastName1, setlastName1] = useState("")
  const [user1, setuser1] = useState("")
  const [message1, setmessage1] = useState("")



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "firstName1": firstName1,
      "lastName1": lastName1,
      "user1": user1,
      "message1": message1 
    }
    console.log(data)
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Message sent successfully');
  
        // setFormData({ firstName1: '', lastName1: '', user1: '', message1: '' });
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
        <input type="text" name="firstName" value={firstName1} onChange= {(e) => {setfirstName1(e.target.value)}} required />
      </div>
      <div>
        <label>שם משפחה:</label>
        <input type="text" name="lastName" value={lastName1} onChange= {(e) => {setlastName1(e.target.value)}}required />
      </div>
      <div>
        <label>אימייל:</label>
        <input type="user" name="user" value={user1} onChange= {(e) => {setuser1(e.target.value)}} required />
      </div>
      <div>
        <label>תוכן ההודעה:</label>
        <textarea name="message" value={message1} onChange= {(e) => {setmessage1(e.target.value)}} required />
      </div>
      <button type="submit">Send</button>
    </form>
    </>
  );
};

export default ContactUs;
