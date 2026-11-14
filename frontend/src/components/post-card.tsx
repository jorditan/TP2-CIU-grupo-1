import type { Post } from "@/types/post";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: { post: Post }) {
  const displayName = post.User?.nickName || post.author || "Usuario";
  const handle = `@${displayName.toLowerCase().replace(/\s+/g, "")}`;
  const initials = displayName.slice(0, 2).toUpperCase();
  const coverImage = post.PostImages?.[0]?.url;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm text-foreground">
              {displayName}
            </span>
            <span className="text-xs text-muted-foreground">{handle}</span>
          </div>
        </div>
        <CardAction>
          <small className="text-muted-foreground">
            {formatDate(post.createdAt)}
          </small>
        </CardAction>
      </CardHeader>

      {coverImage && (
        <div className="w-full overflow-hidden">
          <img
            src={coverImage}
            alt={post.title || "Imagen del post"}
            className="h-60 w-full object-cover"
          />
        </div>
      )}

      <CardContent className="flex flex-col gap-2">
        {post.title && (
          <h3 className="font-semibold text-base leading-snug text-foreground">
            {post.title}
          </h3>
        )}
        <p className="text-md leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        {post.Tags && post.Tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.Tags.map((tag) => (
              <span
                key={tag.id}
                className="text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                <Badge>
                  <span className="text-xs capitalize font-medium">
                    {tag.name}
                  </span>
                </Badge>
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between bg-transparent px-2 py-2">
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Heart className="size-4" />
          <span>Me gusta</span>
        </Button>
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-muted-foreground hover:text-foreground"
        >
          <MessageCircle className="size-4" />
          <span>Comentar</span>
        </Button>
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Share className="size-4" />
          <span>Compartir</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
