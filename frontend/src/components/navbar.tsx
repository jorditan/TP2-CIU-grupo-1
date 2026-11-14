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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useTag } from "@/hooks/useTag";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const { tags } = useTag();
  return (
    <header className="w-full fixed top-0 left-0 flex items-center justify-between py-2 px-8 bg-background border-b border-border">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem>Mi perfil</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={logoutUser} variant="destructive">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button render={<Link to="/login" />} variant="outline" size="sm">
          Iniciar sesión
        </Button>
      )}
      <NavigationMenu className="flex justify-center m-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to="/home">Inicio</Link>} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to="/home">Tendencias</Link>} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
            <NavigationMenuContent>
              {tags.map((tag) => (
                <NavigationMenuLink key={tag.id} href={`/tags/${tag.id}`}>
                  {tag.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {user && <Button>Crear Publicación</Button>}
      </div>
    </header>
  );
}

export default Navbar;
