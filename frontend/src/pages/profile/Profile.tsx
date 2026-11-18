import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FileText } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { postService } from "@/services/postService";
import { commentService } from "@/services/commentService";
import PostCard from "@/components/post-card";
import type { PostWithDetails } from "@/hooks/usePost";
import type { Comment } from "@/types/comment";
import type { PostImage } from "@/types/postImage";
import {
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";

function Profile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<PostWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const loadUserPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const posts = await postService.getByUserId(user.id);

        const postsWithDetails = await Promise.all(
          posts.map(async (post) => {
            const [commentsResult, images] = await Promise.all([
              commentService.getCommentsByPostId(post.id),
              postService.getPostImages(post.id),
            ]);

            return {
              ...post,
              comments: (commentsResult ?? []) as Comment[],
              images: (images ?? []) as PostImage[],
            };
          })
        );

        if (!cancelled) setUserPosts(postsWithDetails);
      } catch (err) {
        console.error("Error al cargar las publicaciones del usuario:", err);
        if (!cancelled) {
          setError("No se pudieron cargar tus publicaciones. Intentá nuevamente.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadUserPosts();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-4 py-8">
      <div className="w-full max-w-lg">
        <CardShell>
          <CardSurface>
            <CardHeader>
              <CardTitle className="text-xl">Mi perfil</CardTitle>
              <CardDescription>
                Publicaciones de {user.nickName}
              </CardDescription>
              <div className="pt-2 text-sm text-muted-foreground">
                <p>Usuario: {user.nickName}</p>
                <p>Correo: {user.email}</p>
                <p>Publicaciones: {loading ? "..." : userPosts.length}</p>
              </div>
            </CardHeader>
          </CardSurface>
        </CardShell>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="w-full text-left text-base font-semibold">
          Mis publicaciones
        </h2>

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
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
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
      </div>
    </section>
  );
}

export default Profile;
