import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PageTitle = ({ isErrorPage = false }) => {
  const location = useLocation();

  useEffect(() => {
    let title = "";

    if (isErrorPage) {
      title = "Error Page";
    } else {
      switch (location.pathname) {
        case "/posts":
          title = "Blog App | Posts Page";
          break;
        case "/":
          title = "Blog App | Home Page";
          break;
        case "/log-in":
          title = "Blog App | Log In";
          break;
        case "/register":
          title = "Blog App | Register";
          break;
        default:
          title = "Blog App | View Post";
          break;
      }
    }
    document.title = title;
  }, [location, isErrorPage]);

  return null;
};

export default PageTitle;
