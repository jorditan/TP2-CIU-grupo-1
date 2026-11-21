import type { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "@/pages/home/Home";
import RegisterPage from "@/pages/register/RegisterPage";
import Profile from "@/pages/profile/Profile";
import Post from "@/components/post";
import App from "@/App";
import ProtectedRoute from "@/components/protected-route";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/post/:id",
        Component: Post,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "/profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
] satisfies RouteObject[];

export default routes;
