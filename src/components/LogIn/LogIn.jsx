import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { setUser } = useOutletContext();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/log-in", {
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
      console.error(result);
    }
  }
  function handleUsername(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <legend>Log in here</legend>
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <Link to="/">Back Home</Link>
    </main>
  );
}

export default LogIn;
