import { Navigate, useRoutes } from "react-router-dom";
import {
  Home,
  About,
  Lessons,
  Login,
  Register,
  AdminDash,
  UserScore,
} from "./elements";

const Router = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/lessons", element: <Lessons /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <AdminDash /> },
    { path: "/user-score", element: <UserScore /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

export default Router;
