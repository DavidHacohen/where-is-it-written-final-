import React, { useState } from "react";

const DiscussionItem = ({
  discussion,
  handleAddComment,
  commentInputs,
  setCommentInputs,
  remainingChars,
  setRemainingChars,
}) => {
  return (
    <li className="discussion-item">
      <div className="discussion-text">{discussion.discussion_text}</div>
      <div className="discussion-meta">
        <span className="discussion-date">
          {discussion.discussion_created_at}
        </span>
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
  );
};

export default DiscussionItem;
