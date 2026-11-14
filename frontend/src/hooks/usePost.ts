import { postService } from "@/services/postService";
import { type Post } from "@/types/post";
import { useEffect, useState } from "react";

export const usePost = () => {
  const [posts, setPost] = useState<Post[] | null>(null);

  useEffect(() => {
    postService.getAll().then((data) => setPost(data));
    posts?.forEach((post) => {
      postService.getPostImages(post.id).then((images) => {
        console.log(`Images for post ${post.id}:`, images);
      });
    });
  }, [posts]);

  return { posts };
};
