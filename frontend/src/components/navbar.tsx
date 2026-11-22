import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PostForm } from "./post-form";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const { tags } = useTag();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 mx-auto w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-card-shell/85 p-1.5 ring-1 ring-foreground/10 shadow-[0_8px_24px_-6px_rgb(0_0_0/0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-card-shell/75 dark:ring-white/[0.07] dark:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.6)]">
      <div className="flex w-full items-center justify-between rounded-[11px] bg-card/90 px-6 py-2.5 ring-1 ring-foreground/[0.06] shadow-(--card-highlight) dark:ring-white/[0.08]">
        <Link
          to="/home"
          aria-label="UnaHur Anti-Social"
          className="relative block h-10 w-[4.8rem] shrink-0 overflow-hidden"
        >
            <img
              src="/logo-light.png"
              alt="UnaHur Anti-Social"
              className="pointer-events-none absolute top-1/2 left-1/2 h-20 w-20 max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 hidden h-20 w-20 max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen dark:block"
            />
        </Link>

        <NavigationMenu className="flex justify-center w-full">
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link to="/home">Inicio</Link>} />
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

        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />
          {user && (
            <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
              <DialogTrigger render={<Button>Crear publicación</Button>} />
              <DialogContent className="sm:max-w-md">
                <PostForm onSuccess={() => setPostDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage alt={user.nickName} />
                      <AvatarFallback>
                        {user.nickName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Mi perfil
                  </DropdownMenuItem>
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;
