import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../assets/stylesheets/Discussions.css";

const Discussions = ({ podcastTitle }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [remainingChars, setRemainingChars] = useState(0);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch("http://localhost:5000/discussions");
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
        console.log(data)
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
    if (localStorage.getItem('token') != null) {
      if (newDiscussion.trim() !== "") {
        try {
          const response = await fetch("http://localhost:5000/discussions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              discussion_text: newDiscussion,
              comments: [],
            }),
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
    }
  };

  const handleAddComment = async (discussionIndex, commentText) => {
    if (localStorage.getItem('token') != null) {
      const discussionId = discussions[discussionIndex].discussion_id;
      try {
        const response = await fetch(
          `http://localhost:5000/discussions/${discussionId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: commentText }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(
            "Comment added successfully. Comment ID:",
            data.comment_id,
            "Discussion ID:",
            discussionId
          );

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
      newInputs[discussionId] = "";
      setCommentInputs(newInputs);
      setRemainingChars(100);
    }
  };

  return (
    <>
      <Nav className="nav" />
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
                {discussion.discussion_text}
              </div>
              <ul className="comment-list">
                {discussion.comments &&
                  discussion.comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                      <div className="comment-text">{comment.text}</div>
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
                        discussionIndex,
                        commentInputs[discussion.discussion_id]
                      );
                    }
                  }}
                />
                <div>{remainingChars}/{100} characters remaining</div>
                <button
                  onClick={() =>
                    handleAddComment(
                      discussionIndex,
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
    </>
  );
};

export default Discussions;