import type { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "@/pages/home/Home";
import RegisterPage from "@/pages/register/RegisterPage";
import App from "@/App";

const routes = [
  {
    Component: App,
    children: [
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
    ],
  },
] satisfies RouteObject[];

export default routes;
