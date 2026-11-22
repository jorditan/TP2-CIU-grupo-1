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
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const { register, isLoading } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(nickname, email);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <CardShell>
        <CardSurface>
          <CardHeader>
            <CardTitle>Crear cuenta</CardTitle>
            <CardDescription>
              Ingresa tu información a continuación para crear tu cuenta
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
                  <FieldDescription>
                    Al iniciar sesión, utilizá la contraseña fija{" "}
                    <span className="font-mono font-medium">123456</span>.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      Crear cuenta
                    </Button>

                    <FieldDescription className="px-2 text-center sm:px-6">
                      ¿Ya tenés una cuenta?{" "}
                      <Link to="/login">Iniciar sesión</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </CardSurface>
      </CardShell>
    </div>
  );
}
