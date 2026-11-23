import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type AuthorLinkProps = {
  userId?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Envuelve el avatar y el nombre de un autor con un link a su perfil público.
 * Si no se conoce el id del autor, se renderiza sin link.
 */
export function AuthorLink({ userId, className, children }: AuthorLinkProps) {
  if (userId === undefined) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link
      to={`/user/${userId}`}
      className={cn(
        "rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {children}
    </Link>
  );
}
