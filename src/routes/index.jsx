import { Navigate, useRoutes } from "react-router-dom";
import { Home, About, Lessons, Login, AdminDash } from "./elements";

const Router = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/lessons", element: <Lessons /> },
    { path: "/login", element: <Login /> },
    { path: "/admin", element: <AdminDash /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

export default Router;
