import type { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import RegisterPage from "@/pages/register/RegisterPage";

const routes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: RegisterPage,
  }
] satisfies RouteObject[];

export default routes;
