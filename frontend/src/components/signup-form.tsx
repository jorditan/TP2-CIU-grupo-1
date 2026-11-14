import { cn } from "cn";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useRegister();
  return (
    <Card className={cn("shadow-md w-80%", className)} {...props}>
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>
          Ingresa tu información a continuación para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nickname">Usuario</FieldLabel>
              <Input
                id="nickname"
                type="text"
                placeholder="Ingresar usuario"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>
                Tu contraseña debe tener al menos 8 caracteres, incluyendo una
                mayúscula, una minúscula y un número.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>
                Porfavor, confirma tu contraseña.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    register(nickname, email, password);
                  }}
                >
                  Crear cuenta
                </Button>

                <FieldDescription className="px-6 text-center">
                  ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
