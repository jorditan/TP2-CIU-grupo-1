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
  getCommentById: async (commentId: number) => {
    try {
      const response = await apiClient.get(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  },
  createComment: async (postId: number, content: string) => {
    try {
      const response = await apiClient.post(`/comments/post/${postId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  },
  deleteComment: async (commentId: number) => {
    try {
      const response = await apiClient.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  },
};
