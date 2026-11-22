import { FileText, LogOut } from "lucide-react";

import { useProfile } from "@/hooks/useProfile";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";

import {
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";
import { StaggerList, Swap } from "@/components/fade";

function Profile() {
  const { user, userPosts, loading, error, handleLogout } = useProfile();

  if (!user) {
    return null;
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-6 sm:px-4 sm:py-8">
      <div className="w-full max-w-lg">
        <CardShell>
          <CardSurface>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Mi perfil</CardTitle>
              <CardDescription className="break-words">
                Publicaciones de {user.nickName}
              </CardDescription>
              <div className="space-y-0.5 pt-2 text-sm text-muted-foreground">
                <p className="break-words">Usuario: {user.nickName}</p>
                <p className="break-all">Correo: {user.email}</p>
                <p>Publicaciones: {loading ? "..." : userPosts.length}</p>
              </div>
              <div className="pt-3">
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Cerrar sesión
                </Button>
              </div>
            </CardHeader>
          </CardSurface>
        </CardShell>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="w-full text-left text-base font-semibold">
          Mis publicaciones
        </h2>

        <Swap
          view={
            loading ? "loading" : error ? "error" : userPosts.length ? "posts" : "empty"
          }
          className="w-full"
        >
          {loading ? (
            <CardShell className="w-full">
              <CardSurface>
                <CardHeader>
                  <CardTitle>Cargando publicaciones...</CardTitle>
                  <CardDescription>
                    Estamos buscando tus publicaciones.
                  </CardDescription>
                </CardHeader>
              </CardSurface>
            </CardShell>
          ) : error ? (
            <p className="w-full rounded-lg border border-destructive/30 p-4 text-sm text-destructive">
              {error}
            </p>
          ) : userPosts.length > 0 ? (
            <StaggerList
              items={userPosts}
              getKey={(post) => post.id}
              className="flex w-full flex-col items-center gap-4"
              renderItem={(post) => <PostCard post={post} />}
            />
          ) : (
            <CardShell className="w-full">
              <CardSurface>
                <CardHeader className="items-center text-center">
                  <FileText className="size-8 text-muted-foreground" />
                  <CardTitle>Todavía no publicaste nada</CardTitle>
                  <CardDescription>
                    Cuando crees una publicación, aparecerá en esta sección.
                  </CardDescription>
                </CardHeader>
              </CardSurface>
            </CardShell>
          )}
        </Swap>
      </div>
    </section>
  );
}

export default Profile;
