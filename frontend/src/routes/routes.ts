import type { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";

const routes = [
  {
    path: "/login",
    Component: Login,
  },
] satisfies RouteObject[];

export default routes;
