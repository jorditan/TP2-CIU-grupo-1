import type { Comment } from "@/types/comment";
import { formatDate } from "@/lib/utils";
import { getAuthorDetails } from "@/lib/author";
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

      {comments.length > 0 ? (
        <div className="flex flex-col gap-3">
          {sortedComments.map((comment) => {
            const {
              displayName: commentAuthor,
              handle: commentHandle,
              initials: commentInitials,
            } = getAuthorDetails(comment.User?.nickName);

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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare className="h-8 w-8 opacity-50" />
            </EmptyMedia>
            <EmptyTitle>Aquí verás los comentarios</EmptyTitle>
            <EmptyDescription>
              Cuando hayan comentarios, aparecerán aquí enlistados en orden
              ascendente.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
