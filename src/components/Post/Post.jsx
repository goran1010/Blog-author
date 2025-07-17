import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import getPost from "../../scripts/getPost.js";
import Comments from "../Comments/Comments.jsx";
import CreateComment from "../CreateComment/CreateComment.jsx";
import EditPost from "../EditPost/EditPost.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner.jsx";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";
import styles from "./Post.module.css";
import formatDateTime from "../../scripts/formatDateTime.js";

function Post() {
  const navigator = useNavigate();
  const { user } = useOutletContext();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    const newPost = await getPost(postId);
    setPost(newPost);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  async function deletePost() {
    const response = await fetch(`${VITE_URL}/api/posts/${post.id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      navigator("/");
    } else {
      // eslint-disable-next-line no-console
      console.error(result);
    }
  }

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <div className={styles.post} key={post.id}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.author}>
          Posted by: <span className={styles.span}>{post.User.username}</span>
        </p>
        <hr className={styles.hrThin} />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: post.text }}
        />
        <hr className={styles.hrThin} />
        <p className={styles.date}>
          Posted on:{" "}
          <span className={styles.span}>{formatDateTime(post.created)}</span>
        </p>

        {post.isPublished ? (
          <p className={styles.isPublishedTrue}>Post is LIVE</p>
        ) : (
          <p className={styles.isPublishedFalse}>Post is NOT Live</p>
        )}
        <hr className={styles.hr} />
        <EditPost postCreated={fetchPost} post={post} />
        <button className={styles.button} onClick={deletePost}>
          Delete Post
        </button>
        <hr className={styles.hr} />
        {post.comments.length > 0 ? (
          <Comments
            comments={post.comments}
            user={user}
            post={post}
            commentDeleted={fetchPost}
          />
        ) : (
          <p className={styles.noComments}>This post has no comments.</p>
        )}
      </div>

      {user ? (
        <CreateComment postId={postId} commentCreated={fetchPost} />
      ) : (
        <p>You need to be Logged in to comment!</p>
      )}
      <Link className={styles.link} to="/">
        Go to Home Page
      </Link>
    </main>
  );
}

export default Post;
