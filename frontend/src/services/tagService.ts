import { type Tag } from "@/types/tag";
import { apiClient } from "@/services/apiClient";

export const tagService = () => {
  const getAll = async (): Promise<Tag[]> => {
    try {
      const response = await apiClient.get("/tags");
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  };

  return { getAll };
};
