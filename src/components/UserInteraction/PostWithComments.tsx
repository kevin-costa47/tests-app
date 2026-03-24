import { useState } from "react";

type Comment = { content: string };

let nextId = 0;

export default function PostWithComments(props: {
  content: string;
  user: string;
}) {
  const [comment, setComment] = useState("");
  const [comments] = useState<Comment[]>([]);

  return (
    <div>
      <div data-testid="post-container">
        <h2>{props.user}</h2>
        <p>{props.content}</p>
      </div>
      <div data-testid="comment-container">
        <input
          data-testid="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => {
            comments.push({ content: comment });
            setComment("");
          }}>
          Comment
        </button>

        <div data-testid="comments-container">
          {comments.map((comment) => (
            <p key={nextId++}>{comment.content}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
