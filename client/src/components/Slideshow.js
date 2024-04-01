import React, {useState, useEffect} from "react";
import "../assets/stylesheets/slideshow.css";

const Slideshow = ({images, interval = 3000}) => {
    const [currentImageIndex, setcurrentImageIndex] = useState (0);

    useEffect (() => {
        const intervalId = setInterval (() => {
            setcurrentImageIndex ((prevIndex) => (prevIndex + 1)% images.length)
        }, interval)
    return () => clearInterval(intervalId);
    }, [images, interval]);

    return (
        <div className="slideshow">
            <img src={images[currentImageIndex]}></img>
        </div>
    );

};
export default Slideshow;