import { SignupForm } from "@/components/signup-form";

function RegisterPage() {
  return (
    <section className="flex min-h-[calc(100svh-5.5rem)] w-full items-center justify-center px-3 py-8 sm:px-4">
      <SignupForm className="w-full max-w-sm" />
    </section>
  );
}

export default RegisterPage;
