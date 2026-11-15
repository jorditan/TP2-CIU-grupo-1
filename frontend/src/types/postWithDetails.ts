import { type Post } from "@/types/post";
import { type Comment } from "@/types/comment";
import { type PostImage } from "@/types/postImage";

export interface PostWithDetails extends Post {
  comments: Comment[];
  images: PostImage[];
}
