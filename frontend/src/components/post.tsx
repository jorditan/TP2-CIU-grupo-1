import { useEffect, useState } from "react";
import type { Comment } from "@/types/comment";
import type { PostImage } from "@/types/postImage";
import { commentService } from "@/services/commentService";
import { postService } from "@/services/postService";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { PostWithDetails } from "@/hooks/usePost";
import { useComment } from "@/hooks/useComment";
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
  const { createComment } = useComment();
  const { id } = useParams();

  const [post, setPost] = useState<PostWithDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const postId = Number(id);

        const [basePost, commentsResult, images] = await Promise.all([
          postService.getById(postId),
          commentService.getCommentsByPostId(postId),
          postService.getPostImages(postId),
        ]);

        if (cancelled) return;

        const loadedComments = (commentsResult ?? []) as Comment[];

        setPost({
          ...basePost,
          comments: loadedComments,
          images: (images ?? []) as PostImage[],
        });
        setComments(loadedComments);
      } catch (err) {
        console.error("Error al cargar la publicación:", err);
        if (!cancelled) {
          setPost(null);
          setComments([]);
          setError("No se pudo cargar la publicación. Intentá nuevamente.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [id]);

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

        <PostDetailCard post={post} commentCount={comments.length} />

        <div className="flex flex-col gap-4">
          {user ? (
            <CommentForm
              placeholder="Escribe un comentario..."
              onSubmit={async (comment) => {
                await createComment(post.id, comment, user.id);

                const data = await commentService.getCommentsByPostId(post.id);
                if (data) setComments(data);
              }}
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

          <CommentList comments={comments} />
        </div>
      </div>
    </section>
  );
}

export default Post;
