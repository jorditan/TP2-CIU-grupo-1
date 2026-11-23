import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, UserX } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getAuthorDetails } from "@/lib/author";
import PostCard from "@/components/post-card";
import { StaggerList, Swap } from "@/components/fade";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";

function parseUserId(raw: string | undefined): number | null {
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function UserProfile() {
  const { id } = useParams();
  const { user: loggedUser } = useAuth();
  const userId = parseUserId(id);

  const { profileUser, posts, loading, error } = useUserProfile(userId);

  if (loggedUser && userId === loggedUser.id) {
    return <Navigate to="/profile" replace />;
  }

  const { displayName, handle, initials } = getAuthorDetails(
    profileUser?.nickName
  );

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-6 sm:px-4 sm:py-8">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <Button
          variant="outline"
          size="icon"
          aria-label="Volver al inicio"
          render={<Link to="/home" />}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Button>

        <Swap
          view={loading ? "loading" : error || !profileUser ? "error" : "profile"}
          className="w-full"
        >
          {loading ? (
            <CardShell className="w-full">
              <CardSurface>
                <CardHeader>
                  <CardTitle>Cargando perfil...</CardTitle>
                  <CardDescription>
                    Estamos buscando la información de este usuario.
                  </CardDescription>
                </CardHeader>
              </CardSurface>
            </CardShell>
          ) : error || !profileUser ? (
            <CardShell className="w-full">
              <CardSurface>
                <CardHeader className="items-center text-center">
                  <UserX className="size-8 text-muted-foreground" />
                  <CardTitle>Perfil no disponible</CardTitle>
                  <CardDescription>
                    {error ?? "No se encontró el usuario solicitado."}
                  </CardDescription>
                </CardHeader>
              </CardSurface>
            </CardShell>
          ) : (
            <div className="flex w-full flex-col gap-6">
              <CardShell>
                <CardSurface>
                  <CardHeader>
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar size="lg" className="shrink-0">
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col leading-tight">
                        <CardTitle className="truncate text-lg sm:text-xl">
                          {displayName}
                        </CardTitle>
                        <CardDescription className="truncate">
                          {handle}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="pt-2 text-sm text-muted-foreground">
                      Publicaciones: {posts.length}
                    </p>
                  </CardHeader>
                </CardSurface>
              </CardShell>

              <div className="flex w-full flex-col items-center gap-4">
                <h2 className="w-full text-left text-base font-semibold">
                  Publicaciones de {displayName}
                </h2>

                {posts.length > 0 ? (
                  <StaggerList
                    items={posts}
                    getKey={(post) => post.id}
                    className="flex w-full flex-col items-center gap-4"
                    renderItem={(post) => <PostCard post={post} />}
                  />
                ) : (
                  <CardShell className="w-full">
                    <CardSurface>
                      <CardHeader className="items-center text-center">
                        <FileText className="size-8 text-muted-foreground" />
                        <CardTitle>Sin publicaciones</CardTitle>
                        <CardDescription>
                          {displayName} todavía no publicó nada.
                        </CardDescription>
                      </CardHeader>
                    </CardSurface>
                  </CardShell>
                )}
              </div>
            </div>
          )}
        </Swap>
      </div>
    </section>
  );
}

export default UserProfile;
