import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export function InlineConfirmCancel({
  confirm,
  cancel,
}: {
  confirm: () => void;
  cancel: () => void;
}) {
  return (
    <div
      className={`
        absolute left-0 top-[100%] flex justify-center space-x-2 bg-background
        p-2 align-middle
      `}
    >
      <Button size="sm" variant="constructive" onClick={confirm}>
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="destructive" onClick={cancel}>
        <Cross2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}