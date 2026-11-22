import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/hooks/usePost";
import { useTag } from "@/hooks/useTag";
import { getCarouselItems, getGreeting, GROUP_MEMBERS } from "@/lib/utils";
import PostCard from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText, X } from "lucide-react";
import { StaggerList, Swap } from "@/components/fade";
import { useSearchParams } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const { posts, loading } = usePost();
  const { tags } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTagId = Number(searchParams.get("tag")) || null;
  const selectedTag = tags.find((t) => t.id === selectedTagId) ?? null;

  const filteredPosts = selectedTagId
    ? (posts ?? []).filter((post) =>
        post.Tags?.some((tag) => tag.id === selectedTagId)
      )
    : (posts ?? []);

  const postCount = posts?.length ?? 0;
  const carouselItems = getCarouselItems(postCount);

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-6 px-3 py-6 sm:px-4 sm:py-10">
      <div className="flex w-full max-w-lg flex-col gap-5">
        {user && (
          <div className="flex items-center justify-between px-1">
            <h1 className="min-w-0 break-words text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {getGreeting()}, {user.nickName}
            </h1>
          </div>
        )}

        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {carouselItems.map((item, idx) => (
              <CarouselItem key={item.title} className="p-0.5">
                <CardShell className="w-full h-full justify-between">
                  <CardSurface className="flex-1 gap-3">
                    <CardHeader>
                      <CardAction>
                        <Badge variant="ghost">
                          {idx + 1} / {carouselItems.length}
                        </Badge>
                      </CardAction>
                      <CardTitle className="pt-1">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.content}
                      </p>
                    </CardContent>
                  </CardSurface>
                  <CardFooter className="justify-between border-t-0 bg-transparent px-2.5 pt-2 pb-1">
                    {item.showMembers ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        <AvatarGroup>
                          {GROUP_MEMBERS.map((member) => (
                            <Tooltip key={member.name}>
                              <TooltipTrigger
                                render={
                                  <Avatar
                                    size="sm"
                                    className="cursor-pointer ring-2 ring-background"
                                  />
                                }
                              >
                                <AvatarFallback>
                                  {member.initials}
                                </AvatarFallback>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{member.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                        <span className="text-xs text-muted-foreground">
                          {item.footerText}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {item.footerText}
                      </span>
                    )}
                  </CardFooter>
                </CardShell>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
            <span className="min-w-0 text-xs leading-snug text-muted-foreground">
              Sobre nosotros · Deslizá con las flechas
            </span>
            <div className="flex shrink-0 items-center gap-1.5">
              <CarouselPrevious className="static translate-y-0 size-7" />
              <CarouselNext className="static translate-y-0 size-7" />
            </div>
          </div>
        </Carousel>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-medium text-muted-foreground">
              Publicaciones recientes
            </span>
          </div>
          <Separator className="flex-1" />
        </div>

        {selectedTagId && (
          <div className="flex items-center justify-between gap-2 rounded-lg border bg-card/60 px-3 py-2 text-xs">
            <span className="text-muted-foreground">
              Filtrando por etiqueta:{" "}
              <Badge variant="secondary" className="ml-1 capitalize">
                {selectedTag?.name ?? `#${selectedTagId}`}
              </Badge>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => setSearchParams({})}
            >
              <X className="size-3.5" />
              Limpiar
            </Button>
          </div>
        )}

        <Swap
          view={
            loading
              ? "loading"
              : filteredPosts.length
                ? `feed-${selectedTagId ?? "all"}`
                : `empty-${selectedTagId ?? "all"}`
          }
          className="w-full"
        >
          {loading ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Cargando publicaciones...</CardTitle>
                <CardDescription>
                  Obteniendo las últimas novedades de la comunidad.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : filteredPosts.length > 0 ? (
            <StaggerList
              items={filteredPosts}
              getKey={(post) => post.id}
              className="flex w-full flex-col items-center gap-4"
              renderItem={(post) => <PostCard post={post} />}
            />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText className="h-8 w-8 opacity-50" />
                </EmptyMedia>
                <EmptyTitle>
                  {selectedTagId
                    ? "No hay publicaciones con esta etiqueta"
                    : "Aún no hay publicaciones"}
                </EmptyTitle>
                <EmptyDescription>
                  {selectedTagId
                    ? "Probá con otra categoría o limpiá el filtro para ver todas."
                    : "Cuando alguien comparta una publicación aparecerá acá."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </Swap>
      </div>
    </section>
  );
}

export default Home;
