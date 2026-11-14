import { userService, type User } from "@/services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (
    nickname: string,
    email: string,
    password: string
  ) => {
    if (nickname === "") {
      toast.error("El campo de usuario no puede estar vacío.");
      return;
    }
    if (email === "") {
      toast.error("El campo de correo electrónico no puede estar vacío.");
      return;
    }
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    try {
      setIsLoading(true);
      const user: User = { nickName: nickname, email: nickname, id: 0 };
      // Acá se llama al servicio para crear al usuario
      await userService.create(user);
      console.log("User registered:", user);
      toast.success(`¡Usuario ${nickname} registrado exitosamente!`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
};
