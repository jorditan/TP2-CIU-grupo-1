import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useUsers } from "@/hooks/useUsers";
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
import { Menu, Plus, Search, X } from "lucide-react";
import { PostForm } from "./post-form";
import { BrandLogo } from "./brand-logo";
import { Separator } from "./ui/separator";
import { ResponsiveModal } from "./responsive-drawer";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const { tags } = useTag();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const mobileMenuOpen = mobileMenuPath === location.pathname;
  const setMobileMenuOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const isOpen = typeof next === "function" ? next(mobileMenuOpen) : next;
    setMobileMenuPath(isOpen ? location.pathname : null);
  };
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const handleSelectUser = (userId: number) => {
    setOpen(false);
    navigate(userId === user?.id ? "/profile" : `/user/${userId}`);
  };

  return (
    <>
    <header className="sticky top-2 sm:top-3 z-50 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-card-shell/85 p-1.5 ring-1 ring-foreground/10 shadow-[0_8px_24px_-6px_rgb(0_0_0/0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-card-shell/75 dark:ring-white/[0.07] dark:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.6)]">
      <div className="flex w-full items-center justify-between gap-2 rounded-[11px] bg-card/90 px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 ring-1 ring-foreground/[0.06] shadow-(--card-highlight) dark:ring-white/[0.08]">
        <BrandLogo />

        <NavigationMenu className="hidden md:flex justify-center flex-1">
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link to="/home">Inicio</Link>} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Categorías
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink render={<Link to="/home">Todas</Link>} />
                {tags.map((tag) => (
                  <NavigationMenuLink
                    key={tag.id}
                    render={
                      <Link to={`/home?tag=${tag.id}`} className="capitalize">
                        {tag.name}
                      </Link>
                    }
                  />
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
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="icon"
            aria-label="Buscar usuario"
            className="md:hidden"
          >
            <Search className="size-4" />
          </Button>

          <ModeToggle />

          {user && (
            <ResponsiveModal
              open={postDialogOpen}
              onOpenChange={setPostDialogOpen}
              title="Crear publicación"
              description="Ingresa la información necesaria para crear una publicación."
              trigger={
                <Button
                  aria-label="Crear publicación"
                  className="hidden md:inline-flex gap-1.5"
                >
                  <Plus className="size-4" />
                  <span>Crear publicación</span>
                </Button>
              }
            >
              <PostForm
                onSuccess={() => setPostDialogOpen(false)}
                onCancel={() => setPostDialogOpen(false)}
              />
            </ResponsiveModal>
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
              <DropdownMenuContent className="w-36">
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
            <Button
              render={<Link to="/login" />}
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Iniciar sesión
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="mt-1.5 flex flex-col gap-3 rounded-[11px] bg-card/95 p-3 ring-1 ring-foreground/[0.06] dark:ring-white/[0.08] md:hidden"
        >
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              render={<Link to="/home" onClick={() => setMobileMenuOpen(false)} />}
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpen(true);
              }}
            >
              <Search className="size-4 opacity-70" />
              Buscar usuario
            </Button>
          </div>

          {tags.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-2 px-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Categorías
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Link
                    to="/home"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Todas
                  </Link>
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/home?tag=${tag.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground capitalize transition-colors hover:bg-accent"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {!user && (
            <>
              <Separator />
              <div className="flex flex-col gap-2 sm:hidden">
                <Button
                  render={
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Iniciar sesión
                </Button>
                <Button
                  render={
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  }
                  size="sm"
                  className="w-full"
                >
                  Crear cuenta
                </Button>
              </div>
            </>
          )}
        </nav>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Encontrá al usuario que buscás..." />
          <CommandList>
            {usersLoading ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Cargando usuarios...
              </p>
            ) : usersError ? (
              <p className="py-6 text-center text-sm text-destructive">
                {usersError}
              </p>
            ) : (
              <>
                <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                <CommandGroup heading="Usuarios">
                  {users.map((u) => (
                    <CommandItem
                      key={u.id}
                      value={u.nickName}
                      onSelect={() => handleSelectUser(u.id)}
                    >
                      <Avatar className="size-6">
                        <AvatarFallback className="text-xs">
                          {u.nickName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{u.nickName}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>

    {user && location.pathname !== "/create-post" && (
      <Button
        size="icon-lg"
        aria-label="Crear publicación"
        onClick={() => setPostDialogOpen(true)}
        className="fixed right-5 bottom-5 z-40 size-13 rounded-full shadow-lg md:hidden"
      >
        <Plus className="size-6" />
      </Button>
    )}
    </>
  );
}

export default Navbar;
