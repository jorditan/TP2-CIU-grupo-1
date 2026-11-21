import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { useTag } from "@/hooks/useTag";
import { postService } from "@/services/postService";

type CreatePostInput = {
  description: string;
  images: string[];
  tags: string[];
};

export const useCreatePost = () => {
  const { user } = useAuth();
  const { tags: availableTags } = useTag();
  const [isCreating, setIsCreating] = useState(false);

  const createPost = async ({ description, images, tags }: CreatePostInput) => {
    if (!user) {
      toast.error("Debés iniciar sesión para crear una publicación.");
      return false;
    }

    const tagIds = tags
      .map((name) => availableTags.find((tag) => tag.name === name)?.id)
      .filter((id): id is number => typeof id === "number");

    try {
      setIsCreating(true);

      const createdPost = await postService.createPost({
        description: description.trim(),
        userId: user.id,
        tagIds,
      });

      if (images.length > 0) {
        await Promise.all(
          images.map((url) =>
            postService.createPostImage({ url, postId: createdPost.id })
          )
        );
      }

      toast.success("¡Publicación creada con éxito!");
      return true;
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      toast.error(
        "No se pudo crear la publicación. Por favor, intentá nuevamente."
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createPost, isCreating };
};
