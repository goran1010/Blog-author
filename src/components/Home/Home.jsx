import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import getAllPosts from "../../scripts/getAllPosts.js";
import { Link } from "react-router-dom";
import formatDateTime from "../../scripts/formatDateTime.js";

function Home() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const newPosts = await getAllPosts();
      setAllPosts(newPosts);
      setLoadingPosts(false);
    }
    fetchAllPosts();
  }, []);

  return (
    <>
      <Header />
      {loadingPosts ? (
        <main>Loading ...</main>
      ) : (
        <main>
          {allPosts.map((post) => {
            if (post.isPublished) {
              return (
                <div className="post" key={post.id}>
                  <h2>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h2>
                  <h3>{post.User.username}</h3>
                  <p>{post.text}</p>
                  <p>{formatDateTime(post.created)}</p>
                </div>
              );
            }
          })}
        </main>
      )}
    </>
  );
}

export default Home;
