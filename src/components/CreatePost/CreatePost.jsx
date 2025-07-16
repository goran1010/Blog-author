import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export default function CreatePost({ postCreated }) {
  const { user } = useOutletContext();
  const editorRef = useRef(null);
  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState("");

  function handleIsPublished(e) {
    setIsPublished(e.target.value);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const text = editorRef.current.getContent();
      const response = await fetch(`${VITE_URL}/api/posts/`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text, title, isPublished }),
      });
      postCreated();
      editorRef.current.setContent("");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Create a new Post:</legend>
      <div className="title">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <Editor
        apiKey="aldlsz4vjcvdf3wag1e3d6n2nlx252mfjhc239fjuilwbt9l"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 300,
          width: 400,
          menubar: false,
          plugins: "link image code",
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
        }}
      />
      <div className="isPublished">
        <label htmlFor="isPublished">Publish Post </label>{" "}
        <input
          type="checkbox"
          name="isPublished"
          id="isPublished"
          value={isPublished}
          onChange={handleIsPublished}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}
