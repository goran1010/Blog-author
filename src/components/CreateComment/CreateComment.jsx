import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export default function CreateComment({ postId, commentCreated }) {
  const { user } = useOutletContext();
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = editorRef.current.getContent();
    await fetch(`${VITE_URL}/api/posts/${postId}/comments`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text }),
    });
    commentCreated();
    editorRef.current.setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Create a new comment:</legend>
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
      <button type="submit">Post comment</button>
    </form>
  );
}
