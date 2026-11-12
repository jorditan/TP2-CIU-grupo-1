import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
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
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Ingresa tu email para iniciar sesión en tu cuenta
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Tu contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Porfavor, confirma tu contraseña.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear cuenta</Button>
        
                <FieldDescription className="px-6 text-center">
                  ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
