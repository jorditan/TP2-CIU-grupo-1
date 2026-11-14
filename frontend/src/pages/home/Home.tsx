import { usePost } from "@/hooks/usePost";
import PostCard from "@/components/post-card";

function Home() {
  const { posts } = usePost();
  console.log(posts);
  return (
    <section className="flex w-full gap-4 flex-col items-center justify-center h-screen">
      <article className="flex flex-col gap-4 items-center justify-center w-full">
        <h1 className="text-2xl font-bold">Inicio</h1>
        <div className="flex flex-col w-3/4 items-center justify-center gap-4">
          {posts && posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </article>
    </section>
  );
}

export default Home;
