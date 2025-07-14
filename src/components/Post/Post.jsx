import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import getPost from "../../scripts/getPost.js";
import Comments from "../Comments/Comments.jsx";
import CreateComment from "../CreateComment/CreateComment.jsx";
import EditPost from "../EditPost/EditPost.jsx";
import { useNavigate } from "react-router-dom";

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
    const response = await fetch(`http://localhost:3000/api/posts/${post.id}`, {
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
    return <main>Loading...</main>;
  }
  return (
    <main>
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.User.username}</p>
        <div>{post.text}</div>
        <p>{post.created}</p>
        <EditPost postCreated={fetchPost} post={post} />
        <button onClick={deletePost}>Delete Post</button>
        {post.comments.length > 0 ? (
          <Comments comments={post.comments} />
        ) : (
          <p>No comments here.</p>
        )}
      </div>

      {user ? (
        <CreateComment postId={postId} commentCreated={fetchPost} />
      ) : (
        <p>You need to be Logged in to comment!</p>
      )}
      <Link to="/">Go to Home Page</Link>
    </main>
  );
}

export default Post;
