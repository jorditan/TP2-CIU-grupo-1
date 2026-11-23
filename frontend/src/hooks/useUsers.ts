import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import type { User } from "@/types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await userService.getAllUsers();

        if (!cancelled) setUsers(data);
      } catch (err) {
        console.error("Error al cargar los usuarios:", err);
        if (!cancelled) setError("No se pudieron cargar los usuarios.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading, error };
};
