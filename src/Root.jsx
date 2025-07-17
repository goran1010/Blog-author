import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import isTokenExpired from "./scripts/isTokenExpired.js";
import PageTitle from "./components/PageTitle/PageTitle.jsx";

function Root() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      if (isTokenExpired(user.token)) {
        localStorage.removeItem("user");
      } else {
        setUser(user);
      }
    }
    setLoadingUser(false);
  }, []);
  return (
    <div className="container">
      <PageTitle />
      <Outlet context={{ user, setUser, loadingUser, setLoadingUser }}></Outlet>
    </div>
  );
}
export default Root;
