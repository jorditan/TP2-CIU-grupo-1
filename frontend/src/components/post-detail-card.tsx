import type { PostWithDetails } from "@/hooks/usePost";
import { formatDate } from "@/lib/utils";
import { getAuthorDetails } from "@/lib/author";
import { Heart, MessageCircle } from "lucide-react";
import {
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardShell,
  CardSurface,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PostDetailCardProps = {
  post: PostWithDetails;
  commentCount: number;
};

export default function PostDetailCard({
  post,
  commentCount,
}: PostDetailCardProps) {
  const { displayName, handle, initials } = getAuthorDetails(
    post.User?.nickName || post.author
  );
  const postImages = post.images?.length
    ? post.images
    : (post.PostImages ?? []);
  return (
    <CardShell className="w-full">
      <CardSurface className="gap-4 py-5">
        <CardHeader className="items-center px-5">
          <div className="flex items-center gap-3.5">
            <Avatar size="lg">
              <AvatarImage src="" alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-foreground">
                {displayName}
              </span>
              <span className="text-xs text-muted-foreground">{handle}</span>
            </div>
          </div>
          <CardAction>
            <small className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </small>
          </CardAction>
        </CardHeader>

        {postImages.length === 1 && (
          <div className="w-full overflow-hidden">
            <img
              src={postImages[0].url}
              alt={post.title || "Imagen del post"}
              className="max-h-96 w-full object-cover"
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
                      className="max-h-96 w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-2 flex items-center justify-between px-5">
              <CarouselCounter />
              <div className="flex items-center gap-1.5">
                <CarouselPrevious className="static translate-y-0 size-7" />
                <CarouselNext className="static translate-y-0 size-7" />
              </div>
            </div>
          </Carousel>
        )}

        <CardContent className="flex flex-col gap-3 px-5">
          {post.title && (
            <h1 className="font-heading text-xl font-semibold leading-snug text-foreground">
              {post.title}
            </h1>
          )}
          <p className="text-base leading-relaxed text-foreground">
            {post.description}
          </p>
          {post.Tags && post.Tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.Tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  <span className="capitalize">{tag.name}</span>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </CardSurface>

      <CardFooter className="justify-start border-t-0 bg-transparent gap-1 px-2 pt-2 pb-1">
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
          <span>{commentCount}</span>
        </Button>
      </CardFooter>
    </CardShell>
  );
}
