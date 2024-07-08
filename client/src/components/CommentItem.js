// CommentItem.js
import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <li className="comment-item">
      <div className="comment-text">
        <h5>{comment.comment_text}</h5>
      </div>
      <div className="comment-author" style={{ color: 'blue' }}>
        {comment.first_name} {comment.last_name}
      </div>
    </li>
  );
};

export default CommentItem;