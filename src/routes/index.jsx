import { Navigate, useRoutes } from "react-router-dom";
import { Home, About, Lessons } from "./elements";

const Router = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/lessons/meiosis", element: <Lessons topic="Meiosis" /> },
    {
      path: "/lessons/digestive-system-1",
      element: <Lessons topic="Digestive System 1" />,
    },
    {
      path: "/lessons/mendelian-genetics",
      element: <Lessons topic="Mendelian Genetics" />,
    },
    {
      path: "/lessons/stages-of-mitosis",
      element: <Lessons topic="Stages of Mitosis" />,
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);

export default Router;
