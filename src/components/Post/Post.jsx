import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import getPost from "../../scripts/getPost.js";
import Comments from "../Comments/Comments.jsx";
import CreateComment from "../CreateComment/CreateComment.jsx";

function Post() {
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

  if (loading) {
    return <main>Loading...</main>;
  }
  return (
    <main>
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.User.username}</p>
        <p>{post.text}</p>
        <p>{post.created}</p>
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
