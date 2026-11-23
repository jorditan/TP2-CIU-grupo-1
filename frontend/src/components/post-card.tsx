import {
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardShell,
  CardSurface,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/utils";
import type { PostWithDetails } from "@/hooks/usePost";
import { Link } from "react-router-dom";
import { AuthorLink } from "./author-link";

function PostCard({ post }: { post: PostWithDetails }) {
  const displayName = post.User?.nickName || post.author || "Usuario";

  const handle = `@${displayName.toLowerCase().replace(/\s+/g, "")}`;
  const initials = displayName.slice(0, 2).toUpperCase();
  const postImages = post.images?.length
    ? post.images
    : (post.PostImages ?? []);

  return (
    <CardShell className="w-full max-w-lg">
      <CardSurface>
        <CardHeader className="items-center gap-2">
          <AuthorLink
            userId={post.User?.id}
            className="flex min-w-0 items-center gap-3"
          >
            <Avatar size="lg" className="shrink-0">
              <AvatarImage src="" alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-semibold text-sm text-foreground">
                {displayName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {handle}
              </span>
            </div>
          </AuthorLink>
          <CardAction className="shrink-0">
            <small className="whitespace-nowrap text-muted-foreground">
              {formatDate(post.createdAt)}
            </small>
          </CardAction>
        </CardHeader>

        {postImages.length === 1 && (
          <div className="w-full overflow-hidden">
            <img
              src={postImages[0].url}
              alt={post.title || "Imagen del post"}
              className="h-52 w-full object-cover sm:h-60"
            />
          </div>
        )}

        {postImages.length > 1 && (
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {postImages.map((img, idx) => (
                <CarouselItem key={img.id ?? idx}>
                  <div className="w-full overflow-hidden">
                    <img
                      src={img.url}
                      alt={`${post.title || "Imagen del post"} ${idx + 1}`}
                      className="h-52 w-full object-cover sm:h-60"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-2 flex items-center justify-between px-4">
              <CarouselCounter />
              <div className="flex items-center gap-1.5">
                <CarouselPrevious className="static translate-y-0 size-7" />
                <CarouselNext className="static translate-y-0 size-7" />
              </div>
            </div>
          </Carousel>
        )}

        <CardContent className="flex flex-col gap-2">
          {post.title && (
            <h3 className="break-words font-semibold text-base leading-snug text-foreground">
              {post.title}
            </h3>
          )}
          <p className="break-words text-sm leading-relaxed text-foreground sm:text-base">
            {post.description}
          </p>
          {post.Tags && post.Tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.Tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  <Badge variant="secondary">
                    <span className="capitalize">{tag.name}</span>
                  </Badge>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </CardSurface>

      <CardFooter className="justify-between border-t-0 bg-transparent gap-1 px-1 pt-1.5 pb-0.5">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Heart className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="size-4" />
            <span>{post.comments.length}</span>
          </Button>
        </div>
        <Button
          render={<Link to={`/post/${post.id}`}>Ver más</Link>}
          className="gap-2 "
        >
          Ver más
        </Button>
      </CardFooter>
    </CardShell>
  );
}

export default PostCard;
