import { cn } from "@/lib/utils";
import styles from "./Nice.module.css";
import { useEffect } from "react";
export function Nice({
  className,
  onAnimationEnd,
}: {
  className?: string;
  onAnimationEnd?: () => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd?.();
      return () => clearTimeout(timeout);
    }, 3500);
  }, [onAnimationEnd]);

  return (
    <div
      className={cn(
        `
          absolute left-1/2 top-1/2 flex -translate-x-1/2 and z-0
          -translate-y-1/2 flex-col items-center space-y-4
        `,
        className
      )}
    >
      <div
        className={`
          text-6xl

          ${styles.thumbsUp}
        `}
      >
        👌
      </div>
      <div
        className={`
          font-hand text-6xl

          ${styles.text}
        `}
      >
        Noice!
      </div>
    </div>
  );
}
