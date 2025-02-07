import { ApolloError } from "@apollo/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCallback, useState, KeyboardEvent } from "react";

export function InlineTypeoutConfirmButton({
  onConfirm,
  loading,
  error,
  children,
  confirmText = "confirm",
  message = "Are you sure? Type 'confirm' to proceed:",
  ...buttonProps
}: {
  onConfirm: () => any;
  loading?: boolean;
  error?: ApolloError;
  children: React.ReactNode;
  confirmText?: string;
  message?: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    error?.message
  );
  const [inputValue, setInputValue] = useState("");

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      setErrorMessage(undefined);
    }
  }, []);

  const wrappedOnConfirm = useCallback(async () => {
    try {
      await Promise.resolve(onConfirm());
      setOpen(false);
    } catch (confirmError) {
      setErrorMessage((confirmError as Error).message);
    }
  }, [onConfirm]);

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue === confirmText) {
        await wrappedOnConfirm();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [inputValue, confirmText, wrappedOnConfirm]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="destructive" {...buttonProps}>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div className="flex flex-col space-y-3">
            <p>{message}</p>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={loading}
              placeholder={`Type "${confirmText}" to confirm`}
              autoFocus
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
