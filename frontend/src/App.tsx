import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { userService } from "./services/userService";
import Navbar from "./components/navbar";

function App() {
  const users = userService.getAllUsers();
  console.log(users);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
