import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ease = "easeOut" as const;

export function Swap({
  view,
  className,
  children,
}: {
  view: string;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        className={className}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.18, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function StaggerList<T>({
  items,
  getKey,
  renderItem,
  className,
  grow = false,
}: {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  className?: string;
  grow?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={getKey(item)}
            className={grow ? "w-full origin-top" : "w-full"}
            initial={
              reduce
                ? false
                : grow
                  ? { opacity: 0, y: 6, scale: 0.98 }
                  : { opacity: 0, y: 8 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{
              duration: reduce ? 0 : 0.25,
              delay: reduce ? 0 : Math.min(index, 6) * 0.04,
              ease,
            }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
