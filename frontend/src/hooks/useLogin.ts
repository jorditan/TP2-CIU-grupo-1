import { userService } from "@/services/userService";
import { useState } from "react";
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const login = async (nickname: string, password: string) => {
      console.log(nickname, password)
    // if (nickname === "") {
    //   toast.error('El campo de correo electrónico no puede estar vacío.');
    //   return;
    // }
    // if (password !== "123456") {
    //   toast.error('La contraseña es incorrecta.');
    //   return;
    // }
    try {
      setIsLoading(true);
      const users = await userService.getAllUsers();
      console.log(users)
      const user = users.find((u) => u.nickName === nickname);
      if (user) {
        console.log('User found:', user);
        toast.success(`¡Bienvenido, ${user.nickName}!`);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        toast.error('El usuario no existe.');
      }
    } catch(error) {
      console.error('Error during login:', error);
      toast.error('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading }
}
