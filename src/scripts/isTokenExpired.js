export default function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    return payload.exp < now;
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log(e);
    return true;
  }
}
