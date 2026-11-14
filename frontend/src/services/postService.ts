import type { Post } from "@/types/post";
import { apiClient } from "./apiClient";

export const postService = {
  getById: async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },
  getAll: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>("/posts");
    return response.data;
  },
  getByTag: async (tagId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/tags/${tagId}/posts`);
    return response.data;
  },
  getPostImages: async (postId: number): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/posts/${postId}/images`);
    return response.data;
  },
};
