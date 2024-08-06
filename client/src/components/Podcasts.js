// Podcasts.js
import React from "react";
import Discussion from "./Discussions"; // Import the Discussion component
import Nav from "./Nav";
import Podcast from "./Podcast";

const Podcasts = () => {
  return (
    <>
      <Nav />
      <div>
        {/* Podcast 1 */}
        <Podcast
          videoSrc="https://www.youtube.com/embed/8NyXWuZXf98?si=TXtdbTthRJ0bQCqL"
          podcastTitle="איפה כתוב בתורה שצריך לחבוש כיפה"
        />
        <Podcast
          videoSrc="https://www.youtube.com/embed/8NyXWuZXf98?si=TXtdbTthRJ0bQCqL"
          podcastTitle="איפה כתוב בתורה שצריך לחבוש כיפה"
        />

      </div>
    </>
  );
};

export default Podcasts;
