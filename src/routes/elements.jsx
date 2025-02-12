import { Suspense, lazy } from "react";

import LoadingScreen from "../components/loading-screen/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export const Home = Loadable(lazy(() => import("../pages/Home/Home")));
export const About = Loadable(lazy(() => import("../pages/about/About")));
export const Lessons = Loadable(lazy(() => import("../pages/lessons/Lessons")));
export const Login = Loadable(lazy(() => import("../pages/Login")));
export const Register = Loadable(lazy(() => import("../pages/SignUp")));
export const AdminDash = Loadable(lazy(() => import("../pages/AdminDash")));
export const UserScore = Loadable(lazy(() => import("../pages/UserScore")));
