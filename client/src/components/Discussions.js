import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import "../assets/stylesheets/Discussions.css";

const Discussions = ({ podcastTitle }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [commentInputs, setCommentInputs] = useState({
    id:null,
    discussion_text:''
  });


  const fetchDiscussions = async () => {
    try {
      const response = await fetch("http://localhost:5000/discussions");
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
    if (newDiscussion.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/discussions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ discussion_text: newDiscussion, comments: [] }),
        });

        if (response.ok) {
          fetchDiscussions();

        } else {
          const data = await response.json();
          console.error(`Failed to add discussion: ${data.message}`);
        }
      } catch (error) {
        console.error("Error adding discussion:", error);
      }

      setNewDiscussion("");
    }
  };

  const handleAddComment = async (discussionIndex, commentText, parentCommentId = null) => {
    try {
      const response = await fetch(`http://localhost:5000/discussions/${discussions[discussionIndex].discussion_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Comment added successfully. Comment ID:", data.comment_id, "Discussion ID:", discussions[discussionIndex].discussion_id);
        
        // Update discussions state to reflect new comment ID
        const updatedDiscussions = [...discussions];
        const updatedDiscussion = { ...updatedDiscussions[discussionIndex] };
      if (!updatedDiscussion.comments) {
        updatedDiscussion.comments = []; // Initialize comments array if it doesn't exist
      }
      updatedDiscussion.comments.push({
        id: data.comment_id, // Include the received comment ID
        text: commentText,
        // Include other relevant comment data
      });
      updatedDiscussions[discussionIndex] = updatedDiscussion;
      setDiscussions(updatedDiscussions);
    } else {
      const data = await response.json();
      console.error(`Failed to add comment: ${data.message}`);
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }

  // Clear the comment input after adding the comment
  const newInputs = { ...commentInputs };
  newInputs[discussionIndex] = "";
  setCommentInputs(newInputs);
};



return (
  <>
    <Nav className="nav" />
    <div className="discussions-container">
      <div className="discussion-input">
        <input
          type="text"
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="התחל דיון חדש"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddDiscussion();
            }
          }}
        />
        <button onClick={handleAddDiscussion}>הוסף דיון</button>
      </div>
      <ul className="discussion-list">
        {discussions.map((discussion, discussionIndex) => (
          <li key={discussionIndex} className="discussion-item">
            <div className="discussion-text">{discussion.discussion_text}</div>
            <ul className="comment-list">
              {discussion.comments &&
                discussion.comments.map((comment, commentIndex) => (
                  <li key={commentIndex} className="comment-item">
                    <div className="comment-text">{comment.text}</div>
                  </li>
                ))}
            </ul>
            <div className="comment-input">
              <input
                type="text"
                placeholder="הוסף תגובה..."
                value={commentInputs[discussionIndex] || ""}
                onChange={(e) => {
                  const newInputs = { ...commentInputs };
                  newInputs[discussionIndex] = e.target.value;
                  setCommentInputs(newInputs);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(discussionIndex, commentInputs[discussionIndex]);
                  }
                }}
              />
              <button
                onClick={() =>
                  handleAddComment(discussionIndex, commentInputs[discussionIndex])
                }
              >
                פרסם
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);
};

export default Discussions;