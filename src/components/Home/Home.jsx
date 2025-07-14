import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import getAllPosts from "../../scripts/getAllPosts.js";
import { Link, useOutletContext } from "react-router-dom";
import formatDateTime from "../../scripts/formatDateTime.js";
import CreatePost from "../CreatePost/CreatePost.jsx";

function Home() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const { user } = useOutletContext();

  function postCreated() {
    fetchAllPosts();
  }
  async function fetchAllPosts() {
    const newPosts = await getAllPosts();
    setAllPosts(newPosts);
    setLoadingPosts(false);
  }
  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loadingPosts) {
    return <main>Loading ...</main>;
  }

  return (
    <>
      <Header />
      {!user || !user.isAuthor ? (
        <main>
          Need to be logged in and an author to create, view, edit and delete
          posts.
        </main>
      ) : (
        <main>
          <CreatePost postCreated={postCreated} />
          <div className="posts">
            {allPosts.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <h2>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h2>
                  <h3>{post.User.username}</h3>
                  <p>
                    {post.isPublished ? (
                      <span className="isPublished">Post is LIVE</span>
                    ) : (
                      <span className="isNotPublished">Post is NOT Live</span>
                    )}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: post.text }} />
                  <p>{formatDateTime(post.created)}</p>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
