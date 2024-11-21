import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
    inline-flex items-center rounded-md border font-semibold transition-colors

    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  `,
  {
    variants: {
      variant: {
        default: `
          border-transparent bg-primary text-primary-foreground shadow

          hover:bg-primary/80
        `,
        secondary: `
          border-transparent bg-secondary text-secondary-foreground

          hover:bg-secondary/80
        `,
        destructive: `
          border-transparent bg-destructive text-destructive-foreground shadow

          hover:bg-destructive/80
        `,
        outline: "text-foreground",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-0.5 py-0.2 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
