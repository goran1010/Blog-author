import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";

function LogIn() {
  const [alert, setAlert] = useState(null);
  const { setUser } = useOutletContext();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${VITE_URL}/log-in`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      const { user } = result;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      setUser(user);
      navigator("/");
    } else {
      // eslint-disable-next-line no-console
      console.error(result.message);
      setAlert(result.message);
    }
  }
  function handleUsername(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <legend className={styles.legend}>Log in</legend>
        <div className={styles.log}>
          <label htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className={styles.log}>
          <label htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button className={styles.button} type="submit">
          Log in
        </button>
      </form>
      <Link className={styles.link} to="/">
        Go to Home page
      </Link>
      {alert && <AlertMessage alert={alert} />}
    </main>
  );
}

export default LogIn;
