import { useOutletContext, Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./Header.module.css";

function Home() {
  const { user, setUser, loadingUser } = useOutletContext();
  function logOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (loadingUser) {
    return (
      <header>
        <Spinner />
      </header>
    );
  }
  return (
    <>
      {user ? (
        <header className={styles["header-logged-in"]}>
          <p className={styles.paragraph}>
            <span className={styles.welcome}>Welcome back</span>{" "}
            <span className={styles.name}>{user.username}</span>
          </p>
          <Link onClick={logOut} className={styles.link}>
            {" "}
            Log out
          </Link>
        </header>
      ) : (
        <header className={styles["header-logged-out"]}>
          <p className={styles.paragraph}>
            <span className={styles.welcome}>Welcome</span> Guest
          </p>
          <p>
            If you already have an account, you can{" "}
            <Link className={styles.link} to="/log-in">
              log in here
            </Link>{" "}
            !
          </p>
          <p>
            If you are new, you can{" "}
            <Link className={styles.link} to="/register">
              create a new account here
            </Link>{" "}
            !
          </p>
        </header>
      )}
    </>
  );
}

export default Home;
