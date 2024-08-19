import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import Podcasts from "./components/Podcasts";
import Articles from "./components/Articles";
import Videos from "./components/Videos";
import NoPage from "./components/NoPage";
import UserProfile from "./components/UserProfile";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Discussions from "./components/Discussions";
import About from "./components/About"
import Contact from "./components/ContactUs"
import ForgetPassword from "./components/ForgetPassword"
import ResetPassword from "./components/ResetPassword";
import { UserProvider } from "./components/UserContext";


const App = () => {
  const [user, setUser] = useState(null); // Use state to manage user data

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
