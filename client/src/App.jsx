import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
import Forum from "./components/Forum";
import Discussion from "./components/Discussion";
import { UserProvider } from './components/UserContext';


const App = () => {
  const [user, setUser] = useState(null); // Use state to manage user data

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
