import { createBrowserRouter } from "react-router-dom";
import { Dashboard, DetailPost, Login, Post, Profile } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Dashboard />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/post/:postId",
    element: <DetailPost />,
  },
]);
