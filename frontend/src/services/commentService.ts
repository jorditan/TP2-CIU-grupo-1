import { apiClient } from "./apiClient";

export const commentService = {
  getCommentsByPostId: async (postId: number) => {
    try {
      const response = await apiClient.get(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },
  createComment: async (postId: number, content: string, userId: number) => {
    const response = await apiClient.post("/comments", {
      content,
      userId,
      postId,
    });

    return response.data;
  },
};
