import { postService } from "@/services/postService";
import { commentService } from "@/services/commentService";
import { type Post } from "@/types/post";
import { type Comment } from "@/types/comment";
import { type PostImage } from "@/types/postImage";
import { useEffect, useState } from "react";

export interface PostWithDetails extends Post {
  comments: Comment[];
  images: PostImage[];
}

export const usePost = (userId?: number | null) => {
  const [posts, setPosts] = useState<PostWithDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(userId !== null);
  const [error, setError] = useState<string | null>(null);

  const countComments = (postId: number): number => {
    const post = posts?.find((p) => p.id === postId);
    return post ? post.comments.length : 0;
  };

  useEffect(() => {
    if (userId === null) return;

    let cancelled = false;

    const fetchPostsWithDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1: obtiene todos los posts base o solo los del usuario
        const basePosts =
          typeof userId === "number"
            ? await postService.getByUserId(userId)
            : await postService.getAll();

        // 2: por cada post, buscar sus comentarios e imágenes en paralelo
        const postsWithDetails = await Promise.all(
          basePosts.map(async (post) => {
            const postId = post.id;

            const [comments, images] = await Promise.all([
              commentService.getCommentsByPostId(postId),
              postService.getPostImages(postId),
            ]);

            return {
              ...post,
              comments: comments ?? [],
              images: images ?? [],
            };
          })
        );

        if (!cancelled) setPosts(postsWithDetails);
      } catch (err) {
        if (!cancelled) {
          setError("Error al cargar los posts y sus detalles");
        }
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchPostsWithDetails();

    const handlePostsUpdated = () => {
      void fetchPostsWithDetails();
    };
    window.addEventListener("posts:updated", handlePostsUpdated);

    return () => {
      cancelled = true;
      window.removeEventListener("posts:updated", handlePostsUpdated);
    };
  }, [userId]);

  return {
    posts: userId === null ? [] : posts,
    loading: userId === null ? false : loading,
    error: userId === null ? null : error,
    countComments,
  };
};
