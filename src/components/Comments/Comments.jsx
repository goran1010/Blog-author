import formatDateTime from "../../scripts/formatDateTime.js";

export default function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <h2>{comment.User.username}</h2>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          <p>{formatDateTime(comment.created)}</p>
        </div>
      ))}
    </div>
  );
}
