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

export const usePost = () => {
  const [posts, setPosts] = useState<PostWithDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const countComments = (postId: number): number => {
    const post = posts?.find((p) => p.id === postId);
    return post ? post.comments.length : 0;
  };

  useEffect(() => {
    const fetchPostsWithDetails = async () => {
      try {
        setLoading(true);
        // 1: obtiene todos los posts base
        const basePosts = await postService.getAll();

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
              comments,
              images,
            };
          })
        );

        setPosts(postsWithDetails);
      } catch (err) {
        setError("Error al cargar los posts y sus detalles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsWithDetails();
  }, []); // array para que se ejecute solo al montar el componente

  return { posts, loading, error, countComments };
};
