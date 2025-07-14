import { useOutletContext, Link } from "react-router-dom";

function Home() {
  const { user, setUser, loadingUser } = useOutletContext();
  function logOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (loadingUser) {
    return <header>Loading User...</header>;
  }
  return (
    <>
      {user ? (
        <header>
          <p>Welcome back {user.username} !</p>
          <Link onClick={logOut}> Log out</Link>
        </header>
      ) : (
        <header>
          <p>Welcome Guest</p>
          <p>
            If you already have an account, you can{" "}
            <Link to="/log-in">log in here</Link> !
          </p>
          <p>
            If you are new, you can{" "}
            <Link to="/register">create a new account here</Link> !
          </p>
        </header>
      )}
    </>
  );
}

export default Home;
