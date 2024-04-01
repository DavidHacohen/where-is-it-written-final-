// Forums.js
import React from 'react';
import Discussion from './Discussion';

const Forums = () => {
  // Fetch discussions from a common data source or context
  const allDiscussions = [
    { podcastTitle: 'Podcast Episode 1', topics: ['Topic 1', 'Topic 2'] },
    { podcastTitle: 'Podcast Episode 2', topics: ['Topic 3', 'Topic 4'] },
    // Add more discussions as needed
  ];

  return (
    <div>
      <h2>Forums</h2>
      {allDiscussions.map((discussion, index) => (
        <Discussion key={index} podcastTitle={discussion.podcastTitle} />
      ))}
    </div>
  );
};

export default Forums;
