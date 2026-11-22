import { userService } from "@/services/userService";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const login = async (nickname: string, password: string) => {
    const trimmedNickname = nickname.trim();
    if (trimmedNickname === "") {
      toast.error("El campo de usuario no puede estar vacío.");
      return;
    }
    if (password !== "123456") {
      toast.error("La contraseña es incorrecta.");
      return;
    }
    try {
      setIsLoading(true);
      const users = await userService.getAllUsers();
      const user = users.find((u) => u.nickName === trimmedNickname);
      if (user) {
        loginUser(user);
        toast.success(`¡Bienvenido, ${user.nickName}!`);
        navigate("/home");
      } else {
        toast.error("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        "Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
