import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/hooks/usePost";
import { getCarouselItems, getGreeting, GROUP_MEMBERS } from "@/lib/utils";
import PostCard from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

function Home() {
  const { user } = useAuth();
  const { posts, loading } = usePost();

  const postCount = posts?.length ?? 0;
  const carouselItems = getCarouselItems(postCount);

  return (
    <section className="flex w-full flex-col items-center gap-6 min-h-screen px-4 py-12">
      <div className="flex w-full max-w-lg flex-col gap-5">
        {user && (
          <div className="flex items-center justify-between px-1">
            <h1 className="text-xl font-medium tracking-tight text-foreground">
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
                      <div className="flex items-center gap-2.5">
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

          <div className="mt-2.5 flex items-center justify-between px-1">
            <span className="text-xs text-muted-foreground">
              Sobre nosotros · Deslizá con las flechas
            </span>
            <div className="flex items-center gap-1.5">
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

        {loading ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cargando publicaciones...</CardTitle>
              <CardDescription>
                Obteniendo las últimas novedades de la comunidad.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : posts && posts.length > 0 ? (
          <div className="flex flex-col items-center gap-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Aún no hay publicaciones</CardTitle>
              <CardDescription>
                Cuando alguien comparta una publicación aparecerá acá.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </section>
  );
}

export default Home;
