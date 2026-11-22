import { cn } from "cn";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardShell,
  CardSurface,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, isLoading } = useLogin();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(nickname, password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardShell>
        <CardSurface>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tu usuario y contraseña para iniciar sesión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nickname">Usuario</FieldLabel>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Ingresar usuario"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="123456"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={isLoading}>
                    Iniciar sesión
                  </Button>

                  <FieldDescription className="text-center">
                    ¿No tenés una cuenta? <Link to="/register">Registrarse</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </CardSurface>
      </CardShell>
    </div>
  );
}
