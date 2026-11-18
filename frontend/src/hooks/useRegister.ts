import { userService } from "@/services/userService";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (nickname.trim() === "") {
      toast.error("El campo de usuario no puede estar vacío.");
      return;
    }
    if (email.trim() === "") {
      toast.error("El campo de correo electrónico no puede estar vacío.");
      return;
    }
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
    try {
      setIsLoading(true);
      await userService.create({
        nickName: nickname.trim(),
        email: email.trim(),
      });
      toast.success(`¡Usuario ${nickname.trim()} registrado exitosamente!`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      const serverMessage =
        isAxiosError<{ error?: string }>(error) && error.response?.data?.error
          ? error.response.data.error
          : "Error al registrar el usuario.";
      toast.error(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
};
