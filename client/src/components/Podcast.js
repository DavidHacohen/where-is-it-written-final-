import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PodcastDiscussion from "./PodcastDiscussion"; // Import the PodcastDiscussion component

const Podcast = ({ podcastId, videoSrc, podcastTitle }) => {
  const [podcastDiscussion, setPodcastDiscussion] = useState()
  const fetchPodcastsDiscussion = (podcastId) => {
    try {
      const response = fetch("http://localhost:5000/PodcastDiscussion/"+podcastId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = response.json();
        console.log(data);
        setPodcastDiscussion(data);
      } else {
        console.error("Failed to fetch podcasts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  useEffect(() => {
    fetchPodcastsDiscussion({podcastId})
  }, []);



  

  return (
    <div
      style={{ textAlign: "center", marginBottom: "2rem", marginTop: "3rem" }}
    >
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ marginBottom: "1rem" }}
      ></iframe>
      {/* PodcastDiscussion component for the specific podcast */}
      <PodcastDiscussion podcast_discussion={podcastDiscussion} />
    </div>
  );
};

Podcast.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  podcastTitle: PropTypes.string.isRequired,
};

export default Podcast;
