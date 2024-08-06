// PodcastDiscussion.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/stylesheets/PodcastDiscussion.css"; // Import the CSS file

const PodcastDiscussion = ({ podcastTitle }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [remainingChars, setRemainingChars] = useState(0);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch("http://localhost:5000/PodcastDiscussion");
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      } else {
        console.error("Failed to fetch discussions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleAddDiscussion = async () => {
    if (localStorage.getItem("token") != null) {
      const userName = localStorage.getItem("userName");
      if (newDiscussion.trim() !== "") {
        try {
          const response = await fetch("http://localhost:5000/discussions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              discussion_text: newDiscussion,
              userName: userName,
            }),
          });

          if (response.ok) {
            fetchDiscussions();
          } else {
            const data = await response.json();
            console.error("Failed to add discussion: ${data.message}");
          }
        } catch (error) {
          console.error("Error adding discussion:", error);
        }

        setNewDiscussion("");
      }
    } else {
      alert("עליך להתחבר כדי להגיב!");
    }
  };

  const handleAddComment = async (discussionIndex, commentText) => {
    if (localStorage.getItem("token") != null) {
      const discussionId = discussionIndex;
      const userName = localStorage.getItem("userName");
      try {
        const response = await fetch(
          "http://localhost:5000/discussions/${discussionId}/comments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: commentText, username: userName }),
          }
        );

        if (response.ok) {
          fetchDiscussions();
          const data = await response.json();

          // Update discussions state to reflect new comment ID
          const updatedDiscussions = [...discussions];
          const updatedDiscussion = { ...updatedDiscussions[discussionIndex] };
          if (!updatedDiscussion.comments) {
            updatedDiscussion.comments = []; // Initialize comments array if it doesn't exist
          }
          updatedDiscussion.comments.push({
            id: data.comment_id, // Include the received comment ID
            text: commentText,
          });
          updatedDiscussions[discussionIndex] = updatedDiscussion;
          setDiscussions(updatedDiscussions);
        } else {
          const data = await response.json();
          console.error("Failed to add comment: ${data.message}");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }

      // Clear the comment input after adding the comment
      const newInputs = { ...commentInputs };
      newInputs[discussionId] = "";
      setCommentInputs(newInputs);
      setRemainingChars(100);
    } else {
      alert("עליך להתחבר כדי להגיב!");
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
          placeholder="Start a new discussion"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddDiscussion();
            }
          }}
        />
        <button onClick={handleAddDiscussion}>Add Discussion</button>
      </div>
      <ul className="discussion-list">
        {discussions.map((discussion, discussionIndex) => (
          <li key={discussion.discussion_id} className="discussion-item">
            <div className="discussion-text">
              <h3>{discussion.discussion_text}</h3>
              <div className="discussion-author">
                <span>
                  {discussion.first_name} {discussion.last_name}
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
                    </div>
                  </li>
                ))}
            </ul>
            <div className="comment-input">
              <textarea
                className="commentField"
                rows={2}
                type="text"
                maxLength={100}
                placeholder="Add a comment..."
                value={commentInputs[discussion.discussion_id] || ""}
                onChange={(e) => {
                  const newInputs = { ...commentInputs };
                  const value = e.target.value;
                  if (value.length <= 100) {
                    newInputs[discussion.discussion_id] = value;
                    setCommentInputs(newInputs);
                    setRemainingChars(100 - value.length);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(
                      discussion.discussion_id,
                      commentInputs[discussion.discussion_id]
                    );
                  }
                }}
              />
              <div>
                {remainingChars}/{100} characters remaining
              </div>
              <button
                onClick={() =>
                  handleAddComment(
                    discussion.discussion_id,
                    commentInputs[discussion.discussion_id]
                  )
                }
              >
                Post
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

PodcastDiscussion.propTypes = {
  podcastTitle: PropTypes.string.isRequired,
};

export default PodcastDiscussion;