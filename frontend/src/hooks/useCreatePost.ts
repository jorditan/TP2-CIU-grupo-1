import { useAuth } from "@/context/AuthContext";
import { postService } from "@/services/postService";
import type { CreatePostInput } from "@/types/post";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const createPost = async (createPostInput: CreatePostInput) => {
    if (!user) {
      toast.error("Tenés que iniciar sesión");
      return;
    }

    try {
      setIsLoading(true);
      const newPost = await postService.create({
        description: createPostInput.description,
        userId: user.id,
        tagIds: createPostInput.tagIds,
      });
      const imageRequests = createPostInput.imageUrls.map((url) =>
        postService.createImage(url, newPost.id)
      );

      const results = await Promise.allSettled(imageRequests);

      const failedCount = results.filter(
        (result) => result.status === "rejected"
      ).length;

      if (failedCount > 0) {
        toast.warning(
          `Publicación creada, pero ${failedCount} imagen(es) no se pudieron cargar.`
        );
      } else {
        toast.success("¡Publicación creada exitosamente!");
      }

      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear la publicación");
    } finally {
      setIsLoading(false);
    }
  };
  return { createPost, isLoading };
};
