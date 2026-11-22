import { commentService } from "@/services/commentService";
import { toast } from "sonner";

export const useComment = () => {
  const createComment = async (
    postId: number,
    content: string,
    userId: number
  ) => {
    try {
      const created = await commentService.createComment(
        postId,
        content,
        userId
      );
      toast.success("Comentario creado con éxito");
      return created;
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("No se pudo crear el comentario. Intentá nuevamente.");
      throw error;
    }
  };
  return { createComment };
};
