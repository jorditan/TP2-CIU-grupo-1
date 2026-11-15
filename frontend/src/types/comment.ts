import type { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  createdAt?: string;
  User?: User;
}
