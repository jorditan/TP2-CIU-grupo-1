import { useNavigate } from "react-router-dom";
import { PostForm } from "@/components/post-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";

function CreatePost() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen w-full flex-col items-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="w-full max-w-lg">
        <CardShell>
          <CardSurface>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Crear publicación
              </CardTitle>
              <CardDescription>
                Ingresá la información necesaria para crear una nueva
                publicación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostForm
                onSuccess={() => navigate("/profile")}
                onCancel={() => navigate(-1)}
              />
            </CardContent>
          </CardSurface>
        </CardShell>
      </div>
    </section>
  );
}

export default CreatePost;
