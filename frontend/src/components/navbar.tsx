import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <header className="w-full flex items-center justify-between py-2 px-2 bg-background border-b border-border">
      <NavigationMenu className="flex justify-center m-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button render={<Link to="/login" />}>Iniciar sesión</Button>
      </div>
    </header>
  );
}

export default Navbar;
