import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { userService } from "@/services/userService";
import { usePost } from "@/hooks/usePost";
import type { User } from "@/types/user";

export const useUserProfile = (userId: number | null) => {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(userId !== null);
  const [userError, setUserError] = useState<string | null>(null);

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = usePost(userId);

  useEffect(() => {
    if (userId === null) return;

    let cancelled = false;

    const fetchUser = async () => {
      try {
        setUserLoading(true);
        setUserError(null);
        setProfileUser(null);

        const data = await userService.getById(userId);

        if (!cancelled) setProfileUser(data);
      } catch (err) {
        console.error("Error al cargar el usuario:", err);
        if (cancelled) return;

        const notFound = isAxiosError(err) && err.response?.status === 404;
        setUserError(
          notFound
            ? "Este usuario no existe."
            : "No se pudo cargar el perfil. Intentá nuevamente."
        );
      } finally {
        if (!cancelled) setUserLoading(false);
      }
    };

    void fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (userId === null) {
    return {
      profileUser: null,
      posts: [],
      loading: false,
      error: "El identificador de usuario no es válido.",
    };
  }

  return {
    profileUser,
    posts: posts ?? [],
    loading: userLoading || postsLoading,
    error: userError ?? postsError,
  };
};
