import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PodcastDiscussion from "./PodcastDiscussion"; // Import the PodcastDiscussion component

const Podcast = ({ podcastId, videoSrc, podcastTitle }) => {
  const [podcastDiscussion, setPodcastDiscussion] = useState();

  const fetchPodcastsDiscussion = async (podcastId) => {
    // Check if podcastId is valid before making the API call
    if (!podcastId) return;

    try {
      const response = await fetch(`http://localhost:5000/PodcastDiscussion?PodcastId=${podcastId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPodcastDiscussion(data);
      } else {
        console.error("Failed to fetch podcast discussions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching podcast discussions:", error);
    }
  };

  useEffect(() => {
    // Only fetch discussions if podcastId is valid
    if (podcastId) {
      fetchPodcastsDiscussion(podcastId);
    }
  }, [podcastId]); // Re-run when podcastId changes

  

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
      {podcastDiscussion ? (
        <PodcastDiscussion podcast_discussion={podcastDiscussion} />
      ) : (
        <p>Loading discussions...</p> // Display a loading message or fallback UI
      )}
    </div>
  );
};

Podcast.propTypes = {
  podcastId: PropTypes.string.isRequired, // Ensure that podcastId is required and should be a string
  videoSrc: PropTypes.string.isRequired,
  podcastTitle: PropTypes.string.isRequired,
};

export default Podcast;