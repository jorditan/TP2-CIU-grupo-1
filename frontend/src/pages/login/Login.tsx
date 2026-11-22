import { LoginForm } from "@/components/login-form";

function Login() {
  return (
    <section className="flex min-h-[calc(100svh-5.5rem)] w-full items-center justify-center px-3 py-8 sm:px-4">
      <LoginForm className="w-full max-w-sm" />
    </section>
  );
}

export default Login;
