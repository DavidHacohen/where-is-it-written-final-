import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Podcast from "./Podcast";
import "../assets/stylesheets/PodcastDiscussion.css"; 

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://localhost:5000/Podcasts");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPodcasts(data);
        } else {
          console.error("Failed to fetch podcasts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []); 
  return (
    <>
      <Nav />
      <div className="map">
        {podcasts.map((podcast) => (
          <Podcast
            key={podcast.PodcastId}
            podcastId={podcast.PodcastId}
            title={podcast.PodcastTitle}
            videoSrc={podcast.VideoSrc}
          />
        ))}
      </div>
    </>
  );
};

export default Podcasts;
