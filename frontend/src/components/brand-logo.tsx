import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/components/theme-provider";

export function BrandLogo() {
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const transition = { duration: reduce ? 0 : 0.15, ease: "easeOut" as const };

  return (
    <Link
      to="/home"
      aria-label="UnaHur Anti-Social"
      className="relative block h-10 w-[4.8rem] shrink-0 overflow-hidden"
    >
      <motion.img
        src="/logo-light.png"
        alt=""
        aria-hidden={resolvedTheme !== "light"}
        initial={false}
        animate={{ opacity: resolvedTheme === "light" ? 1 : 0 }}
        transition={transition}
        className="pointer-events-none absolute top-1/2 left-1/2 h-20 w-20 max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
      />
      <motion.img
        src="/logo-dark.png"
        alt=""
        aria-hidden={resolvedTheme !== "dark"}
        initial={false}
        animate={{ opacity: resolvedTheme === "dark" ? 1 : 0 }}
        transition={transition}
        className="pointer-events-none absolute top-1/2 left-1/2 h-20 w-20 max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />
    </Link>
  );
}
