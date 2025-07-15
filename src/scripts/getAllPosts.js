const VITE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

console.log(VITE_URL);

export default async function getAllPosts() {
  const response = await fetch(
    `http://dry-leona-goran-jovic-1010-5d98d993.koyeb.app/api/posts`,
    {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    // eslint-disable-next-line no-console
    console.error(result);
    return null;
  }
}
