import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function CreateComment({ postId, commentCreated }) {
  const { user } = useOutletContext();
  const [text, setText] = useState("");
  function handleText(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text }),
    });
    commentCreated();
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>Create a new comment:</legend>
      <div className="text">
        <label htmlFor="text">Write text:</label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={handleText}
        ></textarea>
        <button type="submit">Post comment</button>
      </div>
    </form>
  );
}
