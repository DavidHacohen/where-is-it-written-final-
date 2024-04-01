import React, { useState, useEffect } from "react";
import Nav from "../components/Nav"

const Discussion = ({ podcastTitle }) => {
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
    <div>
      <h4>Discussions for "{podcastTitle}"</h4>
      <div>
        <input
          type="text"
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="Start a new discussion..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddDiscussion();
            }
          }}
        />
        <button onClick={handleAddDiscussion}>Add Discussion</button>
      </div>
      <ul>
        {discussions.map((discussion, discussionIndex) => (
          <li key={discussionIndex}>
            {discussion.discussion_text}
            <ul>
              {discussion.comments &&
                discussion.comments.map((comment, commentIndex) => (
                  <li key={commentIndex}>
                    {comment.text}
                    <div>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInputs[`${discussionIndex}-${commentIndex}`] || ""}
                        onChange={(e) => {
                          const newInputs = { ...commentInputs };
                          newInputs[`${discussionIndex}-${commentIndex}`] = e.target.value;
                          setCommentInputs(newInputs);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddComment(
                              discussionIndex,
                              commentInputs[`${discussionIndex}-${commentIndex}`],
                              comment.id
                            );
                          }
                        }}
                      />
                      <button
                        onClick={() =>
                          handleAddComment(
                            discussionIndex,
                            commentInputs[`${discussionIndex}-${commentIndex}`],
                            comment.id
                          )
                        }
                      >
                        Post
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="Add a comment..."
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
                Post
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discussion;