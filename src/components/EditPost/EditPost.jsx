import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import styles from "./EditPost.module.css";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";

export default function EditPost({ postCreated, post }) {
  const { user } = useOutletContext();
  const editorRef = useRef(null);
  const [isPublished, setIsPublished] = useState(post.isPublished);
  const [title, setTitle] = useState(post.title);
  const [alert, setAlert] = useState(null);

  function handleIsPublished(e) {
    setIsPublished(e.target.checked);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasText = editorRef.current.getContent({ format: "text" }).trim();
    if (!hasText) {
      setAlert("Couldn't create Post - Text can't be empty");
      return;
    }
    const text = editorRef.current.getContent();
    setAlert(null);
    const response = await fetch(`${VITE_URL}/api/posts/${post.id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text, title, isPublished }),
    });
    const result = await response.json();
    if (!response.ok) {
      setAlert(result.errors.msg);
      //eslint-disable-next-line no-console
      console.log(response);
      return;
    }
    setAlert(null);
    postCreated();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <legend className={`${styles.item} ${styles.legend}`}>
        Edit this Post:
      </legend>
      <div className={styles.item}>
        <label htmlFor="title">Edit title: </label>
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
        initialValue={post.text}
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
          Edit Post as <strong>published</strong>
        </label>{" "}
        <input
          type="checkbox"
          name="isPublished"
          id="isPublished"
          checked={isPublished}
          onChange={handleIsPublished}
        />
      </div>
      <button className={`${styles.item} ${styles.button}`} type="submit">
        Edit Post
      </button>
      {alert && <AlertMessage alert={alert} />}
    </form>
  );
}
