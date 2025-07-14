import Root from "./Root";
import ErrorPage from "./components/Error/ErrorPage";
import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import Post from "./components/Post/Post";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        children: [
          { index: true, element: <Navigate to="/" /> },
          { path: ":postId", element: <Post /> },
        ],
      },
      { path: "log-in", element: <LogIn /> },
      { path: "register", element: <Register /> },
    ],
  },
];
export default routes;
