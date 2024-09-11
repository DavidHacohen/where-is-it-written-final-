// PodcastDiscussion.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/stylesheets/PodcastDiscussion.css"; // Import the CSS file

const PodcastDiscussion = ({ podcast_discussion }) => {
  console.log(podcast_discussion)
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [remainingChars, setRemainingChars] = useState(0);

  return (
    <div className="discussions-container">
      <div className="discussion-input">
        <textarea
          className="inputField"
          type="text"
          rows={4}
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="התחל דיון חדש..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {

            }
          }}
        />
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

                  }
                }}
              />
              <div>
                {remainingChars}/{100} characters remaining
              </div>
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