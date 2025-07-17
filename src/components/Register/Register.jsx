import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPassElement = useRef(null);
  const passElement = useRef(null);
  const usernameElement = useRef(null);

  const [alert, setAlert] = useState(null);

  function changeUserName(e) {
    setUserName(e.target.value);
    usernameElement.current.setCustomValidity("");
  }
  function changePassword(e) {
    setPassword(e.target.value);
    passElement.current.setCustomValidity("");
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
    confirmPassElement.current.setCustomValidity("");
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (username.length < 5) {
      usernameElement.current.setCustomValidity(
        "Username must be at least 5 characters long"
      );
      usernameElement.current.reportValidity();
      return;
    }
    if (password.length < 5) {
      passElement.current.setCustomValidity(
        "Password must be at least 5 characters long"
      );
      passElement.current.reportValidity();
      return;
    }

    if (confirmPassword !== password) {
      confirmPassElement.current.setCustomValidity("Passwords need to match");
      confirmPassElement.current.reportValidity();
      return;
    }
    const response = await fetch(`${VITE_URL}/api/users`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        confirmPassword,
        isAuthor: true,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      navigate("/log-in");
    } else {
      // eslint-disable-next-line no-console
      console.error(result.errors[0].msg);
      setAlert(result.errors[0].msg);
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <legend className={styles.legend}>Create a new user</legend>
        <div className={styles.log}>
          <label htmlFor="username">Username:</label>
          <input
            required
            ref={usernameElement}
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={changeUserName}
          />
        </div>
        <div className={styles.log}>
          <label htmlFor="password">Password:</label>
          <input
            required
            ref={passElement}
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={changePassword}
          />
        </div>
        <div className={styles.log}>
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            required
            ref={confirmPassElement}
            className={styles.input}
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <button className={styles.button} type="submit">
          Create new user
        </button>
      </form>
      <Link className={styles.link} to="/">
        Go to Home page
      </Link>
      {alert && <AlertMessage alert={alert} />}
    </main>
  );
}

export default Register;
