import * as React from "react";
import img2 from "../assets/images/pexels-tim-mossholder-974314 (1).jpg"
import Nav from "./Nav";
import "../assets/stylesheets/home.css"
import img from "../assets/images/pexels-tim-mossholder-974314 (1).jpg";
import img3 from "../assets/images/tefillin-1297846.jpg";
import Slideshow from "./Slideshow";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";





function HomePage(props) {
  const navigate = useNavigate();

  const images = [
    img, img3 
  ]

//מגביל את הכניסה רק למי שיש לו טוקן
  // useEffect(() => {
  //   if (localStorage.getItem('token') == null ) {
  //     navigate('/login')
  //   }
  // }, [])
  return (
    <>
     <Nav/ >
      <div className="backgroundContainer">
        <div className="textContainer">
          <h1 className="mainAdding">איפה זה כתוב - מושגים ביהדות</h1>
          <h2 className="subAdding">אתר המספק תכנים יהודים, מקורות, טעמים והיסטוריה של מצוות ומנהגי הדת היהודית,  
          מוגש בקצרה במטרה להנגיש את היהדות למתבונן מבחוץ וגם למי ששומר מצוות ומחפש את המקורות למנהגיו</h2>
        </div>
      </div>
      <div>
          <Slideshow images={images}/>
      </div>
    </>
  );
};

export default HomePage;