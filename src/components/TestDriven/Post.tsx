import { useState, useEffect } from "react";
import {
  getCommentsForPostWithAxios,
  psotCommentWithAxios,
} from "./DataService";
import type { Comment } from "./Model";

let nextId = 0;

export function Post(props: { content: string; user: string; id: string }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorState, setErrorState] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsForPostWithAxios(props.id);
        setComments(sortCommentsByDate(comments));
      } catch (error) {
        console.error((error as Error).message);
        setErrorState("Error while getting comments!");
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      <div data-testid="post-container">
        <h2>{props.user}:</h2>
        <p>{props.content}</p>
      </div>
      <label style={{ color: "red" }} data-testid="error-label">
        {errorState}
      </label>
      <div data-testid="comment-container">
        <input
          data-testid="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={() => {
            comments.push({
              content: comment,
              date: new Date().getTime(),
            });
            setComment("");
            psotCommentWithAxios(props.id, comment, new Date().getTime());
          }}>
          Comment
        </button>

        <div data-testid="post-comment-container">
          {comments.map((comment) => {
            return <p key={nextId++}>{comment.content}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

function sortCommentsByDate(comments: Comment[]) {
  return comments.sort((a, b) => b.date - a.date);
}
