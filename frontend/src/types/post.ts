import type { User } from "./user";

export interface Tag {
  id: number;
  name: string;
}

export interface PostImage {
  id: number;
  url: string;
}

export interface Post {
  id: number;
  title?: string;
  description: string;
  author?: string;
  createdAt: string;
  User?: User;
  Tags?: Tag[];
  PostImages?: PostImage[];
}
