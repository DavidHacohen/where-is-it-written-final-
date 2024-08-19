import React from "react";
import CommentItem from "./CommentItem";
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
      {" "}
      <div className="discussion-text">
        {" "}
        <h3>{discussion.discussion_text}</h3>{" "}
      </div>{" "}
      <div
        className="discussion-author"
        style={{ color: "blue" }}
      >
        {" "}
        {discussion.first_name} {discussion.last_name}{" "}
      </div>{" "}
      <ul className="comment-list">
        {" "}
        {discussion.comments &&
          discussion.comments.map((comment) => (
            <CommentItem key={comment.comment_id} comment={comment} />
          ))}{" "}
      </ul>{" "}
      <div className="comment-input">
        {" "}
        <textarea
          className="commentField"
          rows={2}
          type="text"
          maxLength={300}
          placeholder="הוסף תגובה..."
          value={commentInputs[discussion.discussion_id] || ""}
          onChange={(e) => {
            const newInputs = { ...commentInputs };
            const value = e.target.value;
            if (value.length <= 300) {
              newInputs[discussion.discussion_id] = value;
              setCommentInputs(newInputs);
              setRemainingChars(300 - value.length);
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
        />{" "}
        <div>
          {" "}
          {remainingChars}/{300}  <br /> תווים נותרו {" "}
        </div>{" "}
        <button
          onClick={() =>
            handleAddComment(
              discussion.discussion_id,
              commentInputs[discussion.discussion_id]
            )
          }
        >
          {" "}
          פרסם{" "}
        </button>{" "}
      </div>{" "}
    </li>
  );
};
export default DiscussionItem;
