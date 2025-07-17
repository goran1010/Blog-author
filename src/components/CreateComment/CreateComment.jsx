import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import styles from "./CreateComment.module.css";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";

export default function CreateComment({ postId, commentCreated }) {
  const [alert, setAlert] = useState(null);
  const { user } = useOutletContext();
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const text = editorRef.current.getContent();
      const response = await fetch(`${VITE_URL}/api/posts/${postId}/comments`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();
      if (!response.ok) {
        setAlert(result);
        //eslint-disable-next-line no-console
        console.error(result);
        return;
      }
      commentCreated();
      editorRef.current.setContent("");
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <legend className={`${styles.item} ${styles.legend}`}>
        Post a new comment:
      </legend>
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

      <button className={`${styles.item} ${styles.button}`} type="submit">
        Post comment
      </button>
      {alert && <AlertMessage alert={alert} />}
    </form>
  );
}
