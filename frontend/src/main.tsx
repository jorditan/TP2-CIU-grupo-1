import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes from "./routes/routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);
