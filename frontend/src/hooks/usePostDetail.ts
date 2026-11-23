import { useEffect, useState } from "react";
import { useComment } from "@/hooks/useComment";
import { commentService } from "@/services/commentService";
import { postService } from "@/services/postService";
import type { PostWithDetails } from "@/types/postWithDetails";

export const usePostDetail = (postId: number) => {
  const { createComment } = useComment();
  const [post, setPost] = useState<PostWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isSafeInteger(postId) || postId <= 0) return;

    let cancelled = false;

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const [basePost, comments, images] = await Promise.all([
          postService.getById(postId),
          commentService.getCommentsByPostId(postId),
          postService.getPostImages(postId),
        ]);

        if (!cancelled) {
          setPost({
            ...basePost,
            comments: comments ?? [],
            images: images ?? [],
          });
        }
      } catch (err) {
        console.error("Error al cargar la publicación:", err);
        if (!cancelled) {
          setPost(null);
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
  }, [postId]);

  const submitComment = async (comment: string, userId: number) => {
    await createComment(postId, comment, userId);

    const comments = await commentService.getCommentsByPostId(postId);
    if (comments) {
      setPost((current) =>
        current?.id === postId ? { ...current, comments } : current
      );
    }
  };

  if (!Number.isSafeInteger(postId) || postId <= 0) {
    return { post: null, loading: false, error: null, submitComment };
  }

  return { post, loading, error, submitComment };
};
