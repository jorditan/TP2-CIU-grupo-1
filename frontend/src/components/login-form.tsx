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
  FieldError,
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
  const [submitted, setSubmitted] = useState(false);

  const nicknameError =
    nickname.trim() === "" ? "El usuario es obligatorio." : null;
  const passwordError =
    password === ""
      ? "La contraseña es obligatoria."
      : password !== "123456"
        ? "La contraseña es incorrecta."
        : null;

  const visibleNicknameError = submitted ? nicknameError : null;
  const visiblePasswordError = submitted ? passwordError : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (nicknameError || passwordError) return;
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
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <Field data-invalid={visibleNicknameError !== null}>
                  <FieldLabel htmlFor="nickname">Usuario</FieldLabel>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Ingresar usuario"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    aria-invalid={visibleNicknameError !== null}
                  />
                  {visibleNicknameError && (
                    <FieldError>{visibleNicknameError}</FieldError>
                  )}
                </Field>
                <Field data-invalid={visiblePasswordError !== null}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="123456"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={visiblePasswordError !== null}
                  />
                  {visiblePasswordError && (
                    <FieldError>{visiblePasswordError}</FieldError>
                  )}
                </Field>
                <Field>
                  <Button type="submit" disabled={isLoading}>
                    Iniciar sesión
                  </Button>

                  <FieldDescription className="text-center">
                    ¿No tenés una cuenta?{" "}
                    <Link to="/register">Registrarse</Link>
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
