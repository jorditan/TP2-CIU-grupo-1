import type { Post } from "@/types/post";
import type { PostImage } from "@/types/postImage";
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

  getByUserId: async (userId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>("/posts", {
      params: { userId },
    });
    return response.data;
  },

  getByTag: async (tagId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/tags/${tagId}/posts`);
    return response.data;
  },

  getPostImages: async (postId: number): Promise<PostImage[]> => {
    const response = await apiClient.get<PostImage[]>(
      `/postimages/post/${postId}`
    );
    return response.data;
  },

  createPost: async (payload: {
    description: string;
    userId: number;
    tagIds: number[];
  }): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts", payload);
    return response.data;
  },

  createPostImage: async (payload: {
    url: string;
    postId: number;
  }): Promise<PostImage> => {
    const response = await apiClient.post<PostImage>("/postimages", payload);
    return response.data;
  },
};
