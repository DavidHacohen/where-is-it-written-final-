import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/stylesheets/PodcastDiscussion.css"; // Import the CSS file

const PodcastDiscussion = ({ podcastId, podcast_discussion }) => {
  const [discussions, setDiscussions] = useState(podcast_discussion || []);
  const [newDiscussion, setNewDiscussion] = useState("");
  const userName = localStorage.getItem('userName')
  console.log(podcastId)

  // Function to handle adding a new discussion
  const handleAddDiscussion = async () => {
    if (!newDiscussion || !userName || !podcastId) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const discussionData = {
      PodcastId: podcastId,
      DiscussionText: newDiscussion,
      Username: userName
    };
    console.log(discussionData)

    try {
      const response = await fetch("http://localhost:5000/addPodcastDiscussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discussionData),
      });

      if (response.ok) {
        const result = await response.json() 
        const addedDiscussion = {
          discussion_text: newDiscussion,
          first_name: result.first_name,
          last_name: result.last_name
        };
        // Update the discussions state with the new discussion
        setDiscussions([addedDiscussion, ...discussions]);
        setNewDiscussion("");
        alert("Discussion added successfully!");
      } else {
        console.error("Failed to add discussion:", response.statusText);
        alert("Failed to add discussion.");
      }
    } catch (error) {
      console.error("Error adding discussion:", error);
      alert("Error occurred while adding discussion.");
    }
  };

  return (
    <div className="discussions-container">
      <div className="discussion-input">
        <textarea
          className="inputField"
          type="text"
          rows={4}
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="כתוב תגובה..." 
        />
        <button className="addButton" onClick={handleAddDiscussion}>הוסף תגובה</button>
      </div>
      <ul className="discussion-list">
        {podcast_discussion.map((podcast) => (
          podcast.discussions.map((discussion, discussionIndex) => (
            <li key={discussion.discussion_id} className="discussion-item_podcasts">
              <div className="discussion-text_podcasts">
                <h3>{discussion.discussion_text}</h3>
                <div className="discussion-author">
                  <span>
                    {discussion.first_name} {discussion.last_name}
                  </span>
                </div>
                <div className="discussion-date">
                  <span>
                    {discussion.created_at}
                  </span>
                </div>
              </div>
              <ul className="comment-list">
                {discussion.comments &&
                  discussion.comments.map((comment) => (
                    <li key={comment.comment_id} className="comment-item">
                      <div className="comment-text">
                        <h5>{comment.comment_text}</h5>
                        <div className="comment-author">
                          <span>
                            {comment.first_name} {comment.last_name}
                          </span>
                        </div>
                        <div className="comment-date">
                          <span>
                            {discussion.created_at}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
          ))
        ))}
      </ul>
    </div>
  );
};

PodcastDiscussion.propTypes = {
  podcast_discussion: PropTypes.array.isRequired, // Updated to reflect the expected prop type
};

export default PodcastDiscussion;