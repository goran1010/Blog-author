import formatDateTime from "../../scripts/formatDateTime.js";
import styles from "./Comments.module.css";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export default function Comments({ comments, user, post, commentDeleted }) {
  async function handleDelete(commentId) {
    const response = await fetch(
      `${VITE_URL}/api/posts/${post.id}/comments/${commentId}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const result = await response.json();
    if (response.ok) {
      commentDeleted();
    } else {
      // eslint-disable-next-line no-console
      console.error(result);
    }
  }

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <p className={styles.author}>
            Commented by:{" "}
            <span className={styles.span}>{comment.User.username}</span>
          </p>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          <p className={styles.date}>
            Commented on:{" "}
            <span className={styles.span}>
              {formatDateTime(comment.created)}
            </span>
          </p>
          <button
            className={styles.buttonDelete}
            onClick={() => {
              handleDelete(comment.id);
            }}
          >
            Delete comment
          </button>
        </div>
      ))}
    </div>
  );
}
