import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function InfoIcon({
  children,
  icon: Icon = InfoCircledIcon,
  className,
  ...props
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  color?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon
          className={`
            h-4 w-4

            ${className}
          `}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
