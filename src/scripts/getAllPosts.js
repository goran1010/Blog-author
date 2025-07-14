export default async function getAllPosts() {
  const response = await fetch("http://localhost:3000/api/posts", {
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
