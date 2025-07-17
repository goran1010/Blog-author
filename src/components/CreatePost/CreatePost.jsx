import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import styles from "./CreatePost.module.css";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";

export default function CreatePost({ postCreated }) {
  const [alert, setAlert] = useState(null);

  const { user } = useOutletContext();
  const editorRef = useRef(null);
  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState("");

  function handleIsPublished(e) {
    let published = e.target.value === "true" ? "false" : "true";
    setIsPublished(published);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const hasText = editorRef.current.getContent({ format: "text" }).trim();
      if (!hasText) {
        setAlert("Couldn't create Post - Text can't be empty");
        return;
      }
      setAlert(null);

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
      const result = await response.json();
      if (!response.ok) {
        //eslint-disable-next-line no-console
        console.error(result.errors.msg);
        setAlert(result.errors.msg);
        return;
      }
      setAlert(null);
      postCreated();
      editorRef.current.setContent("");
      setTitle("");
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <legend className={`${styles.item} ${styles.legend}`}>
        Create a new Post:
      </legend>
      <div className={styles.item}>
        <label htmlFor="title">Title: </label>
        <input
          required
          className={styles.titleInput}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <Editor
        apiKey={VITE_API_URL}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          resize: false,
          height: 300,
          menubar: false,
          plugins: "link image code",
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
        }}
      />
      <div className={styles.item}>
        <label htmlFor="isPublished">
          Set the Post as <strong>published</strong>
        </label>{" "}
        <input
          type="checkbox"
          name="isPublished"
          id="isPublished"
          value={isPublished}
          onChange={handleIsPublished}
        />
      </div>
      <button className={`${styles.item} ${styles.button}`} type="submit">
        Create Post
      </button>
      {alert && <AlertMessage alert={alert} />}
    </form>
  );
}
