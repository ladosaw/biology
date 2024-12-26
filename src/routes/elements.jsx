import { Suspense, lazy } from "react";

import LoadingScreen from "../components/loading-screen/LoadingScreen";

const Loadable = (Component) => (props) => {
  console.log("Lazy loading component...");
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export const Home = Loadable(lazy(() => import("../pages/Home")));
export const About = Loadable(lazy(() => import("../pages/About")));
export const Lessons = Loadable(lazy(() => import("../pages/lessons/Lessons")));
