import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  replaceClassName?: boolean;
  selectOnFocus?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, replaceClassName, type, selectOnFocus, ...props }, ref) => {
    return (
      <input
        type={type}
        className={
          replaceClassName
            ? className
            : cn(
                `
                  flex h-9 w-full rounded-md border border-input bg-transparent
                  px-3 py-1 text-sm shadow-sm transition-colors

                  disabled:cursor-not-allowed disabled:opacity-50

                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium file:text-foreground

                  focus-visible:outline-none focus-visible:ring-1
                  focus-visible:ring-ring

                  placeholder:text-muted-foreground
                `,
                className
              )
        }
        onFocus={(e) => {
          if (selectOnFocus) {
            e.currentTarget.select();
          }
          props.onFocus?.(e);
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
