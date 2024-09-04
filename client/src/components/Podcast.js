import React from "react";
import PropTypes from "prop-types";
import PodcastDiscussion from "./PodcastDiscussion"; // Import the PodcastDiscussion component


const Podcast = ({ videoSrc, podcastTitle }) => {
  // console.log({PodcastId})
    // try {
    //   const response = await fetch("http://localhost:5000/Podcasts");
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     console.error("Failed to fetch podcasts:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error fetching podcasts:", error);
    // }

 
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem", marginTop: "3rem" }}>
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
      <PodcastDiscussion podcastTitle={podcastTitle} />
    </div>
  );
};

Podcast.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  podcastTitle: PropTypes.string.isRequired,
};

export default Podcast;