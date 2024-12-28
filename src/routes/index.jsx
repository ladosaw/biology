import { Navigate, useRoutes } from "react-router-dom";
import { Home, About, Lessons } from "./elements";

const Router = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/lessons", element: <Lessons /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

export default Router;
