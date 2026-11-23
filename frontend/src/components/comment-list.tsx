import type { Comment } from "@/types/comment";
import { formatDate } from "@/lib/utils";
import { getAuthorDetails } from "@/lib/author";
import { AuthorLink } from "@/components/author-link";
import {
  CardAction,
  CardContent,
  CardHeader,
  CardShell,
  CardSurface,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { MessageSquare } from "lucide-react";
import { StaggerList, Swap } from "@/components/fade";

export default function CommentList({ comments }: { comments: Comment[] }) {
  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime() || b.id - a.id
  );
  return (
    <>
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="shrink-0 text-sm font-medium text-muted-foreground">
          Comentarios ({comments.length})
        </span>
        <Separator className="flex-1" />
      </div>

      <Swap view={comments.length > 0 ? "list" : "empty"}>
        {sortedComments.length > 0 ? (
          <StaggerList
            items={sortedComments}
            getKey={(comment) => comment.id}
            grow
            className="flex flex-col gap-3"
            renderItem={(comment) => {
              const {
                displayName: commentAuthor,
                handle: commentHandle,
                initials: commentInitials,
              } = getAuthorDetails(comment.User?.nickName);

              return (
              <CardShell>
                <CardSurface size="sm" className="gap-2">
                  <CardHeader className="items-center gap-2">
                    <AuthorLink
                      userId={comment.User?.id}
                      className="flex min-w-0 items-center gap-2.5"
                    >
                      <Avatar size="sm" className="shrink-0">
                        <AvatarImage src="" alt={commentAuthor} />
                        <AvatarFallback>{commentInitials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {commentAuthor}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {commentHandle}
                        </span>
                      </div>
                    </AuthorLink>
                    {comment.createdAt && (
                      <CardAction className="shrink-0">
                        <small className="whitespace-nowrap text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </small>
                      </CardAction>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="break-words text-sm leading-relaxed text-foreground">
                      {comment.content}
                    </p>
                  </CardContent>
                </CardSurface>
              </CardShell>
              );
            }}
          />
        ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare className="h-8 w-8 opacity-50" />
            </EmptyMedia>
            <EmptyTitle>Aquí verás los comentarios</EmptyTitle>
            <EmptyDescription>
              Cuando haya comentarios, aparecerán aquí.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
        )}
      </Swap>
    </>
  );
}
