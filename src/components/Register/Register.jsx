import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function changeUserName(e) {
    setUserName(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, isAuthor: true }),
    });
    if (response.ok) {
      await response.json();
      navigate("/log-in");
    } else {
      // eslint-disable-next-line no-console
      console.error(response);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <legend>Create a new user</legend>
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={changeUserName}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={changePassword}
          />
        </div>
        <button type="submit">Create user</button>
      </form>
      <Link to="/">Go to Home Page</Link>
    </main>
  );
}

export default Register;
