import { commentService } from "@/services/commentService";
import { toast } from "sonner";

export const useComment = () => {
  const createComment = async (
    postId: number,
    content: string,
    userId: number
  ) => {
    try {
      toast.success("Comentario creado con éxito");
      return await commentService.createComment(postId, content, userId);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };
  return { createComment };
};
