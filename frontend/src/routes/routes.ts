import type { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
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
    ],
  },
] satisfies RouteObject[];

export default routes;
