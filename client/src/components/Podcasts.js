// Podcasts.js
import React from "react";
import Discussion from "./Discussion"; // Import the Discussion component

const Podcasts = () => {
  return (
    <div>
      <h2>Podcasts</h2>
      {/* Podcast 1 */}
      <div>
        <h3>איפה כתוב בתורה שצריך לחבוש כיפה </h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/8NyXWuZXf98?si=TXtdbTthRJ0bQCqL"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {/* Discussion component for Podcast 1 */}
        <Discussion podcastTitle="איפה כתוב בתורה שצריך לחבוש כיפה" />
      </div>

      {/* Podcast 2 */}
      <div>
        <h3>למה נשים נשואות מכסות את ראשן</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-s_IPhrnGc4?si=LnMP5QjRIjSM30RJ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        {/* Discussion component for Podcast 2 */}
        <Discussion podcastTitle="למה נשים נשואות מכסות את ראשן" />
      </div>
    </div>
  );
};

export default Podcasts;
