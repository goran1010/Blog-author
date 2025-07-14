const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export default async function getPost(postId) {
  const response = await fetch(`${VITE_URL}/api/posts/${postId}`, {
    mode: "cors",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    // eslint-disable-next-line no-console
    console.error(result);
    return null;
  }
}
