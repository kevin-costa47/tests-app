export default function SimplePost(props: {
  content: string;
  user: string;
  likesBy?: string[];
}) {
  function renderLikes() {
    if (props.likesBy) {
      return (
        <div data-testid="likes-container">
          <h1>Likes by:</h1>
          {props.likesBy.map((like) => {
            return <li key={like}>{like}</li>;
          })}
        </div>
      );
    }
  }

  return (
    <div data-testid="post-container">
      <h2>{props.user}</h2>
      <p>{props.content}</p>
      {renderLikes()}
    </div>
  );
}
