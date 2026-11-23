import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePostDetail } from "@/hooks/usePostDetail";
import { useAuth } from "@/context/AuthContext";
import {
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentForm from "./commentForm";
import CommentList from "./comment-list";
import PostDetailCard from "./post-detail-card";

function Post() {
  const { user } = useAuth();
  const { id } = useParams();
  const { post, loading, error, submitComment } = usePostDetail(Number(id));

  if (loading) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-4 sm:px-4 sm:py-6">
        <CardShell className="w-full max-w-lg">
          <CardSurface>
            <CardHeader>
              <CardTitle>Cargando publicación...</CardTitle>
              <CardDescription>
                Estamos buscando los detalles de esta publicación.
              </CardDescription>
            </CardHeader>
          </CardSurface>
        </CardShell>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-4 sm:px-4 sm:py-6">
        <CardShell className="w-full max-w-lg">
          <CardSurface>
            <CardHeader>
              <CardTitle>Publicación no encontrada</CardTitle>
              <CardDescription>
                {error ?? "No se encontró la publicación solicitada."}
              </CardDescription>
            </CardHeader>
          </CardSurface>
        </CardShell>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-4 sm:px-4 sm:py-6">
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

        <PostDetailCard post={post} commentCount={post.comments.length} />

        <div className="flex flex-col gap-4">
          {user ? (
            <CommentForm
              placeholder="Escribe un comentario..."
              onSubmit={(comment) => submitComment(comment, user.id)}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              <Link
                className="text-sm underline-offset-4 underline"
                to="/login"
              >
                Iniciá sesión para comentar este post
              </Link>
            </p>
          )}

          <CommentList comments={post.comments} />
        </div>
      </div>
    </section>
  );
}

export default Post;
