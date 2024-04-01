import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../assets/stylesheets/nav.css"
import img from "../assets/images/tefillin-1297846.jpg"

const Nav = () =>{
  return (
    <>
    <nav className="navbar">
      <div className="logo">
      {/* <img className="Logo"
      // src={img}>
      </img> */}
      </div>
        <ul className="nav_links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/podcasts">Podcasts</Link>
        </li>
        <li>
          <Link to="/videos">Videos</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/discussion">Discussions</Link>
        </li>
        <li>
          <Link to="/userProfile">UserProfile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        </ul>
    </nav>
    <Outlet />
    </>
  )
}
export default Nav