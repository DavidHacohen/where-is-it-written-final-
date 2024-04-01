import * as React from "react";
import img2 from "../assets/images/pexels-tim-mossholder-974314 (1).jpg"
import Nav from "./Nav";
import "../assets/stylesheets/home.css"
import img from "../assets/images/pexels-tim-mossholder-974314 (1).jpg";
import img3 from "../assets/images/tefillin-1297846.jpg";
import Slideshow from "./Slideshow";




function Home(props) {
  const images = [
    img, img3 
  ]
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="backgroundContainer">
        <div className="textContainer">
          <h1 className="mainAdding">איפה זה כתוב - מושגים ביהדות</h1>
          <h2 className="subAdding">בלללללללללללללללללללללללללללללללללללל</h2>
        </div>
      </div>
      <div>
          <Slideshow images={images}/>
      </div>
    </>
  );
  console.log("login")

}

export default Home;