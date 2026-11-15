import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import type { PostWithDetails } from "@/hooks/usePost";
import { formatDate } from "@/lib/utils";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function Post({ post: postProp }: { post?: PostWithDetails }) {
  const { state } = useLocation() as { state?: { post?: PostWithDetails } };
  const post = postProp ?? state?.post;

  if (!post) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center gap-6 px-4 py-6">
        <CardShell className="w-full max-w-lg">
          <CardSurface>
            <CardHeader>
              <CardTitle>Publicación no encontrada</CardTitle>
              <CardDescription>
                No se encontró la publicación solicitada.
              </CardDescription>
            </CardHeader>
          </CardSurface>
        </CardShell>
      </section>
    );
  }

  const displayName = post.User?.nickName || post.author || "Usuario";
  const handle = `@${displayName.toLowerCase().replace(/\s+/g, "")}`;
  const initials = displayName.slice(0, 2).toUpperCase();
  const coverImage = post.PostImages?.[0]?.url;

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-4 py-6">
      <div className="flex w-full max-w-lg flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        render={<Link to="/home" />}
        className="w-fit gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Button>

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

          {coverImage && (
            <div className="w-full overflow-hidden">
              <img
                src={coverImage}
                alt={post.title || "Imagen del post"}
                className="max-h-96 w-full object-cover"
              />
            </div>
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
            <span>{post.comments.length}</span>
          </Button>
        </CardFooter>
      </CardShell>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="shrink-0 text-sm font-medium text-muted-foreground">
            Comentarios ({post.comments.length})
          </span>
          <Separator className="flex-1" />
        </div>

        {post.comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {post.comments.map((comment) => {
              const commentAuthor = comment.User?.nickName || "Usuario";
              const commentHandle = `@${commentAuthor.toLowerCase().replace(/\s+/g, "")}`;
              const commentInitials = commentAuthor.slice(0, 2).toUpperCase();

              return (
                <CardShell key={comment.id}>
                  <CardSurface size="sm" className="gap-2">
                    <CardHeader className="items-center">
                      <div className="flex items-center gap-2.5">
                        <Avatar size="sm">
                          <AvatarImage src="" alt={commentAuthor} />
                          <AvatarFallback>{commentInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {commentAuthor}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {commentHandle}
                          </span>
                        </div>
                      </div>
                      {comment.createdAt && (
                        <CardAction>
                          <small className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </small>
                        </CardAction>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-foreground">
                        {comment.content}
                      </p>
                    </CardContent>
                  </CardSurface>
                </CardShell>
              );
            })}
          </div>
        ) : (
          <CardShell>
            <CardSurface size="sm">
              <CardHeader>
                <CardTitle>Todavía no hay comentarios</CardTitle>
                <CardDescription>
                  Cuando alguien comente en esta publicación aparecerá acá.
                </CardDescription>
              </CardHeader>
            </CardSurface>
          </CardShell>
        )}
        </div>
      </div>
    </section>
  );
}

export default Post;
