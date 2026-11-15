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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";
import { Search } from "lucide-react";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const { tags } = useTag();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-6 py-2 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage alt="shadcn" />
                  <AvatarFallback>
                    {user.nickName.charAt(0).toUpperCase()}
                  </AvatarFallback>
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
      <NavigationMenu className="flex justify-center w-full">
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to="/home">Inicio</Link>} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to="/home">Tendencias</Link>} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Categorías
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {tags.map((tag) => (
                <NavigationMenuLink key={tag.id} href={`/tags/${tag.id}`}>
                  {tag.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-full bg-transparent text-muted-foreground/80"
            >
              <Search className="h-4 w-4 opacity-50" />
              Buscar usuario
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command>
                <CommandInput placeholder="Encontrá al usuario que buscás..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Últimas búsquedas">
                    <CommandItem>mmati jordan</CommandItem>
                    <CommandItem>nicolaspaz</CommandItem>
                    <CommandItem>Sebavilla</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
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
