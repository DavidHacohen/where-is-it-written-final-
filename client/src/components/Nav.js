import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../assets/stylesheets/nav.css";
import img from "../assets/images/tefillin-1297846.jpg";

const Nav = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName(null);
  };

  return (
    <>
      <nav className="navbar">
        {/* <div className="logo"> /}
{/ <img className="Logo"
// src={img}>
</img> /}
{/ </div> */}
        <ul className="nav_links">
          <li className="li">
            <Link to="/homePage">בית</Link>
            <ul className="dropdown">
              <li>
                <a href="/aboutUs">מי אנחנו</a>
              </li>
              <li>
                <a href="/contactUs">צור קשר</a>
              </li>
            </ul>
          </li>
          <li className="li">
            <Link to="/podcasts">הסכתים</Link>
          </li>
          <li className="li">
            <Link to="/videos">סרטונים</Link>
          </li>
          <li className="li">
            <Link to="/articles">מאמרים</Link>
          </li>
          <li className="li">
            <Link to="/discussions">דיונים</Link>
          </li>
          <li className="li">
            <Link to="/userProfile">פרופיל משתמש</Link>
            <ul className="dropdown">        
                <li>
                  <a href="/signup">הירשם</a>
                </li>
                <li>
                  <a href="/login">התחבר</a>
                </li>        
            </ul>
          </li>
          {userName && (
            <li className="li-userName">
              <span>{userName}</span>
              <button className="li-userNameButton" onClick={handleLogout}>התנתק</button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
