import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import getAllPosts from "../../scripts/getAllPosts.js";
import { Link, useOutletContext } from "react-router-dom";
import formatDateTime from "../../scripts/formatDateTime.js";
import CreatePost from "../CreatePost/CreatePost.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./Home.module.css";

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
  }
  useEffect(() => {
    try {
      fetchAllPosts();
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  if (loadingPosts) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  return (
    <>
      <Header />
      {!user || !user.isAuthor ? (
        <main className={styles["main-no-user"]}>
          <p>
            You need to be <span className={styles.important}>logged in</span>{" "}
            and an <span className={styles.important}>author</span> to create,
            view, edit or delete posts.
          </p>
        </main>
      ) : (
        <main>
          <CreatePost postCreated={postCreated} />

          <div className={styles.posts}>
            <hr className={styles.hr} />
            {allPosts.map((post) => {
              return (
                <div className={styles.post} key={post.id}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.author}>
                    Posted by:{" "}
                    <span className={styles.span}>{post.User.username}</span>
                  </p>
                  <hr className={styles.hrThin} />
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: post.text }}
                  />
                  <hr className={styles.hrThin} />
                  <p className={styles.date}>
                    Posted on:{" "}
                    <span className={styles.span}>
                      {formatDateTime(post.created)}
                    </span>
                  </p>
                  <p className={styles.comments}>
                    Number of comments:{" "}
                    <span className={styles.span}>{post.comments.length}</span>
                  </p>

                  {post.isPublished ? (
                    <p className={styles.isPublishedTrue}>Post is LIVE</p>
                  ) : (
                    <p className={styles.isPublishedFalse}>Post is NOT Live</p>
                  )}

                  <Link to={`/posts/${post.id}`} className={styles.link}>
                    View Post
                  </Link>
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
