import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Navbar />
          <Outlet />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
