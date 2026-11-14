import { apiClient } from "./apiClient";
import { type User } from "../types/user";

export const userService = {
  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  create: async (payload: Omit<User, "id">): Promise<User> => {
    const { data } = await apiClient.post<User>("/users", payload);
    return data;
  },
};
