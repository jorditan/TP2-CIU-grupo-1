import {apiClient} from './apiClient';

export const commentService = {
  getCommentsByPostId: async(postId: string) => {
    try {
      const response = await apiClient.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  },
  getCommentById: async(commentId: string) => {
    try {
      const response = await apiClient.get(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comment:', error);
    }
  },
  createComment: async(postId:string, content: string) => {
    try {
      const response = await apiClient.post(`/posts/${postId}/comments`, { content });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  },
  deleteComment: async(commentId: string) => {
    try {
      const response = await apiClient.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
}