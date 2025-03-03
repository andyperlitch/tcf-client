import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
    font-medium transition-colors

    disabled:pointer-events-none disabled:opacity-50

    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-primary-foreground shadow-sm

          hover:bg-primary/90
        `,
        destructive: `
          bg-destructive text-destructive-foreground shadow-sm

          hover:bg-destructive/90
        `,
        constructive: `
          bg-constructive text-constructive-foreground shadow-sm

          hover:bg-constructive/90
        `,
        informational: `
          bg-informational text-informational-foreground shadow-sm

          hover:bg-informational/90
        `,
        advisory: `
          bg-advisory text-advisory-foreground shadow-sm

          hover:bg-advisory/90
        `,
        outline: `
          border border-input bg-background shadow-sm

          hover:bg-accent hover:text-accent-foreground
        `,
        secondary: `
          bg-secondary text-secondary-foreground shadow-sm

          hover:bg-secondary/80
        `,
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: `
          bg-transparent text-link underline-offset-4

          focus:outline-none

          hover:text-linkHover hover:underline
        `,
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-0",
        link: "h-auto p-0",
      },
    },
    compoundVariants: [
      // Remove padding when variant is 'link', regardless of size
      {
        variant: "link",
        size: ["default", "sm", "lg"],
        class: "h-auto p-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const mainContent = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{mainContent}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return mainContent;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
