import { ApolloError } from "@apollo/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useCallback, useState } from "react";

export function InlineConfirmButton({
  onConfirm,
  loading,
  error,
  children,
  affirmText = "Confirm",
  cancelText = "Cancel",
  message = "Are you sure?",
  ...buttonProps
}: {
  onConfirm: () => Promise<any>;
  loading?: boolean;
  error?: ApolloError;
  children: React.ReactNode;
  affirmText?: string;
  cancelText?: string;
  message?: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    error?.message
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      setErrorMessage(undefined);
    }
  }, []);

  const wrappedOnConfirm = useCallback(async () => {
    try {
      await onConfirm();
      setOpen(false);
    } catch (confirmError) {
      setErrorMessage((confirmError as Error).message);
    }
  }, [onConfirm]);

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
            <div className="flex flex-row space-x-3">
              <Button size="sm" onClick={wrappedOnConfirm} disabled={loading}>
                {affirmText}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {cancelText}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
